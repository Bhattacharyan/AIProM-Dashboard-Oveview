import { useState } from 'react';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { TaskItem } from '../../types';

interface ReassignWorkItemsScreenProps {
  tasks: TaskItem[];
  onBack: () => void;
  onExecute: (selectedTasks: TaskItem[], targetAssignee: string) => void;
}

interface CandidateAssignee {
  name: string;
  role: string;
  currentLoad: number;
  activeItems: number;
  skills: string;
}

const CANDIDATES: CandidateAssignee[] = [
  {
    name: 'Devon Patel',
    role: 'Senior Fullstack Engineer',
    currentLoad: 65,
    activeItems: 2,
    skills: 'TypeScript, Node.js, Fintech APIs',
  },
  {
    name: 'Sophia Vance',
    role: 'Core Backend Architect',
    currentLoad: 60,
    activeItems: 3,
    skills: 'PostgreSQL, Ledger Services, OAuth',
  },
  {
    name: 'Liam O\'Connor',
    role: 'Systems & Infrastructure',
    currentLoad: 55,
    activeItems: 2,
    skills: 'Cloud Run, CI/CD, Microservices',
  },
  {
    name: 'Elena Rostova',
    role: 'Integration Specialist',
    currentLoad: 70,
    activeItems: 4,
    skills: 'React, API Webhooks, QA Automation',
  },
];

export function ReassignWorkItemsScreen({
  tasks,
  onBack,
  onExecute,
}: ReassignWorkItemsScreenProps) {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>(
    tasks.map((t) => t.id)
  );
  const [targetAssignee, setTargetAssignee] = useState<string>('Devon Patel');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTask = (id: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedTaskIds.length === tasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(tasks.map((t) => t.id));
    }
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    const chosenTasks = tasks.filter((t) => selectedTaskIds.includes(t.id));
    setTimeout(() => {
      onExecute(chosenTasks, targetAssignee);
    }, 400);
  };

  const selectedCandidate = CANDIDATES.find((c) => c.name === targetAssignee) || CANDIDATES[0];
  const itemsCount = selectedTaskIds.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <button
              onClick={onBack}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio Overview</span>
            </button>
            <span>/</span>
            <span>Risk & Action Center</span>
            <span>/</span>
            <span className="text-white font-medium">Reassign Work Items</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Workload Rebalance & Work Item Reassignment
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Resolve schedule bottlenecks by redistributing overdue backlog items from overloaded owners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting || itemsCount === 0}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            {isSubmitting ? 'Applying Rebalance...' : `Execute Reassignment (${itemsCount} Items)`}
          </button>
        </div>
      </div>

      {/* Context Diagnostic Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-white">Target Initiative:</span>
            <span>Mallionair Fintech App</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-mono">Current SLA: Delayed (-14d)</span>
          </div>
          <p className="text-xs text-slate-300">
            Current assignee <strong className="text-white">Marcus Chen</strong> is at <strong className="text-rose-400">120% capacity</strong> with 14 work items overdue by &gt;7 days. Reassigning these items to an available team member immediately recovers delivery schedule.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="text-right">
            <div className="text-slate-400">Marcus Chen Load</div>
            <div className="text-rose-400 font-bold">120% → 76%</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-slate-400">SLA Recovery</div>
            <div className="text-emerald-400 font-bold">-14d → -2d (+12d)</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Work Items Selection & Assignee Balancer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Overdue Work Items Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white">
                Overdue Work Items ({tasks.length})
              </h2>
              <span className="text-xs text-slate-400">
                {selectedTaskIds.length} of {tasks.length} items marked for transfer
              </span>
            </div>

            <button
              onClick={toggleAll}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
            >
              {selectedTaskIds.length === tasks.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[520px] overflow-y-auto">
            {tasks.map((task) => {
              const isSelected = selectedTaskIds.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`py-3 px-2 flex items-start gap-3 rounded-lg transition cursor-pointer ${
                    isSelected ? 'bg-slate-900/90' : 'hover:bg-slate-900/40 opacity-70'
                  }`}
                >
                  <div className="pt-0.5">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'border-slate-600 bg-slate-950'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-400">{task.id}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-rose-400 font-mono">
                        {task.daysOverdue}d overdue
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-500">{task.category}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-200 mt-0.5 truncate">
                      {task.title}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      {task.assignee}
                    </span>
                    <span className="text-[10px] text-rose-400 uppercase font-bold">
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Assignee Selector & Impact Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Target Assignee Selector */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
              Select Target Assignee
            </h2>
            <p className="text-xs text-slate-400">
              Candidate team members with active capacity in matching technical domains:
            </p>

            <div className="space-y-2.5 pt-1">
              {CANDIDATES.map((cand) => {
                const isChosen = targetAssignee === cand.name;
                return (
                  <div
                    key={cand.name}
                    onClick={() => setTargetAssignee(cand.name)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      isChosen
                        ? 'bg-slate-900 border-indigo-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isChosen
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-slate-600'
                          }`}
                        >
                          {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-semibold text-xs text-white">
                          {cand.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {cand.currentLoad}% Load
                      </span>
                    </div>

                    <div className="pl-5 mt-1 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{cand.role}</span>
                      <span className="text-slate-500 font-mono">{cand.activeItems} active</span>
                    </div>

                    <div className="pl-5 mt-1 text-[10px] text-slate-500 truncate">
                      {cand.skills}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outcome & Rebalance Preview */}
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
              Rebalance Impact Preview
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Marcus Chen (Current Owner)</span>
                  <span className="font-mono text-white">120% → 76%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>{selectedCandidate.name} (New Owner)</span>
                  <span className="font-mono text-white">
                    {selectedCandidate.currentLoad}% → {Math.min(100, selectedCandidate.currentLoad + itemsCount * 2)}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, selectedCandidate.currentLoad + itemsCount * 2)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-xs">
                <span className="font-semibold text-white block mb-0.5">Delivery Confirmation:</span>
                Reassigning {itemsCount} items will reduce Mallionair's critical path backlog from 14 days delay to 2 days, moving the initiative to Nominal status.
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleConfirm}
                disabled={isSubmitting || itemsCount === 0}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition cursor-pointer"
              >
                {isSubmitting ? 'Confirming Transfer...' : `Confirm & Rebalance (${itemsCount} Items)`}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
