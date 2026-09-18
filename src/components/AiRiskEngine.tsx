import { useState } from 'react';
import { 
  Cpu, 
  AlertOctagon, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Zap, 
  Users, 
  FileEdit,
  DollarSign,
  Activity
} from 'lucide-react';
import { RiskMatrixItem, ActionableInsight } from '../types';

interface AiRiskEngineProps {
  riskMatrix: RiskMatrixItem[];
  insights: ActionableInsight[];
  onTriggerAction: (actionType: 'reassign_tasks' | 'budget_review' | 'reallocate_resources') => void;
  onRunAiDiagnostics: () => void;
  isAnalyzing: boolean;
}

export function AiRiskEngine({
  riskMatrix,
  insights,
  onTriggerAction,
  onRunAiDiagnostics,
  isAnalyzing,
}: AiRiskEngineProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'insights'>('insights');

  return (
    <section className="mb-8">
      {/* Title & Engine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Aggregated AI Risk Engine & Insights
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800/80">
                Predictive Model v4.8
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous correlation of Git commit cadence, budget burn rates, and blocker dependency graphs.
            </p>
          </div>
        </div>

        <button
          onClick={onRunAiDiagnostics}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-indigo-300 shadow-sm transition cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 text-indigo-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAnalyzing ? 'Analyzing Portfolio Graph...' : 'Run AI Risk Diagnostics'}</span>
        </button>
      </div>

      {/* Main Grid: Left is High-Priority Risk Matrix, Right is Actionable Insights Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: High-Priority Risk Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-400" />
                  High-Priority Risk Matrix
                </h3>
                <span className="text-xs text-slate-400">Aggregated cross-cutting enterprise risks</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                3 Threat Vectors
              </span>
            </div>

            {/* Risk Items List */}
            <div className="space-y-3.5">
              {riskMatrix.map((item, idx) => {
                const isHigh = item.severity === 'High';
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-200 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isHigh ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`} />
                        {item.category}:
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          isHigh
                            ? 'bg-rose-950/60 text-rose-300 border-rose-800/80'
                            : 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium pl-4">
                      {item.detail}
                    </p>

                    {/* Progress Impact Bar */}
                    <div className="mt-2 pl-4 flex items-center gap-3">
                      <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isHigh ? 'bg-rose-500' : 'bg-amber-400'}`}
                          style={{ width: `${item.impactScore}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                        Severity {item.impactScore}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Confidence index: 94.2%</span>
            <span>Trigger threshold: ≥ 60 severity</span>
          </div>
        </div>

        {/* Right Column: Actionable Insights Feed (7 cols) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Actionable Insights Feed
              </h3>
              <span className="text-xs text-slate-400">Prescriptive triage workflows recommended by AI</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded-md">
              Instant Execution
            </span>
          </div>

          {/* Insights Cards */}
          <div className="space-y-4">
            {insights.map((insight) => {
              const isCritical = insight.type === 'CRITICAL';
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-xl border transition-all ${
                    insight.isResolved
                      ? 'bg-emerald-950/20 border-emerald-900/50 opacity-80'
                      : isCritical
                      ? 'bg-rose-950/20 border-rose-900/60 hover:border-rose-800'
                      : 'bg-amber-950/20 border-amber-900/60 hover:border-amber-800'
                  }`}
                >
                  {/* Header badge & title */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isCritical
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}
                      >
                        [{insight.type}]
                      </span>
                      <h4 className="text-xs font-bold text-white">
                        {insight.title}
                      </h4>
                    </div>

                    {insight.isResolved && (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </span>
                    )}
                  </div>

                  {/* Issue description */}
                  <div className="text-xs text-slate-300 mb-2 space-y-1">
                    <p>
                      <strong className="text-slate-400 font-semibold">Issue:</strong> {insight.issue}
                    </p>
                    <p>
                      <strong className="text-slate-400 font-semibold">Recommended Action:</strong>{' '}
                      <span className="text-slate-200">{insight.recommendedAction}</span>
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
                  {!insight.isResolved ? (
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Action:</span>
                      {insight.actions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => onTriggerAction(act.actionType)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer ${
                            act.variant === 'danger'
                              ? 'bg-rose-600 hover:bg-rose-500 text-white'
                              : act.variant === 'warning'
                              ? 'bg-amber-600 hover:bg-amber-500 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          }`}
                        >
                          {act.actionType === 'reassign_tasks' && <Users className="w-3 h-3" />}
                          {act.actionType === 'budget_review' && <DollarSign className="w-3 h-3" />}
                          {act.actionType === 'reallocate_resources' && <Zap className="w-3 h-3" />}
                          <span>[{act.label}]</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-emerald-900/40 text-[11px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mitigation plan committed to sprint backlog and verified by audit engine.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
