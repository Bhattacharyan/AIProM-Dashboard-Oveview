import { useState } from 'react';
import { 
  ChevronRight, 
  History
} from 'lucide-react';

interface HeaderProps {
  onOpenAuditLogs: () => void;
  resolvedInsightsCount: number;
}

export function Header({ onOpenAuditLogs, resolvedInsightsCount }: HeaderProps) {
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  return (
    <header className="border-b border-slate-800 bg-[#0d1322] sticky top-0 z-30">
      {/* Top Alert Banner */}
      {showInfoBanner && (
        <div className="bg-amber-950/30 border-b border-amber-900/30 px-4 py-1.5 text-xs text-amber-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <span className="font-semibold text-amber-400">Notice:</span>
            <span>
              12 projects currently flagged At-Risk. 2 high-priority mitigation opportunities identified for Mallionair & Spark MMT.
            </span>
          </div>
          <button 
            onClick={() => setShowInfoBanner(false)}
            className="text-amber-400/60 hover:text-amber-300 text-xs px-2 py-0.5 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Organization */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Portfolio Operations</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span>Executive Review</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-mono">Live</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white mt-0.5">
            Enterprise Project & Risk Portfolio
          </h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={onOpenAuditLogs}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 hover:border-slate-700 transition cursor-pointer"
            title="View Executive Action Audit Log"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Audit Trail</span>
            {resolvedInsightsCount > 0 && (
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                +{resolvedInsightsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
