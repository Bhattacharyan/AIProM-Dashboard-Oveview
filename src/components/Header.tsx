import { useState } from 'react';
import { 
  Building2, 
  ShieldAlert, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  Bell, 
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface HeaderProps {
  onOpenAuditLogs: () => void;
  resolvedInsightsCount: number;
}

export function Header({ onOpenAuditLogs, resolvedInsightsCount }: HeaderProps) {
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  return (
    <header className="border-b border-slate-800/80 bg-[#0d1322]/90 backdrop-blur-md sticky top-0 z-30">
      {/* Top Alert / Sync Banner */}
      {showInfoBanner && (
        <div className="bg-amber-950/40 border-b border-amber-900/40 px-4 py-1.5 text-xs text-amber-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">!</span>
            <p className="font-medium">
              Portfolio Alert: 12 projects flagged At-Risk across 2 departments. AI Risk Engine identified 2 high-priority mitigation opportunities.
            </p>
          </div>
          <button 
            onClick={() => setShowInfoBanner(false)}
            className="text-amber-400/70 hover:text-amber-300 text-xs px-2 py-0.5 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Organization */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 shadow-inner">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2 py-0.5 rounded-md">
                Executive Portal
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                Global Portfolio <ChevronRight className="w-3 h-3 text-slate-600" /> Q3-Q4 Executive Review
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Enterprise Project & Risk Intelligence
              <span className="text-xs font-normal text-slate-400 border border-slate-700 bg-slate-800/60 px-2 py-0.5 rounded-full">
                Live Data
              </span>
            </h1>
          </div>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">Risk Engine:</span>
            <span className="font-semibold text-slate-200">Active v4.2</span>
          </div>

          <button
            onClick={onOpenAuditLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer"
            title="View Executive Action Audit Log"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            <span>Audit Trail</span>
            {resolvedInsightsCount > 0 && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-1">
                +{resolvedInsightsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
