import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ExecutiveStats } from '../types';

interface TaskBreakdownProps {
  stats: ExecutiveStats;
  onSelectStatus: (status: 'Open' | 'In Progress' | 'Done' | 'Blocked') => void;
}

export function TaskBreakdown({ stats, onSelectStatus }: TaskBreakdownProps) {
  const totalTasks = stats.totalOpenTasks + stats.totalInProgressTasks + stats.totalDoneTasks + stats.totalBlockedTasks;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Interactive Work Item Breakdown
            <span className="text-xs font-normal text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full font-mono">
              {totalTasks.toLocaleString()} Portfolio Items
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time status aggregates across all 127 active initiatives. Click any status card to inspect active work items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Open */}
        <div
          onClick={() => onSelectStatus('Open')}
          className="group relative bg-[#111827] hover:bg-[#162035] border border-slate-800 hover:border-sky-500/50 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Open</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {((stats.totalOpenTasks / totalTasks) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {stats.totalOpenTasks}
            </span>
            <span className="text-xs text-slate-400">work items</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="text-sky-400/90 font-medium italic">
              (Click to view open items)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div
          onClick={() => onSelectStatus('In Progress')}
          className="group relative bg-[#111827] hover:bg-[#162035] border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">In Progress</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {((stats.totalInProgressTasks / totalTasks) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
              {stats.totalInProgressTasks}
            </span>
            <span className="text-xs text-slate-400">active items</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="text-amber-400/90 font-medium italic">
              (Click to view active items)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Card 3: Done */}
        <div
          onClick={() => onSelectStatus('Done')}
          className="group relative bg-[#111827] hover:bg-[#162035] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Done</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {((stats.totalDoneTasks / totalTasks) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
              {stats.totalDoneTasks}
            </span>
            <span className="text-xs text-slate-400">completed items</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-400/90 font-medium italic">
              (Click to view completed items)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Card 4: Blocked */}
        <div
          onClick={() => onSelectStatus('Blocked')}
          className="group relative bg-[#111827] hover:bg-[#162035] border border-slate-800 hover:border-emerald-500/40 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Blocked</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
              0.0%
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats.totalBlockedTasks}
            </span>
            <span className="text-xs text-emerald-400 font-medium">pipeline unblocked</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              *(All clear)*
            </span>
            <span className="text-slate-500 group-hover:text-slate-300">Inspect log →</span>
          </div>
        </div>

      </div>
    </section>
  );
}
