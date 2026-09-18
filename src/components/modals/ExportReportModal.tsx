import { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Check, 
  Copy, 
  Share2, 
  Building2 
} from 'lucide-react';
import { ExecutiveStats, ProjectItem, RiskMatrixItem } from '../../types';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  format: 'pdf' | 'csv' | 'json';
  stats: ExecutiveStats;
  projects: ProjectItem[];
  riskMatrix: RiskMatrixItem[];
}

export function ExportReportModal({
  isOpen,
  onClose,
  format,
  stats,
  projects,
  riskMatrix,
}: ExportReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const headers = 'Project Name,Department,Manager,Progress %,Open Tasks,In Progress,Blocked,Done,Budget %,Health\n';
    const rows = projects.map(p => 
      `"${p.name}","${p.department}","${p.manager}",${p.progress},${p.tasks.open},${p.tasks.inProgress},${p.tasks.blocked},${p.tasks.done},${p.budgetStatus}%,"${p.health}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `executive_project_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      executiveSummary: stats,
      riskMatrix,
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        department: p.department,
        manager: p.manager,
        progress: p.progress,
        tasks: p.tasks,
        budgetStatus: p.budgetStatus,
        health: p.health,
      })),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `executive_portfolio_metrics_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    const text = `EXECUTIVE PROJECT PORTFOLIO INTELLIGENCE BRIEF
=============================================
• Total Members: ${stats.totalMembers}
• Active Projects: ${stats.activeProjects} (${stats.atRiskProjects} At-Risk, ${stats.overBudgetProjects} Over-Budget)
• Tasks Completed (30d): ${stats.tasksCompleted30d} (+${stats.tasksCompletedChangePct}%)
• Overall Project Health: ${stats.overallHealthPct}% On-Track (${stats.overallHealthChangePct}% vs last month)

TASK STATUS BREAKDOWN:
• Open: ${stats.totalOpenTasks}
• In Progress: ${stats.totalInProgressTasks}
• Done: ${stats.totalDoneTasks}
• Blocked: ${stats.totalBlockedTasks} (All clear)

HIGH-PRIORITY RISK MATRIX:
• Schedule Risk: High (14 items critically overdue)
• Budget Risk: High (Mallionair at 206% budget)
• Scope Creep: Medium (3 projects expanding scope)
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-slate-700 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0d1322] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Executive Report Generator
              </h3>
              <p className="text-xs text-slate-400">
                Formal board-ready project & risk consolidation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Preview Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#0b0f19] font-sans">
          
          {/* Printable Report Header */}
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Confidential · Executive Portfolio Committee
              </span>
              <h1 className="text-lg font-bold text-white mt-0.5">
                Enterprise Project & Risk Intelligence Report
              </h1>
              <p className="text-xs text-slate-400">
                Reporting Period: Last 30 Days · As of September 16, 2026
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              Report ID: EXP-2026-Q3-09
            </div>
          </div>

          {/* Metric Cards Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Executive Summary Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Members</span>
                <div className="text-xl font-extrabold text-white mt-0.5">{stats.totalMembers}</div>
                <div className="text-[10px] text-emerald-400">92% active capacity</div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Projects</span>
                <div className="text-xl font-extrabold text-white mt-0.5">{stats.activeProjects}</div>
                <div className="text-[10px] text-amber-400">{stats.atRiskProjects} At-Risk · {stats.overBudgetProjects} Over-Budget</div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tasks Completed (30d)</span>
                <div className="text-xl font-extrabold text-white mt-0.5">{stats.tasksCompleted30d}</div>
                <div className="text-[10px] text-emerald-400">+{stats.tasksCompletedChangePct}% vs previous</div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Project Health</span>
                <div className="text-xl font-extrabold text-white mt-0.5">{stats.overallHealthPct}%</div>
                <div className="text-[10px] text-rose-400">{stats.overallHealthChangePct}% vs last month</div>
              </div>
            </div>
          </div>

          {/* Risk Matrix Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              2. High-Priority Risk Matrix
            </h4>
            <div className="space-y-2">
              {riskMatrix.map((r, i) => (
                <div key={i} className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{r.category}:</span>
                    <span className="text-slate-400">{r.detail}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    r.severity === 'High' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {r.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Table Preview */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              3. Featured Project Performance Distribution
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Project Name</th>
                    <th className="py-2 px-3">Progress</th>
                    <th className="py-2 px-3 text-center">Open</th>
                    <th className="py-2 px-3 text-center">In Progress</th>
                    <th className="py-2 px-3 text-center">Blocked</th>
                    <th className="py-2 px-3 text-center">Done</th>
                    <th className="py-2 px-3">Budget</th>
                    <th className="py-2 px-3">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {projects.slice(0, 3).map((p) => (
                    <tr key={p.id}>
                      <td className="py-2 px-3 font-semibold text-white">{p.name}</td>
                      <td className="py-2 px-3 font-mono">{p.progress}%</td>
                      <td className="py-2 px-3 text-center font-mono text-sky-400">{p.tasks.open}</td>
                      <td className="py-2 px-3 text-center font-mono text-amber-400">{p.tasks.inProgress}</td>
                      <td className="py-2 px-3 text-center font-mono text-rose-400">{p.tasks.blocked}</td>
                      <td className="py-2 px-3 text-center font-mono text-emerald-400">{p.tasks.done}</td>
                      <td className="py-2 px-3 font-mono">{p.budgetStatus}% ({p.budgetLabel})</td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          p.health === 'Critical' ? 'text-rose-400 bg-rose-950' : p.health === 'At-Risk' ? 'text-amber-400 bg-amber-950' : 'text-emerald-400 bg-emerald-950'
                        }`}>
                          {p.health}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#0d1322] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
