import { useState } from 'react';
import { 
  X, 
  DollarSign, 
  AlertTriangle, 
  Check, 
  FileText, 
  ShieldCheck, 
  TrendingDown, 
  Sliders
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface BudgetReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem;
  onApproveBudgetRevision: (newCap: string, scopeFrozen: boolean) => void;
}

export function BudgetReviewModal({
  isOpen,
  onClose,
  project,
  onApproveBudgetRevision,
}: BudgetReviewModalProps) {
  const [scopeFrozen, setScopeFrozen] = useState(true);
  const [contingencyApproved, setContingencyApproved] = useState(true);
  const [newBudgetCap, setNewBudgetCap] = useState('$950,000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onApproveBudgetRevision(newBudgetCap, scopeFrozen);
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
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Financial Governance
                </span>
                <span className="text-xs text-slate-400">Executive Audit</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Budget Variance Review: {project.name}
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

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Overrun Warning box */}
          <div className="bg-rose-950/30 border border-rose-900/60 rounded-xl p-4 text-xs text-rose-200">
            <div className="flex items-center justify-between font-bold text-white mb-2">
              <span className="flex items-center gap-1.5 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                206% Expenditure & Scope Overrun
              </span>
              <span className="font-mono text-xs bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                Variance: +$477,000
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-rose-900/40 text-center font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Initial Cap</span>
                <strong className="text-slate-200 text-xs">{project.allocatedBudget}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Actual Burn</span>
                <strong className="text-rose-400 text-xs">{project.spentBudget}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-sans">Projected End</span>
                <strong className="text-amber-400 text-xs">$1,020,000</strong>
              </div>
            </div>
          </div>

          {/* Remediation Controls */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Executive Remediation Measures
            </label>

            <div 
              onClick={() => setScopeFrozen(!scopeFrozen)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                scopeFrozen ? 'bg-indigo-950/40 border-indigo-600' : 'bg-slate-900 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  scopeFrozen ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                }`}>
                  {scopeFrozen && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Freeze Non-Essential Scope</div>
                  <div className="text-[11px] text-slate-400">Descope unapproved synthetic accounts and custom FX widgets (-$125k)</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                -$125k Burn
              </span>
            </div>

            <div 
              onClick={() => setContingencyApproved(!contingencyApproved)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                contingencyApproved ? 'bg-indigo-950/40 border-indigo-600' : 'bg-slate-900 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  contingencyApproved ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                }`}>
                  {contingencyApproved && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Authorize Q4 Contingency Cap Adjustment</div>
                  <div className="text-[11px] text-slate-400">Re-baseline budget to $950,000 with CFO signed variance waiver</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded">
                Cap to $950k
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Review will automatically dispatch sign-off notifications to Finance Controller and VP of Engineering.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-md transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? 'Recording Audit...' : 'Sign Off & Re-baseline Budget'}
          </button>
        </div>

      </div>
    </div>
  );
}
