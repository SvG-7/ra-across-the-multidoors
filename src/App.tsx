import { useState, useEffect } from 'react';
import { AttendeeSession, CommunityType, SharedResponses, CollectiveContribution } from './types';
import { CHAPTERS_DATA } from './data/chaptersData';
import { sessionManager, INITIAL_SHARED_RESPONSES } from './sync/syncClient';
import { MultiverseBackground } from './components/background/MultiverseBackground';
import { ComicNavbar } from './components/ui/ComicNavbar';
import { AttendeeChapterView } from './components/attendee/AttendeeChapterView';
import { PresenterView } from './components/presenter/PresenterView';
import { PresentationDisplay } from './components/display/PresentationDisplay';
import { SpiderManTransition, TransitionType } from './components/animation/SpiderManTransition';
import { Lock, AlertCircle } from 'lucide-react';

export function App() {
  const [session, setSession] = useState<AttendeeSession>(() => sessionManager.getSession());
  const [sharedResponses, setSharedResponses] = useState<SharedResponses>(INITIAL_SHARED_RESPONSES);
  const [collectiveContributions, setCollectiveContributions] = useState<CollectiveContribution[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [transitionState, setTransitionState] = useState<{
    isActive: boolean;
    type: TransitionType;
  }>({
    isActive: false,
    type: '1_to_2',
  });

  // Protected Admin / Presentation Team Mode State
  const [viewMode, setViewMode] = useState<'attendee' | 'presenter' | 'display'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isDisplay = params.get('display') === 'true' || window.location.hash === '#display';
      if (isDisplay) return 'display';
      const isAdmin = params.get('admin') || params.get('presenter');
      if (isAdmin && sessionStorage.getItem('ra_admin_auth') === 'true') {
        return 'presenter';
      }
    }
    return 'attendee';
  });

  // Passcode modal state for presenter access
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Check URL on mount for presenter request
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') || params.get('presenter')) {
        if (sessionStorage.getItem('ra_admin_auth') !== 'true') {
          setShowPasscodeModal(true);
        }
      }
    }
  }, []);

  // Subscribe to local attendee session changes
  useEffect(() => {
    const unsub = sessionManager.subscribeSession((newSession) => {
      setSession(newSession);
    });
    return () => unsub();
  }, []);

  // Subscribe to aggregate response updates
  useEffect(() => {
    const unsub = sessionManager.subscribeAggregate((newShared, newCollective) => {
      setSharedResponses(newShared);
      setCollectiveContributions(newCollective);
    });
    return () => unsub();
  }, []);

  // Auto-detect reduced-motion preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Handlers for Attendee Actions
  const handleSelectCommunity = (community: CommunityType) => {
    sessionManager.setCommunity(community);
  };

  const handleSubmitAnswer = (chapterNumber: number, optionId: string) => {
    sessionManager.setAnswer(chapterNumber, optionId);
  };

  const handleToggleStoryReveal = (id: string) => {
    sessionManager.toggleStoryId(id);
  };

  const triggerTransition = (type: TransitionType) => {
    if (!reducedMotion) {
      setTransitionState({ isActive: true, type });
    }
  };

  const handleNextChapter = () => {
    if (transitionState.isActive) return; // Prevent double-tap skipping
    if (session.currentChapter < 7) {
      const fromCh = session.currentChapter;
      const nextChapter = fromCh + 1;
      const typeKey: TransitionType = 
        fromCh === 1 ? '1_to_2' :
        fromCh === 2 ? '2_to_3' :
        fromCh === 3 ? '3_to_4' :
        fromCh === 4 ? '4_to_5' :
        fromCh === 5 ? '5_to_6' :
        fromCh === 6 ? '6_to_7' : '1_to_2';

      triggerTransition(typeKey);
      sessionManager.setChapter(nextChapter);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevChapter = () => {
    if (transitionState.isActive) return; // Prevent double-tap skipping
    if (session.currentChapter > 1) {
      triggerTransition('backward');
      const prevChapter = session.currentChapter - 1;
      sessionManager.setChapter(prevChapter);
      window.scrollTo(0, 0);
    }
  };

  const handleJumpToChapter = (chapterNumber: number) => {
    if (transitionState.isActive) return; // Prevent double-tap skipping
    if (chapterNumber !== session.currentChapter) {
      if (chapterNumber < session.currentChapter) {
        triggerTransition('backward');
      } else {
        const typeKey: TransitionType = 
          chapterNumber === 2 ? '1_to_2' :
          chapterNumber === 3 ? '2_to_3' :
          chapterNumber === 4 ? '3_to_4' :
          chapterNumber === 5 ? '4_to_5' :
          chapterNumber === 6 ? '5_to_6' :
          chapterNumber === 7 ? '6_to_7' : '1_to_2';
        triggerTransition(typeKey);
      }
      sessionManager.setChapter(chapterNumber);
      window.scrollTo(0, 0);
    }
  };

  const handleTriggerEntryTransition = () => {
    if (transitionState.isActive) return;
    triggerTransition('entry_to_1');
  };

  // Passcode verification for Presentation Team
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === 'multiverse2026' || passcodeInput === 'ra2026') {
      sessionStorage.setItem('ra_admin_auth', 'true');
      setShowPasscodeModal(false);
      setViewMode('presenter');
      setPasscodeError(false);
      setPasscodeInput('');
    } else {
      setPasscodeError(true);
    }
  };

  const handleDismissPasscode = () => {
    setShowPasscodeModal(false);
    setPasscodeInput('');
    setPasscodeError(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('admin');
      url.searchParams.delete('presenter');
      window.history.replaceState({}, '', url.toString());
    }
    setViewMode('attendee');
  };

  const currentChapter = CHAPTERS_DATA[session.currentChapter - 1] || CHAPTERS_DATA[0];

  return (
    <div className="min-h-screen bg-spider-dark text-white relative font-sans selection:bg-spider-red selection:text-white flex flex-col">
      {/* Spider-Verse Animated Background (Calm mode prevents distraction behind reading) */}
      <MultiverseBackground
        reducedMotion={reducedMotion}
        calmMode={true}
      />

      {/* RENDER VIEW ACCORDING TO VIEW MODE */}
      {viewMode === 'presenter' ? (
        <div className="relative z-10 min-h-screen flex flex-col bg-[#06080E]/95 backdrop-blur-sm">
          <PresenterView
            chapters={CHAPTERS_DATA}
            sharedResponses={sharedResponses}
            onExitAdmin={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('admin');
              url.searchParams.delete('presenter');
              window.history.replaceState({}, '', url.toString());
              setViewMode('attendee');
            }}
            onOpenDisplay={() => setViewMode('display')}
          />
        </div>
      ) : viewMode === 'display' ? (
        <div className="relative z-10 min-h-screen flex flex-col">
          <PresentationDisplay
            chapters={CHAPTERS_DATA}
            sharedResponses={sharedResponses}
            collectiveContributions={collectiveContributions}
            reducedMotion={reducedMotion}
          />
          {/* Subtle Stage Exit button */}
          <div className="fixed bottom-2 right-2 z-50 opacity-40 hover:opacity-100 transition-opacity">
            <button
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.delete('display');
                window.history.replaceState({}, '', url.toString());
                setViewMode('attendee');
              }}
              className="px-2 py-1 bg-black/80 border border-gray-600 text-[10px] font-mono text-gray-300 hover:text-spider-cyan rounded cursor-pointer"
            >
              Exit Display
            </button>
          </div>
        </div>
      ) : (
        /* Attendee View (Default Independent Self-Guided Experience) */
        <div className="relative z-10 flex-1 flex flex-col w-full">
          <ComicNavbar
            reducedMotion={reducedMotion}
            onToggleMotion={setReducedMotion}
            soundEnabled={soundEnabled}
            onToggleSound={setSoundEnabled}
            currentChapter={session.currentChapter}
            onSelectChapter={handleJumpToChapter}
          />

          <main className="flex-1 w-full flex flex-col">
            <AttendeeChapterView
              chapter={currentChapter}
              session={session}
              sharedResponses={sharedResponses}
              collectiveContributions={collectiveContributions}
              onSelectCommunity={handleSelectCommunity}
              onSubmitAnswer={handleSubmitAnswer}
              onToggleStoryReveal={handleToggleStoryReveal}
              onNextChapter={handleNextChapter}
              onPrevChapter={handlePrevChapter}
              onJumpToChapter={handleJumpToChapter}
              onTriggerEntryTransition={handleTriggerEntryTransition}
              reducedMotion={reducedMotion}
            />
          </main>
        </div>
      )}

      {/* Admin Passcode Gate Modal */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0C1222] border-3 border-black p-6 rounded-sm max-w-sm w-full shadow-comic text-white">
            <div className="flex items-center gap-2 mb-3 text-spider-yellow">
              <Lock className="w-5 h-5" />
              <h3 className="font-comic text-xl uppercase tracking-wider text-white">
                Presenter Command Passcode
              </h3>
            </div>
            <p className="text-xs font-mono text-gray-300 mb-4">
              Restricted to conference facilitators and AV projection crew.
            </p>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setPasscodeError(false);
                  }}
                  autoFocus
                  className="w-full bg-black/80 border-2 border-gray-700 focus:border-spider-cyan p-3 rounded-xs text-white font-mono text-sm outline-none"
                />
                {passcodeError && (
                  <p className="text-spider-red text-xs font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Incorrect passcode</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDismissPasscode}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs rounded-xs cursor-pointer"
                >
                  Return to Audience View
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-spider-red hover:bg-spider-crimson text-white font-comic uppercase text-sm tracking-wide rounded-xs border border-black shadow-comic-sm cursor-pointer"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Spider-Man Distinct Action Transition Animation (Rendered on top) */}
      <SpiderManTransition
        isActive={transitionState.isActive}
        transitionType={transitionState.type}
        onComplete={() => setTransitionState((prev) => ({ ...prev, isActive: false }))}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export default App;
