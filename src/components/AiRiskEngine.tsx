import { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { RiskMatrixItem, ActionableInsight } from '../types';

interface AiRiskEngineProps {
  riskMatrix: RiskMatrixItem[];
  insights: ActionableInsight[];
  onTriggerAction: (actionType: 'reassign_tasks' | 'budget_review' | 'reallocate_resources') => void;
  onOpenScreen?: (screen: 'reassign_work_items' | 'milestone_scope_review' | 'reallocate_resources') => void;
  onRunAiDiagnostics: () => void;
  isAnalyzing: boolean;
}

export function AiRiskEngine({
  riskMatrix,
  insights,
  onTriggerAction,
  onOpenScreen,
  onRunAiDiagnostics,
  isAnalyzing,
}: AiRiskEngineProps) {
  const handleActionClick = (actionType: 'reassign_tasks' | 'budget_review' | 'reallocate_resources') => {
    if (onOpenScreen) {
      if (actionType === 'reassign_tasks') {
        onOpenScreen('reassign_work_items');
        return;
      }
      if (actionType === 'budget_review') {
        onOpenScreen('milestone_scope_review');
        return;
      }
      if (actionType === 'reallocate_resources') {
        onOpenScreen('reallocate_resources');
        return;
      }
    }
    onTriggerAction(actionType);
  };

  return (
    <section className="mb-8">
      {/* Title & Engine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            Portfolio Risk & Mitigation Center
            <span className="text-xs font-normal text-slate-500 font-mono">
              (Live Analysis)
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-initiative risk classification and targeted operational workflows to unblock milestone gates.
          </p>
        </div>

        <button
          onClick={onRunAiDiagnostics}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAnalyzing ? 'Consolidating...' : 'Refresh Risk Factors'}</span>
        </button>
      </div>

      {/* Main Grid: Left is High-Priority Risk Matrix, Right is Actionable Insights Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: High-Priority Risk Matrix (5 cols) */}
        <div className="lg:col-span-5 bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Risk Classifications
                </h3>
                <span className="text-xs text-slate-400">Aggregated operational risk exposures</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {riskMatrix.length} Categories
              </span>
            </div>

            {/* Risk Items List */}
            <div className="space-y-3">
              {riskMatrix.map((item, idx) => {
                const isHigh = item.severity === 'High';
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-slate-200">
                        {item.category}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-medium ${
                          isHigh ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {item.severity} Severity
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">
                      {item.detail}
                    </p>

                    {/* Progress Impact Bar */}
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full ${isHigh ? 'bg-rose-500' : 'bg-amber-400'}`}
                          style={{ width: `${item.impactScore}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                        {item.impactScore}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Critical threshold: &ge; 60 severity</span>
            <span>Escalation: Level 2</span>
          </div>
        </div>

        {/* Right Column: Targeted Mitigation Actions (7 cols) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Targeted Mitigation Workflows
              </h3>
              <span className="text-xs text-slate-400">Priority operational interventions to clear milestone gates</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {insights.filter((i) => !i.isResolved).length} Pending
            </span>
          </div>

          {/* Insights Cards */}
          <div className="space-y-3.5">
            {insights.map((insight) => {
              const isCritical = insight.type === 'CRITICAL';
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-xl border transition ${
                    insight.isResolved
                      ? 'bg-emerald-950/20 border-emerald-900/40 opacity-80'
                      : isCritical
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Header badge & title */}
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`font-semibold ${
                            isCritical ? 'text-rose-400' : 'text-amber-400'
                          }`}
                        >
                          {insight.type}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{insight.projectName}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-0.5">
                        {insight.title}
                      </h4>
                    </div>

                    {insight.isResolved && (
                      <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolved
                      </span>
                    )}
                  </div>

                  {/* Issue description */}
                  <div className="text-xs text-slate-300 mb-3 space-y-1">
                    <p>
                      <span className="text-slate-400">Context: </span>
                      {insight.issue}
                    </p>
                    <p>
                      <span className="text-slate-400">Recommended: </span>
                      <span className="text-slate-200">{insight.recommendedAction}</span>
                    </p>
                  </div>

                  {/* Action Buttons to open dedicated screens */}
                  {!insight.isResolved ? (
                    <div className="pt-2.5 border-t border-slate-800 flex flex-wrap items-center gap-2">
                      {insight.actions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => handleActionClick(act.actionType)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer ${
                            act.variant === 'danger'
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                              : act.variant === 'warning'
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                          }`}
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3 text-slate-300" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-emerald-900/30 text-xs text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mitigation plan signed off and committed to sprint roadmap.</span>
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
