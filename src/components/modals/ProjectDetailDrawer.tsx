import { useState } from 'react';
import { 
  X, 
  Layers, 
  Calendar, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  FileCode,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectDetailDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
  onTriggerReassign?: () => void;
  onTriggerBudgetReview?: () => void;
  onTriggerReallocate?: () => void;
}

export function ProjectDetailDrawer({
  project,
  onClose,
  onTriggerReassign,
  onTriggerBudgetReview,
  onTriggerReallocate,
}: ProjectDetailDrawerProps) {
  if (!project) return null;

  const totalTasks = project.tasks.open + project.tasks.inProgress + project.tasks.blocked + project.tasks.done;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-[#111827] border-l border-slate-700 h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {project.department}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  project.health === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  project.health === 'At-Risk' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {project.health}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {project.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Completion Velocity</span>
              <div className="text-xl font-bold text-white mt-0.5">{project.progress}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="h-full bg-indigo-500 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Milestone SLA Variance</span>
              <div className={`text-xl font-bold mt-0.5 font-mono ${
                project.slaVarianceDays < -7 ? 'text-rose-400' : project.slaVarianceDays < 0 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {project.milestoneSla || 'On Schedule'}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                {project.targetMilestone || 'Milestone Delivery Gate'}
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-2 p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Engineering Manager:</span>
              <strong className="text-white">{project.manager}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Target Milestone Date:</span>
              <strong className="text-white font-mono">{project.dueDate}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Total Backlog Volume:</span>
              <strong className="text-white font-mono">{totalTasks} work items</strong>
            </div>
          </div>

          {/* Task Distribution Status */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Workstream Work Item Distribution
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-sky-400 font-semibold uppercase">Open</div>
                <div className="text-base font-bold text-white mt-0.5">{project.tasks.open}</div>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-amber-400 font-semibold uppercase">In Progress</div>
                <div className="text-base font-bold text-white mt-0.5">{project.tasks.inProgress}</div>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-rose-400 font-semibold uppercase">Blocked</div>
                <div className="text-base font-bold text-white mt-0.5">{project.tasks.blocked}</div>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-emerald-400 font-semibold uppercase">Done</div>
                <div className="text-base font-bold text-white mt-0.5">{project.tasks.done}</div>
              </div>
            </div>
          </div>

          {/* Key issues & risks identified */}
          {project.keyIssues && project.keyIssues.length > 0 && (
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Risk Signals & Diagnostics</span>
              </h4>
              <div className="space-y-1.5">
                {project.keyIssues.map((issue, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual Quick Actions */}
          {project.id === 'mallionair' && (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-rose-400 text-xs block">
                Mitigation Workflow Available
              </span>
              <p className="text-[11px] text-slate-300">
                14 overdue work items and 14-day milestone delay require operational rebalancing.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {onTriggerReassign && (
                  <button
                    onClick={() => {
                      onClose();
                      onTriggerReassign();
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    Reassign 14 Work Items
                  </button>
                )}
                {onTriggerBudgetReview && (
                  <button
                    onClick={() => {
                      onClose();
                      onTriggerBudgetReview();
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    Milestone Scope Review
                  </button>
                )}
              </div>
            </div>
          )}

          {project.id === 'spark-mmt' && project.tasks.blocked > 0 && (
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="font-bold text-amber-400 text-xs block">
                Resource Deficit Detected
              </span>
              <p className="text-[11px] text-slate-300">
                2 blocked frontend work items can be immediately cleared by borrowing available capacity from Builtech Learning.
              </p>
              {onTriggerReallocate && (
                <button
                  onClick={() => {
                    onClose();
                    onTriggerReallocate();
                  }}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Reallocate Resources
                </button>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">ID: {project.id}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
