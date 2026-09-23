import { useState } from 'react';
import { ArrowLeft, Check, Lock, Calendar } from 'lucide-react';

interface MilestoneScopeReviewScreenProps {
  onBack: () => void;
  onExecute: (newCap: string, scopeFrozen: boolean, deferredFeatures: string[], targetGateDate: string) => void;
}

interface ScopeItem {
  id: string;
  name: string;
  category: 'core' | 'supplementary';
  effortDays: number;
  criticality: string;
  description: string;
}

const SCOPE_ITEMS: ScopeItem[] = [
  {
    id: 'sc-1',
    name: 'Biometric Bi-directional Authentication Gateway',
    category: 'core',
    effortDays: 12,
    criticality: 'Mandatory',
    description: 'Hardware key and biometric authentication gate required for PSD2 compliance.',
  },
  {
    id: 'sc-2',
    name: 'Swift MT103 ISO 20022 Financial Rails Gateway',
    category: 'core',
    effortDays: 16,
    criticality: 'Mandatory',
    description: 'Direct banking partner settlement pipeline; cannot be skipped or postponed.',
  },
  {
    id: 'sc-3',
    name: 'Double-Entry Core Ledger Journaling Service',
    category: 'core',
    effortDays: 14,
    criticality: 'Mandatory',
    description: 'Immutable transaction accounting service underpinning wallet balances.',
  },
  {
    id: 'sc-4',
    name: 'Real-Time Multi-Currency FX Arbitrage Engine',
    category: 'supplementary',
    effortDays: 7,
    criticality: 'Optional for Launch',
    description: 'Live rate interpolation across 14 fiat currencies; can defer to Phase 2.',
  },
  {
    id: 'sc-5',
    name: 'Custom PDF & Excel Transaction Ledger Export v2',
    category: 'supplementary',
    effortDays: 4,
    criticality: 'Nice to have',
    description: 'Bulk statement formatting templates; standard JSON export already works.',
  },
  {
    id: 'sc-6',
    name: 'Client Custom Branding & White-Label Theming',
    category: 'supplementary',
    effortDays: 3,
    criticality: 'Post-launch',
    description: 'Dynamic CSS skinning for enterprise tier tenants; defer to v2.1.',
  },
];

export function MilestoneScopeReviewScreen({
  onBack,
  onExecute,
}: MilestoneScopeReviewScreenProps) {
  const [deferredIds, setDeferredIds] = useState<string[]>(['sc-4', 'sc-5', 'sc-6']);
  const [targetGateDate, setTargetGateDate] = useState('2026-10-18');
  const [scopeFrozen, setScopeFrozen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDefer = (id: string) => {
    setDeferredIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const recoveredDays = SCOPE_ITEMS.filter((item) =>
    deferredIds.includes(item.id)
  ).reduce((acc, curr) => acc + curr.effortDays, 0);

  const netVarianceDays = -14 + recoveredDays;

  const handleConfirm = () => {
    setIsSubmitting(true);
    const deferredNames = SCOPE_ITEMS.filter((s) => deferredIds.includes(s.id)).map(
      (s) => s.name
    );
    setTimeout(() => {
      onExecute('$1,375,000', scopeFrozen, deferredNames, targetGateDate);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Navigation */}
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
            <span className="text-white font-medium">Milestone Scope Review</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Milestone Scope Review & Delivery Gate Alignment
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit feature backlog against committed delivery gates to eliminate milestone SLA delays.
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
            disabled={isSubmitting}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            {isSubmitting ? 'Signing Off Scope...' : 'Sign Off & Align Milestone SLA'}
          </button>
        </div>
      </div>

      {/* Overview Diagnostic */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-white">Target Milestone:</span>
            <span>Sprint 42 Gate · Core Mobile API</span>
            <span className="text-slate-600">·</span>
            <span className="text-rose-400 font-mono">Current Variance: Delayed (-14d)</span>
          </div>
          <p className="text-xs text-slate-300">
            Scope expansion into secondary FX and export modules has pushed projected completion beyond the target gate date. Deferring secondary features to Phase 2 restores on-time delivery.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="text-right">
            <div className="text-slate-400">Days Recovered</div>
            <div className="text-emerald-400 font-bold">+{recoveredDays} Days</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-slate-400">Projected SLA</div>
            <div className={`font-bold ${netVarianceDays >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {netVarianceDays >= 0 ? 'On Schedule (0d)' : `${netVarianceDays}d Delayed`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Split: Scope Matrix & Gate Commitment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scope Review Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white">
                Workstream Scope Audit
              </h2>
              <span className="text-xs text-slate-400">
                Core features are locked; select secondary scope to defer to Phase 2
              </span>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {deferredIds.length} features deferred
            </span>
          </div>

          <div className="space-y-3">
            {/* Core Locked Features */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Mandatory Core Deliverables (Locked)
              </span>
              <div className="space-y-2">
                {SCOPE_ITEMS.filter((i) => i.category === 'core').map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-3"
                  >
                    <div className="pt-0.5 text-slate-500">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">
                          {item.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {item.effortDays}d effort
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supplementary Deferrable Features */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Supplementary Scope Candidates (Toggle to Defer)
              </span>
              <div className="space-y-2">
                {SCOPE_ITEMS.filter((i) => i.category === 'supplementary').map((item) => {
                  const isDeferred = deferredIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleDefer(item.id)}
                      className={`p-3 rounded-lg border transition cursor-pointer flex items-start gap-3 ${
                        isDeferred
                          ? 'bg-slate-900 border-indigo-500/80'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="pt-0.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                            isDeferred
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'border-slate-600 bg-slate-950'
                          }`}
                        >
                          {isDeferred && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${isDeferred ? 'text-indigo-200' : 'text-slate-300'}`}>
                            {item.name}
                          </span>
                          <span className={`text-xs font-mono font-medium ${isDeferred ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {isDeferred ? `Recovers +${item.effortDays}d` : `${item.effortDays}d effort`}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.description}
                        </p>
                        {isDeferred && (
                          <span className="inline-block mt-1 text-[10px] font-mono text-indigo-400">
                            → Deferred to Phase 2 (post Sprint 42 gate)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Gate Sign-off & Alignment (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
              Revised Delivery Gate Commitment
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">
                  Committed Delivery Gate Date:
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={targetGateDate}
                    onChange={(e) => setTargetGateDate(e.target.value)}
                    className="bg-transparent text-xs text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  Scope Freeze Policy:
                </label>
                <div
                  onClick={() => setScopeFrozen(!scopeFrozen)}
                  className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-white block">
                      Enforce Scope Freeze on Core Sprint
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Block any incoming feature requests until Gate 42 passes QA.
                    </span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      scopeFrozen
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-slate-600'
                    }`}
                  >
                    {scopeFrozen && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <span className="font-semibold text-white block">Audit Summary:</span>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Scope Items Deferred:</span>
                  <strong className="text-white font-mono">{deferredIds.length}</strong>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Total Effort Reclaimed:</span>
                  <strong className="text-emerald-400 font-mono">+{recoveredDays} calendar days</strong>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Post-Review Milestone SLA:</span>
                  <strong className="text-emerald-400 font-mono">On Schedule (0d)</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition cursor-pointer"
              >
                {isSubmitting ? 'Confirming Scope Alignment...' : 'Confirm Scope Freeze & Align SLA'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
