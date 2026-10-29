import { 
  AttendeeSession, 
  CommunityType, 
  SharedResponses, 
  CollectiveContribution, 
  SyncConnectionStatus 
} from '../types';

const STORAGE_KEY = 'ra_attendee_session';
const NTFY_TOPIC = 'ra_multidoors_room_2026';
const NTFY_HTTP = `https://ntfy.sh/${NTFY_TOPIC}`;
const NTFY_WS = `wss://ntfy.sh/${NTFY_TOPIC}/ws`;

export const INITIAL_SHARED_RESPONSES: SharedResponses = {
  worldDistribution: {},
  chapter2: {},
  chapter3: {},
  chapter4: {},
  chapter6: {},
  totalParticipants: 0,
  connectionStatus: 'loading',
};

interface AttendeeRecord {
  attendeeId: string;
  community?: CommunityType;
  answers: Record<number, string>;
  updatedAt: number;
}

type AggregateListener = (data: SharedResponses, collective: CollectiveContribution[]) => void;
type SessionListener = (session: AttendeeSession) => void;

class SessionManager {
  private session: AttendeeSession;
  private sharedResponses: SharedResponses = { ...INITIAL_SHARED_RESPONSES };
  private collectiveContributions: CollectiveContribution[] = [];
  private attendeeMap: Map<string, AttendeeRecord> = new Map();
  private ws: WebSocket | null = null;
  private aggregateListeners: Set<AggregateListener> = new Set();
  private sessionListeners: Set<SessionListener> = new Set();
  private connectionStatus: SyncConnectionStatus = 'loading';
  private pollInterval: any = null;

