import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in multiverse app:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    try {
      localStorage.removeItem('ra_attendee_session');
      localStorage.removeItem('ra_attendee_profile');
    } catch (e) {
      // ignore
    }
    window.location.href = window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08090D] text-white flex flex-col items-center justify-center p-6 text-center selection:bg-spider-red selection:text-white">
          <div className="w-full max-w-md bg-[#0D1322] border-3 border-black p-6 rounded-sm shadow-comic">
            <div className="w-14 h-14 mx-auto mb-4 bg-spider-red/20 border-2 border-spider-red rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-8 h-8 text-spider-red" />
            </div>

            <span className="inline-block px-3 py-1 bg-spider-yellow text-black font-comic text-xs uppercase tracking-wider mb-2 border border-black shadow-comic-sm">
              DIMENSIONAL GLITCH DETECTED
            </span>

            <h1 className="font-comic text-3xl sm:text-4xl text-white tracking-wide uppercase mb-3">
              MULTIVERSE DISTORTION
            </h1>

            <p className="text-sm font-sans text-gray-300 leading-relaxed mb-6">
              A temporary glitch occurred while rendering this dimension. You don't need any special account or approval to continue.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full py-3.5 bg-spider-red hover:bg-spider-crimson text-white font-comic text-lg uppercase tracking-wider border-2 border-black rounded-sm shadow-comic active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Experience</span>
              </button>

              <button
                onClick={this.handleReset}
                className="w-full py-2.5 bg-black/60 hover:bg-black text-gray-400 hover:text-gray-200 text-xs font-mono border border-gray-700 rounded-sm transition-all cursor-pointer"
              >
                Clear local session and restart
              </button>
            </div>

            {this.state.error && (
              <details className="mt-4 text-left text-[11px] font-mono text-gray-500 bg-black/40 p-2 rounded-xs border border-gray-800">
                <summary className="cursor-pointer text-gray-400">Technical details</summary>
                <p className="mt-1 text-spider-red/80 overflow-x-auto whitespace-pre-wrap">
                  {this.state.error.message}
                </p>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
