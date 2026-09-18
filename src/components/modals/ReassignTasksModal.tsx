import { useState } from 'react';
import { 
  X, 
  Users, 
  AlertCircle, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { TaskItem } from '../../types';
import { mallionairOverdueTasks, teamMembers } from '../../data/portfolioData';

interface ReassignTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReassignment: (reassignedTasks: TaskItem[], targetAssignee: string) => void;
}

export function ReassignTasksModal({
  isOpen,
  onClose,
  onConfirmReassignment,
}: ReassignTasksModalProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>(
    mallionairOverdueTasks.map((t) => t.id)
  );
  const [targetMember, setTargetMember] = useState('Devon Patel');
  const [strategy, setStrategy] = useState<'balance' | 'single'>('balance');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleTask = (id: string) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((t) => t !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === mallionairOverdueTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(mallionairOverdueTasks.map((t) => t.id));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const reassigned = mallionairOverdueTasks.filter((t) => selectedTasks.includes(t.id));
      onConfirmReassignment(reassigned, strategy === 'balance' ? 'Auto-Distributed (Builtech Squad)' : targetMember);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Sprint Remediation
                </span>
                <span className="text-xs text-slate-400">Mallionair Fintech App</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Reassign 14 Critically Overdue Tasks
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          
          <div className="bg-rose-950/30 border border-rose-900/60 rounded-xl p-3.5 text-xs text-rose-200 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-white">14 items are overdue by &gt;7 days</p>
              <p className="text-slate-300 mt-0.5">
                Current assignee Marcus Chen is operating at 120% capacity with 3 critical security workstreams. Reallocating tasks immediately restores milestone confidence.
              </p>
            </div>
          </div>

          {/* Allocation Mode */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Reassignment Target Strategy
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStrategy('balance')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  strategy === 'balance'
                    ? 'bg-indigo-950/60 border-indigo-600 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI Load-Balancing (Recommended)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Distribute across Builtech engineers with &gt;40% free capacity (Devon Patel, Chloe Dubois, Liam O’Connor).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setStrategy('single')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  strategy === 'single'
                    ? 'bg-indigo-950/60 border-indigo-600 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Single Engineer Lead</span>
                </div>
                <div className="mt-2">
                  <select
                    value={targetMember}
                    onChange={(e) => setTargetMember(e.target.value)}
                    disabled={strategy !== 'single'}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg text-xs px-2 py-1 text-slate-200"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.role} - {m.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              </button>
            </div>
          </div>

          {/* Task list selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tasks to Reassign ({selectedTasks.length} of {mallionairOverdueTasks.length} selected)
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                {selectedTasks.length === mallionairOverdueTasks.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {mallionairOverdueTasks.map((task) => {
                const isChecked = selectedTasks.includes(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 text-xs transition cursor-pointer ${
                      isChecked
                        ? 'bg-slate-900 border-slate-700 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">{task.id}</span>
                      <span className="font-medium truncate text-white">{task.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-rose-400 font-mono font-semibold bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-900/60">
                        +{task.daysOverdue}d late
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {task.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Estimated velocity recovery: <strong className="text-emerald-400">+14.2% in 7 days</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedTasks.length === 0 || isSubmitting}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 active:scale-95 text-white shadow-md transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Executing Rebalance...</span>
              ) : (
                <>
                  <span>Commit Reassignment ({selectedTasks.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
