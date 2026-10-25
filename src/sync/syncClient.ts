import { AttendeeSession, CommunityType, SharedResponses, CollectiveContribution } from '../types';

const STORAGE_KEY = 'ra_attendee_session';

export const INITIAL_SHARED_RESPONSES: SharedResponses = {
  worldDistribution: {},
  chapter2: {},
  chapter3: {},
  chapter4: {},
  chapter6: {},
  totalParticipants: 0,
};

type AggregateListener = (data: SharedResponses, collective: CollectiveContribution[]) => void;
type SessionListener = (session: AttendeeSession) => void;

class SessionManager {
  private session: AttendeeSession;
  private sharedResponses: SharedResponses = { ...INITIAL_SHARED_RESPONSES };
  private collectiveContributions: CollectiveContribution[] = [];
  private ws: WebSocket | null = null;
  private aggregateListeners: Set<AggregateListener> = new Set();
  private sessionListeners: Set<SessionListener> = new Set();
  private isWsConnected: boolean = false;
  private wsRetryCount: number = 0;

  constructor() {
    this.session = this.loadLocalSession();

    if (typeof window !== 'undefined') {
      this.initWebSocket();
    }
  }

  private loadLocalSession(): AttendeeSession {
    if (typeof window === 'undefined') {
      return {
        attendeeId: 'server',
        currentChapter: 1,
        answers: {},
        revealedStoryIds: [],
      };
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.currentChapter === 'number') {
          return {
            attendeeId: parsed.attendeeId || this.generateAttendeeId(),
            currentChapter: Math.max(1, Math.min(7, parsed.currentChapter)),
            selectedCommunity: parsed.selectedCommunity,
            answers: parsed.answers || {},
            revealedStoryIds: parsed.revealedStoryIds || [],
          };
        }
      }
    } catch (e) {
      console.warn('Could not read saved attendee session:', e);
    }

    const newId = this.generateAttendeeId();
    const initialSession: AttendeeSession = {
      attendeeId: newId,
      currentChapter: 1,
      answers: {},
      revealedStoryIds: [],
    };
    this.saveLocalSession(initialSession);
    return initialSession;
  }

  private generateAttendeeId(): string {
    return 'att_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36).substring(4);
  }

  private saveLocalSession(session: AttendeeSession) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save attendee session to localStorage:', e);
    }
  }

  public getSession(): AttendeeSession {
    return this.session;
  }

  public subscribeSession(listener: SessionListener): () => void {
    this.sessionListeners.add(listener);
    listener(this.session);
    return () => {
      this.sessionListeners.delete(listener);
    };
  }

  public subscribeAggregate(listener: AggregateListener): () => void {
    this.aggregateListeners.add(listener);
    listener(this.sharedResponses, this.collectiveContributions);
    return () => {
      this.aggregateListeners.delete(listener);
    };
  }

  private notifySession() {
    this.saveLocalSession(this.session);
    const sessionCopy: AttendeeSession = {
      ...this.session,
      answers: { ...this.session.answers },
      revealedStoryIds: [...this.session.revealedStoryIds],
    };
    this.session = sessionCopy;
    this.sessionListeners.forEach((fn) => fn(sessionCopy));
  }

  private notifyAggregate() {
    const sharedCopy: SharedResponses = {
      ...this.sharedResponses,
      worldDistribution: { ...this.sharedResponses.worldDistribution },
      chapter2: { ...this.sharedResponses.chapter2 },
      chapter3: { ...this.sharedResponses.chapter3 },
      chapter4: { ...this.sharedResponses.chapter4 },
      chapter6: { ...this.sharedResponses.chapter6 },
    };
    const collectiveCopy = [...this.collectiveContributions];
    this.aggregateListeners.forEach((fn) => fn(sharedCopy, collectiveCopy));
  }

  public setChapter(chapter: number) {
    if (chapter < 1 || chapter > 7) return;
    this.session.currentChapter = chapter;
    this.notifySession();
  }

  public setCommunity(community: CommunityType) {
    this.session.selectedCommunity = community;
    this.notifySession();

    if (this.ws && this.isWsConnected) {
      this.ws.send(JSON.stringify({
        type: 'SUBMIT_COMMUNITY',
        payload: {
          attendeeId: this.session.attendeeId,
          community,
        },
      }));
    }
  }

  public setAnswer(chapter: number, optionId: string) {
    this.session.answers[chapter] = optionId;
    this.notifySession();

    if (this.ws && this.isWsConnected) {
      this.ws.send(JSON.stringify({
        type: 'SUBMIT_ANSWER',
        payload: {
          attendeeId: this.session.attendeeId,
          chapter,
          optionId,
          community: this.session.selectedCommunity,
        },
      }));
    }
  }

  public toggleStoryId(id: string) {
    if (!this.session.revealedStoryIds.includes(id)) {
      this.session.revealedStoryIds.push(id);
      this.notifySession();
    }
  }

  public resetSession() {
    this.session = {
      attendeeId: this.generateAttendeeId(),
      currentChapter: 1,
      answers: {},
      revealedStoryIds: [],
    };
    this.notifySession();
  }

  private initWebSocket() {
    if (typeof window === 'undefined') return;

    // In static production hosting (e.g. GitHub Pages), operate in local-first mode without WS polling
    if (window.location.hostname.includes('github.io') || this.wsRetryCount >= 2) {
      return;
    }

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws-sync`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isWsConnected = true;
        this.wsRetryCount = 0;
        // Re-sync current choices if any exist
        if (this.session.selectedCommunity) {
          this.ws?.send(JSON.stringify({
            type: 'SUBMIT_COMMUNITY',
            payload: {
              attendeeId: this.session.attendeeId,
              community: this.session.selectedCommunity,
            },
          }));
        }
        Object.entries(this.session.answers).forEach(([ch, optId]) => {
          this.ws?.send(JSON.stringify({
            type: 'SUBMIT_ANSWER',
            payload: {
              attendeeId: this.session.attendeeId,
              chapter: Number(ch),
              optionId: optId,
              community: this.session.selectedCommunity,
            },
          }));
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'AGGREGATE_STATE' && data.payload) {
            this.sharedResponses = {
              worldDistribution: data.payload.communityDistribution || {},
              chapter2: data.payload.chapter2 || {},
              chapter3: data.payload.chapter3 || {},
              chapter4: data.payload.chapter4 || {},
              chapter6: data.payload.chapter6 || {},
              totalParticipants: data.payload.totalParticipants || 0,
            };
            this.collectiveContributions = data.payload.collectiveContributions || [];
            this.notifyAggregate();
          }
        } catch (e) {
          console.warn('Error parsing incoming aggregate message:', e);
        }
      };

      this.ws.onclose = () => {
        this.isWsConnected = false;
        this.wsRetryCount++;
        if (this.wsRetryCount < 2) {
          setTimeout(() => this.initWebSocket(), 5000);
        }
      };

      this.ws.onerror = () => {
        this.isWsConnected = false;
        this.wsRetryCount++;
        this.ws?.close();
      };
    } catch (e) {
      console.warn('WebSocket not available, operating in local-first mode:', e);
    }
  }

  public isConnected(): boolean {
    return this.isWsConnected;
  }
}

export const sessionManager = new SessionManager();
