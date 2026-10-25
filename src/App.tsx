import { useState, useEffect } from 'react';
import { AttendeeSession, CommunityType, SharedResponses, CollectiveContribution } from './types';
import { CHAPTERS_DATA } from './data/chaptersData';
import { sessionManager, INITIAL_SHARED_RESPONSES } from './sync/syncClient';
import { MultiverseBackground } from './components/background/MultiverseBackground';
import { ComicNavbar } from './components/ui/ComicNavbar';
import { AttendeeChapterView } from './components/attendee/AttendeeChapterView';
import { PresenterView } from './components/presenter/PresenterView';
import { PresentationDisplay } from './components/display/PresentationDisplay';
import { SpideySwingingTransition } from './components/animation/SpideySwingingTransition';
import { Lock, AlertCircle } from 'lucide-react';

export function App() {
  const [session, setSession] = useState<AttendeeSession>(() => sessionManager.getSession());
  const [sharedResponses, setSharedResponses] = useState<SharedResponses>(INITIAL_SHARED_RESPONSES);
  const [collectiveContributions, setCollectiveContributions] = useState<CollectiveContribution[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [swingDirection, setSwingDirection] = useState<'forward' | 'backward'>('forward');

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

  const triggerSwing = (direction: 'forward' | 'backward') => {
    if (!reducedMotion) {
      setSwingDirection(direction);
      setIsSwinging(true);
    }
  };

  const handleNextChapter = () => {
    if (session.currentChapter < 7) {
      triggerSwing('forward');
      const nextChapter = session.currentChapter + 1;
      sessionManager.setChapter(nextChapter);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevChapter = () => {
    if (session.currentChapter > 1) {
      triggerSwing('backward');
      const prevChapter = session.currentChapter - 1;
      sessionManager.setChapter(prevChapter);
      window.scrollTo(0, 0);
    }
  };

  const handleJumpToChapter = (chapterNumber: number) => {
    if (chapterNumber !== session.currentChapter) {
      triggerSwing(chapterNumber > session.currentChapter ? 'forward' : 'backward');
      sessionManager.setChapter(chapterNumber);
      window.scrollTo(0, 0);
    }
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
              reducedMotion={reducedMotion}
            />
          </main>

          {/* Clean attendee footer (No admin links exposed) */}
          <footer className="mt-auto py-3 px-4 border-t border-gray-900 bg-black/80 backdrop-blur-xs text-center">
            <div className="max-w-md mx-auto text-[11px] font-mono text-gray-400 flex items-center justify-between">
              <span className="text-spider-cyan">RA: Across the Multi-Doors</span>
              <span>One Mission &bull; Two Worlds</span>
            </div>
          </footer>
        </div>
      )}

      {/* Protected Admin Passcode Modal (Only shown if presenter URL parameter was requested) */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1526] border-3 border-black p-5 rounded-sm shadow-comic">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-spider-red rounded-xs border border-black shadow-comic-sm">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-comic text-xl text-white uppercase tracking-wide">
                Presenter Team Access
              </h3>
            </div>

            <p className="text-xs font-sans text-gray-300 mb-4 leading-relaxed">
              This area is restricted to conference presenters for monitoring and display purposes.
            </p>

            <form onSubmit={handleVerifyPasscode} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                  Enter Passcode:
                </label>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Passcode..."
                  className="w-full p-2.5 bg-black/70 border border-gray-700 focus:border-spider-cyan text-white text-sm font-mono rounded-sm outline-none"
                  autoFocus
                />
              </div>

              {passcodeError && (
                <div className="text-xs font-mono text-spider-red flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passcode. Please try again.</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDismissPasscode}
                  className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-mono rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-spider-red hover:bg-spider-crimson text-white text-xs font-comic uppercase tracking-wider rounded-sm border border-black shadow-comic-sm cursor-pointer"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Spider-Man Web-Swinging Chapter Transition Animation (Rendered on top) */}
      <SpideySwingingTransition
        isActive={isSwinging}
        direction={swingDirection}
        onComplete={() => setIsSwinging(false)}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export default App;
