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
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Executive Snapshot
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          Updated 3m ago
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Members */}
        <div 
          onClick={onOpenTeamModal}
          className="group bg-[#111827] hover:bg-[#141e31] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Engineering Roster</span>
            <span className="text-slate-500 group-hover:text-slate-300 transition">View →</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.totalMembers}
            </span>
            <span className="text-xs text-slate-400">contributors</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Capacity</span>
            <span className="text-emerald-400 font-mono">92% active</span>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Portfolio Volume</span>
            <span className="text-slate-500">127 Total</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.activeProjects}
            </span>
            <span className="text-xs text-slate-400">active initiatives</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-3 text-xs">
            <button
              onClick={() => onFilterHealth(activeHealthFilter === 'At-Risk' ? 'All' : 'At-Risk')}
              className={`text-xs transition cursor-pointer ${
                activeHealthFilter === 'At-Risk'
                  ? 'text-amber-300 font-semibold underline'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <strong className="font-mono">{stats.atRiskProjects}</strong> At-Risk
            </button>
            <span className="text-slate-600">·</span>
            <span className="text-rose-400">
              <strong className="font-mono">1</strong> Delayed SLA
            </span>
          </div>
        </div>

        {/* Card 3: Tasks Completed (30d) */}
        <div 
          onClick={onOpenCompletedTasksModal}
          className="group bg-[#111827] hover:bg-[#141e31] border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Completed Work Items</span>
            <span className="text-slate-500 group-hover:text-slate-300 transition">30d →</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.tasksCompleted30d}
            </span>
            <span className="text-xs text-slate-400">shipped items</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Pace</span>
            <span className="text-emerald-400 font-mono font-medium">+{stats.tasksCompletedChangePct}% MoM</span>
          </div>
        </div>

        {/* Card 4: Overall Project Health */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Portfolio Health</span>
            <span className="text-emerald-400 font-medium">Nominal</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono tabular-nums">
              {stats.overallHealthPct}%
            </span>
            <span className="text-xs text-slate-400">on-track</span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Variance</span>
            <span className="text-rose-400 font-mono">{stats.overallHealthChangePct}% vs baseline</span>
          </div>
        </div>
      </div>
    </section>
  );
}
