import { Users, FolderKanban, CheckCircle2, HeartPulse, ArrowUpRight, ArrowDownRight, AlertTriangle, DollarSign } from 'lucide-react';
import { ExecutiveStats } from '../types';

interface ExecutiveCardsProps {
  stats: ExecutiveStats;
  onFilterHealth: (health: 'All' | 'Good' | 'At-Risk' | 'Critical') => void;
  activeHealthFilter: string;
  onOpenTeamModal: () => void;
  onOpenCompletedTasksModal: () => void;
}

export function ExecutiveCards({
  stats,
  onFilterHealth,
  activeHealthFilter,
  onOpenTeamModal,
  onOpenCompletedTasksModal,
}: ExecutiveCardsProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Executive Summary
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          Last consolidated: 3 mins ago
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Members */}
        <div 
          onClick={onOpenTeamModal}
          className="group relative bg-[#111827] hover:bg-[#151f33] border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Total Members</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats.totalMembers}
            </span>
            <span className="text-xs text-slate-400">active contributors</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              92% Utilization
            </span>
            <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
              View roster →
            </span>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="relative bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Active Projects</span>
            <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-800/50 flex items-center justify-center text-sky-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats.activeProjects}
            </span>
            <span className="text-xs text-slate-400">tracked</span>
          </div>
          {/* Sub-breakdown chips */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => onFilterHealth(activeHealthFilter === 'At-Risk' ? 'All' : 'At-Risk')}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
                activeHealthFilter === 'At-Risk'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-amber-950/40 text-amber-400 border border-amber-900/50 hover:bg-amber-900/40'
              }`}
              title="Click to filter by At-Risk projects"
            >
              <AlertTriangle className="w-3 h-3" />
              <span><strong>{stats.atRiskProjects}</strong> At-Risk</span>
            </button>
            <span className="text-slate-600">·</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-950/40 text-rose-400 border border-rose-900/50 font-medium">
              <DollarSign className="w-3 h-3" />
              <span><strong>{stats.overBudgetProjects}</strong> Over-Budget</span>
            </span>
          </div>
        </div>

        {/* Card 3: Tasks Completed (30d) */}
        <div 
          onClick={onOpenCompletedTasksModal}
          className="group relative bg-[#111827] hover:bg-[#151f33] border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Tasks Completed (30d)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats.tasksCompleted30d}
            </span>
            <span className="text-xs text-slate-400">shipped items</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{stats.tasksCompletedChangePct}%</span>
              <span className="text-slate-400 font-normal ml-0.5">vs. previous period</span>
            </div>
            <span className="text-slate-500 group-hover:text-slate-300">Inspect →</span>
          </div>
        </div>

        {/* Card 4: Overall Project Health */}
        <div className="relative bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Overall Project Health</span>
            <div className="w-8 h-8 rounded-lg bg-teal-950/60 border border-teal-800/50 flex items-center justify-center text-teal-400">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {stats.overallHealthPct}%
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded-md">
              On-Track
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-rose-400 font-semibold">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{stats.overallHealthChangePct}%</span>
              <span className="text-slate-400 font-normal ml-0.5">vs. last month</span>
            </div>
            {/* Tiny mini bar */}
            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full" 
                style={{ width: `${stats.overallHealthPct}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
