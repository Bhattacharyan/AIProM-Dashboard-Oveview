import { useState, useMemo } from 'react';
import { 
  BarChart3, 
  BarChartHorizontal, 
  Table as TableIcon, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react';
import { ProjectItem, ViewMode, HealthStatus } from '../types';

interface ProjectDistributionProps {
  projects: ProjectItem[];
  managerFilter: string;
  healthFilter: string;
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectDistribution({
  projects,
  managerFilter,
  healthFilter,
  onSelectProject,
}: ProjectDistributionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on global and local search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMgr = managerFilter === 'All' || p.manager === managerFilter;
      const matchesHealth = healthFilter === 'All' || p.health === healthFilter;
      return matchesSearch && matchesMgr && matchesHealth;
    });
  }, [projects, searchQuery, managerFilter, healthFilter]);

  // Max total tasks for absolute scale
  const maxTasks = useMemo(() => {
    return Math.max(...projects.map((p) => p.tasks.open + p.tasks.inProgress + p.tasks.blocked + p.tasks.done), 300);
  }, [projects]);

  const getHealthBadge = (health: HealthStatus) => {
    switch (health) {
      case 'Good':
        return (
          <span className="text-xs font-medium text-emerald-400 font-mono">
            Nominal
          </span>
        );
      case 'At-Risk':
        return (
          <span className="text-xs font-semibold text-amber-400 font-mono">
            At-Risk
          </span>
        );
      case 'Critical':
        return (
          <span className="text-xs font-bold text-rose-400 font-mono">
            Critical
          </span>
        );
    }
  };

  const getMilestoneSlaBadge = (sla: string, varianceDays: number) => {
    if (varianceDays < -7) {
      return (
        <span className="text-xs font-bold font-mono text-rose-400">
          {sla}
        </span>
      );
    }
    if (varianceDays < 0) {
      return (
        <span className="text-xs font-semibold font-mono text-amber-400">
          {sla}
        </span>
      );
    }
    return (
      <span className="text-xs font-medium font-mono text-emerald-400">
        {sla}
      </span>
    );
  };

  // Helper for block progress rendering
  const renderAsciiProgressBar = (progress: number) => {
    const totalBlocks = 8;
    const filledBlocks = Math.round((progress / 100) * totalBlocks);
    const filled = '▇'.repeat(filledBlocks);
    const empty = '░'.repeat(totalBlocks - filledBlocks);
    return `${filled}${empty} ${progress}%`;
  };

  return (
    <section className="mb-8 bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Project Performance & Status Distribution
            <span className="text-xs font-normal text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full">
              {filteredProjects.length} of {projects.length} displayed
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-project comparison of completion velocity, work item distribution, and delivery milestone SLA adherence.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase px-2">View Mode:</span>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setViewMode('normalized')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'normalized'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Normalized Stacked %</span>
            </button>
            <button
              onClick={() => setViewMode('absolute')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'absolute'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChartHorizontal className="w-3.5 h-3.5" />
              <span>Absolute Counts</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-lg w-36 sm:w-48 focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Distribution Legend */}
      <div className="px-5 py-2.5 bg-[#0e1422] border-b border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-5">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Work Item Keys:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-sky-500"></span>
            <span>Open Work Items</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500"></span>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500"></span>
            <span>Blocked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
            <span>Done</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-500 hidden sm:block">
          Hover segments for work item volume counts · Click project to drill down
        </div>
      </div>

      {/* Content based on View Mode */}
      <div className="p-5">
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center">
            <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">No projects match the active filters.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting Manager or Health criteria.</p>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View Mode matching prompt specifications */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Project Name</th>
                  <th className="py-3 px-3">Progress</th>
                  <th className="py-3 px-3 text-center">Open</th>
                  <th className="py-3 px-3 text-center">In Progress</th>
                  <th className="py-3 px-3 text-center">Blocked</th>
                  <th className="py-3 px-3 text-center">Done</th>
                  <th className="py-3 px-3">Milestone SLA</th>
                  <th className="py-3 px-3">Health</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProjects.map((project) => {
                  return (
                    <tr
                      key={project.id}
                      onClick={() => onSelectProject(project)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {project.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{project.department}</span>
                          <span className="text-slate-600">·</span>
                          <span>Mgr: {project.manager}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-mono text-slate-300 tracking-wide text-xs">
                          {renderAsciiProgressBar(project.progress)}
                        </div>
                        <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div
                            className={`h-full rounded-full ${
                              project.health === 'Critical'
                                ? 'bg-rose-500'
                                : project.health === 'At-Risk'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-sky-400">
                        {project.tasks.open}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-amber-400">
                        {project.tasks.inProgress}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-medium">
                        {project.tasks.blocked > 0 ? (
                          <span className="text-rose-400 font-bold bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-900/60">
                            {project.tasks.blocked}
                          </span>
                        ) : (
                          <span className="text-slate-500">0</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-emerald-400">
                        {project.tasks.done}
                      </td>
                      <td className="py-3.5 px-3">
                        {getMilestoneSlaBadge(project.milestoneSla || 'On Schedule', project.slaVarianceDays || 0)}
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                          <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{project.dueDate}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-300 font-sans truncate max-w-[130px]">{project.targetMilestone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        {getHealthBadge(project.health)}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 inline-flex items-center gap-1 transition"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Visual Stacked Bar Views: Normalized % or Absolute Counts */
          <div className="space-y-5">
            {filteredProjects.map((project) => {
              const totalTasks = project.tasks.open + project.tasks.inProgress + project.tasks.blocked + project.tasks.done;
              
              // Percentages for normalized 100%
              const pctOpen = totalTasks > 0 ? (project.tasks.open / totalTasks) * 100 : 0;
              const pctInProgress = totalTasks > 0 ? (project.tasks.inProgress / totalTasks) * 100 : 0;
              const pctBlocked = totalTasks > 0 ? (project.tasks.blocked / totalTasks) * 100 : 0;
              const pctDone = totalTasks > 0 ? (project.tasks.done / totalTasks) * 100 : 0;

              // Width for absolute mode relative to max
              const barWidthPct = viewMode === 'absolute' ? (totalTasks / maxTasks) * 100 : 100;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 p-4 rounded-xl transition-all cursor-pointer group"
                >
                  {/* Top line of project card */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {project.department}
                      </span>
                      <span className="text-xs text-slate-400 hidden md:inline">
                        Lead: {project.manager}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Progress:</span>
                        <span className="font-mono font-bold text-slate-200">{project.progress}%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Milestone SLA:</span>
                        {getMilestoneSlaBadge(project.milestoneSla || 'On Schedule', project.slaVarianceDays || 0)}
                      </div>
                      <div>
                        {getHealthBadge(project.health)}
                      </div>
                    </div>
                  </div>

                  {/* Stacked Horizontal Bar Container */}
                  <div className="relative">
                    <div className="w-full bg-slate-950/80 h-7 rounded-lg overflow-hidden flex border border-slate-800/80 shadow-inner">
                      <div 
                        className="h-full flex transition-all duration-300"
                        style={{ width: `${barWidthPct}%` }}
                      >
                        {/* Open Tasks Segment */}
                        {pctOpen > 0 && (
                          <div
                            style={{ width: `${pctOpen}%` }}
                            className="bg-sky-600 hover:bg-sky-500 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white transition-colors relative group/seg"
                            title={`Open: ${project.tasks.open} (${pctOpen.toFixed(1)}%)`}
                          >
                            {pctOpen > 12 && <span>{project.tasks.open}</span>}
                          </div>
                        )}

                        {/* In Progress Segment */}
                        {pctInProgress > 0 && (
                          <div
                            style={{ width: `${pctInProgress}%` }}
                            className="bg-amber-500 hover:bg-amber-400 h-full flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 transition-colors relative group/seg"
                            title={`In Progress: ${project.tasks.inProgress} (${pctInProgress.toFixed(1)}%)`}
                          >
                            {pctInProgress > 12 && <span>{project.tasks.inProgress}</span>}
                          </div>
                        )}

                        {/* Blocked Segment */}
                        {pctBlocked > 0 && (
                          <div
                            style={{ width: `${pctBlocked}%` }}
                            className="bg-rose-500 hover:bg-rose-400 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white animate-pulse relative group/seg"
                            title={`Blocked: ${project.tasks.blocked} (${pctBlocked.toFixed(1)}%)`}
                          >
                            <span>{project.tasks.blocked}</span>
                          </div>
                        )}

                        {/* Done Segment */}
                        {pctDone > 0 && (
                          <div
                            style={{ width: `${pctDone}%` }}
                            className="bg-emerald-600 hover:bg-emerald-500 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white transition-colors relative group/seg"
                            title={`Done: ${project.tasks.done} (${pctDone.toFixed(1)}%)`}
                          >
                            {pctDone > 12 && <span>{project.tasks.done}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats footer under bar */}
                  <div className="mt-2.5 flex flex-wrap items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4 font-mono text-[11px]">
                      <span>Open: <strong className="text-sky-400">{project.tasks.open}</strong></span>
                      <span>In Progress: <strong className="text-amber-400">{project.tasks.inProgress}</strong></span>
                      <span>Blocked: <strong className={project.tasks.blocked > 0 ? 'text-rose-400' : 'text-slate-500'}>{project.tasks.blocked}</strong></span>
                      <span>Done: <strong className="text-emerald-400">{project.tasks.done}</strong></span>
                      <span className="text-slate-500">Total: {totalTasks} work items</span>
                    </div>
                    <span className="text-[11px] text-slate-500 group-hover:text-indigo-400 transition-colors">
                      Click for sprint telemetry →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
