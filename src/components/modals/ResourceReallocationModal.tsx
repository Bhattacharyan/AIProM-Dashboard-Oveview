import { useState } from 'react';
import { 
  X, 
  Zap, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Layers
} from 'lucide-react';
import { teamMembers, sparkBlockedTasks } from '../../data/portfolioData';

interface ResourceReallocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReallocation: (assignedEngineers: string[]) => void;
}

export function ResourceReallocationModal({
  isOpen,
  onClose,
  onConfirmReallocation,
}: ResourceReallocationModalProps) {
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([
    'Devon Patel',
    'Chloe Dubois',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleEngineer = (name: string) => {
    if (selectedEngineers.includes(name)) {
      setSelectedEngineers(selectedEngineers.filter((n) => n !== name));
    } else {
      setSelectedEngineers([...selectedEngineers, name]);
    }
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmReallocation(selectedEngineers);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-700 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Capacity Optimization
                </span>
                <span className="text-xs text-slate-400">Spark MMT Blocker Remediation</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Reallocate Available Frontend Engineers
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
        <div className="p-5 space-y-4">
          
          <div className="bg-amber-950/30 border border-amber-900/60 rounded-xl p-3.5 text-xs text-amber-200">
            <p className="font-semibold text-white">2 Dependent Tasks Blocked in Spark MMT</p>
            <p className="text-slate-300 mt-1">
              Builtech Learning Platform is currently at <strong>78% progress</strong> and under budget with 2 engineers having free capacity. Lending them for 1 sprint will dissolve the frontend blockage.
            </p>
          </div>

          {/* Blocked tasks preview */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Blocked Tasks to be Unblocked
            </label>
            <div className="space-y-2">
              {sparkBlockedTasks.map((t) => (
                <div key={t.id} className="p-2.5 rounded-lg bg-slate-900 border border-rose-900/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                    <span className="text-white font-medium">{t.title}</span>
                  </div>
                  <span className="text-[10px] text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    Blocked
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Available engineers to transfer */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Available Engineers from Builtech Learning
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Devon Patel', role: 'Senior React Engineer', free: '40% Free', dept: 'Builtech Team' },
                { name: 'Chloe Dubois', role: 'UI/UX Architect', free: '30% Free', dept: 'Builtech Team' },
              ].map((eng) => {
                const isSelected = selectedEngineers.includes(eng.name);
                return (
                  <div
                    key={eng.name}
                    onClick={() => toggleEngineer(eng.name)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-600 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{eng.name}</span>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                        {eng.free}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{eng.role}</p>
                    <div className="mt-2 text-[10px] text-indigo-300 flex items-center gap-1 font-mono">
                      <span>Builtech</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>Spark MMT</span>
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
            Unblocking Impact: <strong className="text-emerald-400">2 critical work items clear in ~48h</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedEngineers.length === 0 || isSubmitting}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 active:scale-95 text-white shadow-md transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Reallocating Squad...</span>
              ) : (
                <>
                  <span>Commit Resource Transfer</span>
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
