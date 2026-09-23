import { useState } from 'react';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';

interface ReallocateResourcesScreenProps {
  onBack: () => void;
  onExecute: (selectedEngineers: string[]) => void;
}

interface DonorEngineer {
  name: string;
  role: string;
  sourceProject: string;
  currentLoad: number;
  specialty: string;
}

const DONOR_ENGINEERS: DonorEngineer[] = [
  {
    name: 'Sophia Vance',
    role: 'Senior UI Architect',
    sourceProject: 'Builtech Learning',
    currentLoad: 58,
    specialty: 'React, Design Systems, Checkout Flows',
  },
  {
    name: 'Devon Patel',
    role: 'Fullstack Engineer',
    sourceProject: 'Builtech Learning',
    currentLoad: 62,
    specialty: 'Webhooks, API Integration, State Management',
  },
  {
    name: 'Liam O\'Connor',
    role: 'Platform Engineer',
    sourceProject: 'Apex Cloud Migration',
    currentLoad: 50,
    specialty: 'Payment Gateways, Security, Microservices',
  },
  {
    name: 'Elena Rostova',
    role: 'Integration Specialist',
    sourceProject: 'Builtech Learning',
    currentLoad: 65,
    specialty: 'Responsive UI, End-to-End QA Automation',
  },
];

export function ReallocateResourcesScreen({
  onBack,
  onExecute,
}: ReallocateResourcesScreenProps) {
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([
    'Sophia Vance',
    'Devon Patel',
  ]);
  const [durationWeeks, setDurationWeeks] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEngineer = (name: string) => {
    setSelectedEngineers((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onExecute(selectedEngineers);
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
            <span className="text-white font-medium">Reallocate Resources</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Cross-Project Resource Reallocation
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Temporarily loan engineering capacity from healthy initiatives to unblock critical bottlenecks.
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
            disabled={isSubmitting || selectedEngineers.length === 0}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            {isSubmitting ? 'Authorizing Loan...' : `Authorize Loan (${selectedEngineers.length} Engineers)`}
          </button>
        </div>
      </div>

      {/* Context Diagnostic Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-white">Target Initiative:</span>
            <span>Spark MMT</span>
            <span className="text-slate-600">·</span>
            <span className="text-rose-400 font-mono">2 Work Items Blocked</span>
          </div>
          <p className="text-xs text-slate-300">
            Critical path is blocked on payment webhook handlers and responsive checkout UI. Temporarily reallocating 2 engineers from the ahead-of-schedule <strong className="text-white">Builtech Learning</strong> project will clear all blockers within 48 hours.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="text-right">
            <div className="text-slate-400">Spark Blockers</div>
            <div className="text-emerald-400 font-bold">2 → 0 Blocked</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-slate-400">Builtech Health</div>
            <div className="text-emerald-400 font-bold">Maintains Good (100%)</div>
          </div>
        </div>
      </div>

      {/* Main Split: Blocked Items vs Candidate Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Blocked Work Items (5 cols) */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Blocked Work Items on Spark MMT
            </h2>
            <span className="text-xs text-slate-400">
              Work items halted due to engineering bandwidth constraints
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">SPK-104</span>
                <span className="text-[10px] font-bold text-rose-400 uppercase">Critical Block</span>
              </div>
              <h3 className="text-xs font-semibold text-white">
                Payment Webhook Idempotency Handler
              </h3>
              <p className="text-[11px] text-slate-400">
                Stalled waiting for backend integration with merchant callback endpoints. Halting 5 downstream services.
              </p>
              <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                Required skills: Node.js, Webhooks, Transactional Retries
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">SPK-109</span>
                <span className="text-[10px] font-bold text-rose-400 uppercase">Critical Block</span>
              </div>
              <h3 className="text-xs font-semibold text-white">
                Merchant Checkout Flow Responsive Redesign
              </h3>
              <p className="text-[11px] text-slate-400">
                Awaiting front-end UI specialist to refactor mobile checkout modal and responsive tokenization fields.
              </p>
              <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                Required skills: React, Tailwind, Responsive UI Architecture
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-white block">Downstream Impact:</span>
            <span>Unblocking these 2 items releases 8 dependent tickets and preserves the Spark MMT Q4 production deployment date.</span>
          </div>
        </div>

        {/* Right Column: Engineer Selection & Loan Terms (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-white">
                  Available Capacity Pool
                </h2>
                <span className="text-xs text-slate-400">
                  Select engineers to temporarily assign to Spark MMT
                </span>
              </div>

              <span className="text-xs font-mono text-slate-400">
                {selectedEngineers.length} selected
              </span>
            </div>

            <div className="space-y-2.5">
              {DONOR_ENGINEERS.map((eng) => {
                const isSelected = selectedEngineers.includes(eng.name);
                return (
                  <div
                    key={eng.name}
                    onClick={() => toggleEngineer(eng.name)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500/80'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
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
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {eng.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {eng.currentLoad}% Load · {eng.sourceProject}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {eng.role}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">
                        Specialty: {eng.specialty}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Loan Terms Selector */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Reallocation Duration:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 4].map((weeks) => (
                    <button
                      key={weeks}
                      type="button"
                      onClick={() => setDurationWeeks(weeks)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border transition cursor-pointer ${
                        durationWeeks === weeks
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {weeks} {weeks === 1 ? 'Week' : 'Weeks'} {weeks === 2 && '(Recommended)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-white block">Execution Guarantee:</span>
                <span>
                  Lending {selectedEngineers.join(' & ')} for {durationWeeks} weeks directly addresses SPK-104 and SPK-109 with zero delay to Builtech Learning's committed roadmap.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleConfirm}
                disabled={isSubmitting || selectedEngineers.length === 0}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition cursor-pointer"
              >
                {isSubmitting ? 'Deploying Team Reallocation...' : `Deploy ${selectedEngineers.length} Engineers to Spark MMT`}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