  constructor() {
    this.session = this.loadLocalSession();

    // Seed local attendee record
    if (this.session.attendeeId) {
      this.attendeeMap.set(this.session.attendeeId, {
        attendeeId: this.session.attendeeId,
        community: this.session.selectedCommunity,
        answers: { ...this.session.answers },
        updatedAt: Date.now(),
      });
    }

    if (typeof window !== 'undefined') {
      this.initSharedSync();
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
    return 'att_' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36).substring(4);
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

  public getSharedResponses(): SharedResponses {
    return this.sharedResponses;
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

  private recalculateAggregate() {
    const worldDist: Record<string, number> = {};
    const ch2Dist: Record<string, number> = {};
    const ch3Dist: Record<string, number> = {};
    const ch4Dist: Record<string, number> = {};
    const ch6Dist: Record<string, number> = {};
    const collective: CollectiveContribution[] = [];

    // Colors for collective multiverse network nodes
    const colors = ['#FF1744', '#00F0FF', '#FFE600', '#A855F7', '#10B981', '#F97316'];

    let countWithAnswers = 0;

    this.attendeeMap.forEach((rec) => {
      if (rec.community) {
        worldDist[rec.community] = (worldDist[rec.community] || 0) + 1;
      }

      const hasAnsweredAny = Object.keys(rec.answers).length > 0;
      if (hasAnsweredAny) {
        countWithAnswers++;
      }

      if (rec.answers[2]) ch2Dist[rec.answers[2]] = (ch2Dist[rec.answers[2]] || 0) + 1;
      if (rec.answers[3]) ch3Dist[rec.answers[3]] = (ch3Dist[rec.answers[3]] || 0) + 1;
      if (rec.answers[4]) ch4Dist[rec.answers[4]] = (ch4Dist[rec.answers[4]] || 0) + 1;
      if (rec.answers[6]) ch6Dist[rec.answers[6]] = (ch6Dist[rec.answers[6]] || 0) + 1;

      collective.push({
        attendeeId: rec.attendeeId,
        world: rec.community || 'Residence hall',
        ch2Choice: rec.answers[2],
        ch3Choice: rec.answers[3],
        ch4Choice: rec.answers[4],
        ch6Choice: rec.answers[6],
        nodeColor: colors[Math.abs(hashString(rec.attendeeId)) % colors.length],
      });
    });

    // Determine connection status
    let status: SyncConnectionStatus = this.connectionStatus;
    if (status !== 'error' && status !== 'loading') {
      if (countWithAnswers === 0) {
        status = 'connected_empty';
      } else if (countWithAnswers === 1 && this.attendeeMap.has(this.session.attendeeId) && Object.keys(this.session.answers).length > 0) {
        status = 'only_me';
      } else {
        status = 'has_contributions';
      }
    }

    this.connectionStatus = status;

    this.sharedResponses = {
      worldDistribution: worldDist,
      chapter2: ch2Dist,
      chapter3: ch3Dist,
      chapter4: ch4Dist,
      chapter6: ch6Dist,
      totalParticipants: countWithAnswers,
      connectionStatus: status,
    };

    this.collectiveContributions = collective;

    const sharedCopy: SharedResponses = {
      worldDistribution: { ...worldDist },
      chapter2: { ...ch2Dist },
      chapter3: { ...ch3Dist },
      chapter4: { ...ch4Dist },
      chapter6: { ...ch6Dist },
      totalParticipants: countWithAnswers,
      connectionStatus: status,
    };

    this.aggregateListeners.forEach((fn) => fn(sharedCopy, [...collective]));
  }

  public setChapter(chapter: number) {
    if (chapter < 1 || chapter > 7) return;
    this.session.currentChapter = chapter;
    this.notifySession();
  }

  public setCommunity(community: CommunityType) {
    this.session.selectedCommunity = community;
    this.notifySession();

    // Update local record
    const existing = this.attendeeMap.get(this.session.attendeeId) || {
      attendeeId: this.session.attendeeId,
      answers: {},
      updatedAt: Date.now(),
    };
    existing.community = community;
    existing.updatedAt = Date.now();
    this.attendeeMap.set(this.session.attendeeId, existing);
    this.recalculateAggregate();

    // Broadcast to room
    this.publishEvent({
      type: 'COMMUNITY',
      attendeeId: this.session.attendeeId,
      community,
      timestamp: Date.now(),
    });
  }

  public setAnswer(chapter: number, optionId: string) {
    this.session.answers[chapter] = optionId;
    this.notifySession();

    // Update local record (revisions overwrite existing answer)
    const existing = this.attendeeMap.get(this.session.attendeeId) || {
      attendeeId: this.session.attendeeId,
      answers: {},
      updatedAt: Date.now(),
    };
    existing.community = this.session.selectedCommunity;
    existing.answers[chapter] = optionId;
    existing.updatedAt = Date.now();
    this.attendeeMap.set(this.session.attendeeId, existing);
    this.recalculateAggregate();

    // Broadcast to room
    this.publishEvent({
      type: 'ANSWER',
      attendeeId: this.session.attendeeId,
      chapter,
      optionId,
      community: this.session.selectedCommunity,
      timestamp: Date.now(),
    });
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

  // ---------------------------------------------------------------------------
  // PUBLIC REAL-TIME ROOM SYNCHRONIZATION
  // ---------------------------------------------------------------------------
  public retryConnection() {
    this.connectionStatus = 'loading';
    this.recalculateAggregate();
    this.initSharedSync();
  }

  private async publishEvent(data: any) {
    try {
      await fetch(`${NTFY_HTTP}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.warn('Could not publish event to room:', e);
    }
  }

  private initSharedSync() {
    if (typeof window === 'undefined') return;

    this.connectionStatus = 'loading';
    this.recalculateAggregate();

    // 1. Initial Pull of historical room contributions
    this.fetchHistoricalResponses();

    // 2. Open WebSocket for instant real-time incoming pushes
    try {
      if (this.ws) {
        this.ws.close();
      }

      this.ws = new WebSocket(NTFY_WS);

      this.ws.onopen = () => {
        this.connectionStatus = 'has_contributions';
        this.recalculateAggregate();
      };

      this.ws.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw && raw.message) {
            const parsed = JSON.parse(raw.message);
            this.handleIncomingEvent(parsed);
          }
        } catch (e) {
          // Ignore non-json system pings
        }
      };

      this.ws.onerror = () => {
        console.warn('Real-time sync error, switching to HTTP polling fallback');
        this.connectionStatus = 'error';
        this.recalculateAggregate();
      };

      this.ws.onclose = () => {
        // Fallback to periodic 10s HTTP polling if WebSocket closes
        this.startHttpPollingFallback();
      };
    } catch (e) {
      console.warn('WebSocket unavailable, running HTTP polling:', e);
      this.startHttpPollingFallback();
    }
  }

  private async fetchHistoricalResponses() {
    try {
      const resp = await fetch(`${NTFY_HTTP}/json?poll=1&since=all`);
      if (resp.ok) {
        const text = await resp.text();
        const lines = text.trim().split('\n');
        lines.forEach((line) => {
          if (!line) return;
          try {
            const envelope = JSON.parse(line);
            if (envelope.message) {
              const data = JSON.parse(envelope.message);
              this.handleIncomingEvent(data, false);
            }
          } catch (e) {
            // ignore malformed lines
          }
        });
        this.recalculateAggregate();
      }
    } catch (err) {
      console.warn('Failed to fetch historical room responses:', err);
    }
  }

  private handleIncomingEvent(data: any, triggerRecalc = true) {
    if (!data || !data.attendeeId) return;

    const { type, attendeeId, community, chapter, optionId } = data;

    const record: AttendeeRecord = this.attendeeMap.get(attendeeId) || {
      attendeeId,
      community: undefined,
      answers: {},
      updatedAt: data.timestamp || Date.now(),
    };

    if (type === 'COMMUNITY' && community) {
      record.community = community;
    } else if (type === 'ANSWER' && chapter && optionId) {
      record.answers[Number(chapter)] = optionId;
      if (community) record.community = community;
    }

    record.updatedAt = data.timestamp || Date.now();
    this.attendeeMap.set(attendeeId, record);

    if (triggerRecalc) {
      this.recalculateAggregate();
    }
  }

  private startHttpPollingFallback() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.fetchHistoricalResponses();
    }, 8000);
  }
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export const sessionManager = new SessionManager();
