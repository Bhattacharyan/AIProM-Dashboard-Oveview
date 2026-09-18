/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { 
  initialStats, 
  initialProjects, 
  initialRiskMatrix, 
  initialActionableInsights, 
  mallionairOverdueTasks, 
  sparkBlockedTasks, 
  sampleCompletedTasks 
} from './data/portfolioData';
import { 
  ExecutiveStats, 
  ProjectItem, 
  RiskMatrixItem, 
  ActionableInsight, 
  TaskItem, 
  DepartmentOption, 
  ManagerOption, 
  TimeframeOption 
} from './types';
import { Header } from './components/Header';
import { ExecutiveCards } from './components/ExecutiveCards';
import { FilterControlBar } from './components/FilterControlBar';
import { ProjectDistribution } from './components/ProjectDistribution';
import { AiRiskEngine } from './components/AiRiskEngine';
import { TaskBreakdown } from './components/TaskBreakdown';

// Modals
import { ReassignTasksModal } from './components/modals/ReassignTasksModal';
import { BudgetReviewModal } from './components/modals/BudgetReviewModal';
import { ResourceReallocationModal } from './components/modals/ResourceReallocationModal';
import { TaskDetailModal } from './components/modals/TaskDetailModal';
import { TeamRosterModal } from './components/modals/TeamRosterModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { ProjectDetailDrawer } from './components/modals/ProjectDetailDrawer';
import { AuditTrailModal, AuditEntry } from './components/modals/AuditTrailModal';

import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Primary Portfolio State
  const [stats, setStats] = useState<ExecutiveStats>(initialStats);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [riskMatrix, setRiskMatrix] = useState<RiskMatrixItem[]>(initialRiskMatrix);
  const [insights, setInsights] = useState<ActionableInsight[]>(initialActionableInsights);
  const [allTasks, setAllTasks] = useState<TaskItem[]>([
    ...mallionairOverdueTasks,
    ...sparkBlockedTasks,
    ...sampleCompletedTasks,
  ]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([
    {
      id: 'log-0',
      timestamp: 'Today, 09:15 AM',
      action: 'Risk Diagnostics Engine Initialized',
      details: 'Evaluated 127 projects across 4 divisions. Flagged 12 At-Risk and 3 Over-Budget.',
      author: 'AI Governance Daemon',
      impact: 'Baseline Established',
    },
  ]);

  // Filters State
  const [department, setDepartment] = useState<DepartmentOption>('All');
  const [manager, setManager] = useState<ManagerOption>('All');
  const [healthFilter, setHealthFilter] = useState<string>('All');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('30d');

  // Loading & Diagnostics States
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers State
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [budgetReviewModalOpen, setBudgetReviewModalOpen] = useState(false);
  const [resourceReallocModalOpen, setResourceReallocModalOpen] = useState(false);
  const [taskDetailModalStatus, setTaskDetailModalStatus] = useState<'Open' | 'In Progress' | 'Done' | 'Blocked' | null>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [selectedProjectForDrawer, setSelectedProjectForDrawer] = useState<ProjectItem | null>(null);
  const [auditTrailModalOpen, setAuditTrailModalOpen] = useState(false);

  // Trigger Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add Audit Entry
  const addAuditLog = (action: string, details: string, impact: string) => {
    const newEntry: AuditEntry = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      action,
      details,
      author: 'Executive PMO',
      impact,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Action: Refresh Portfolio
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Portfolio telemetries synchronized with Jira and ERP ledger.');
    }, 700);
  }, []);

  // Action: Run AI Risk Diagnostics
  const handleRunAiDiagnostics = useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      showToast('AI Risk scan finished. 3 threat vectors re-scored with 96.4% confidence.');
    }, 900);
  }, []);

  // Action: Reassign 14 Tasks Handler
  const handleConfirmReassignTasks = (reassignedTasks: TaskItem[], targetAssignee: string) => {
    // 1. Update tasks state
    setAllTasks((prev) =>
      prev.map((t) =>
        reassignedTasks.some((rt) => rt.id === t.id)
          ? { ...t, assignee: targetAssignee, daysOverdue: 0 }
          : t
      )
    );

    // 2. Update Mallionair project health & progress
    setProjects((prev) =>
      prev.map((p) =>
        p.id === 'mallionair'
          ? {
              ...p,
              health: 'At-Risk',
              progress: 52,
              keyIssues: ['Overdue tasks reassigned to Builtech team', 'Scope review in progress'],
            }
          : p
      )
    );

    // 3. Update Risk Matrix
    setRiskMatrix((prev) =>
      prev.map((r) =>
        r.category === 'Schedule Risk'
          ? {
              ...r,
              severity: 'Low',
              detail: 'Overdue items mitigated by squad rebalance',
              impactScore: 28,
            }
          : r
      )
    );

    // 4. Mark insight resolved
    setInsights((prev) =>
      prev.map((ins) =>
        ins.id === 'insight-1'
          ? { ...ins, isResolved: true }
          : ins
      )
    );

    // 5. Update overall health
    setStats((prev) => ({
      ...prev,
      overallHealthPct: 86,
      overallHealthChangePct: +1.2,
    }));

    addAuditLog(
      'Reassigned 14 Overdue Tasks',
      `Transferred 14 tasks from Mallionair Fintech App to ${targetAssignee}.`,
      'Schedule Risk Cleared'
    );

    showToast(`Successfully reassigned 14 overdue tasks to ${targetAssignee}.`);
  };

  // Action: Approve Budget Review
  const handleApproveBudgetRevision = (newCap: string, scopeFrozen: boolean) => {
    // 1. Update Mallionair project
    setProjects((prev) =>
      prev.map((p) =>
        p.id === 'mallionair'
          ? {
              ...p,
              allocatedBudget: newCap,
              budgetStatus: 98,
              budgetLabel: 'On-Track',
              health: 'Good',
              keyIssues: ['Budget re-baselined with CFO contingency approval', 'Scope frozen'],
            }
          : p
      )
    );

    // 2. Update Risk Matrix
    setRiskMatrix((prev) =>
      prev.map((r) =>
        r.category === 'Budget Risk'
          ? {
              ...r,
              severity: 'Low',
              detail: 'Contingency allocated; variance mitigated',
              impactScore: 32,
            }
          : r
      )
    );

    // 3. Update stats
    setStats((prev) => ({
      ...prev,
      overBudgetProjects: Math.max(0, prev.overBudgetProjects - 1),
      atRiskProjects: Math.max(0, prev.atRiskProjects - 1),
      overallHealthPct: 91,
    }));

    addAuditLog(
      'Authorized Budget Cap Adjustment',
      `Re-baselined Mallionair Fintech App cap to ${newCap}. Non-essential scope frozen: ${scopeFrozen ? 'Yes' : 'No'}.`,
      'Budget Variance Resolved'
    );

    showToast(`Mallionair Fintech budget re-baselined to ${newCap}. Status updated to On-Track.`);
  };

  // Action: Reallocate Resources to Spark MMT
  const handleConfirmReallocation = (assignedEngineers: string[]) => {
    // 1. Update Spark MMT project: blocked tasks from 2 to 0
    setProjects((prev) =>
      prev.map((p) =>
        p.id === 'spark-mmt'
          ? {
              ...p,
              health: 'Good',
              tasks: {
                ...p.tasks,
                blocked: 0,
                inProgress: p.tasks.inProgress + 2,
              },
              keyIssues: ['Resource bottleneck resolved by Builtech loan'],
            }
          : p
      )
    );

    // 2. Mark spark blocked tasks as In Progress
    setAllTasks((prev) =>
      prev.map((t) =>
        t.projectId === 'spark-mmt' && t.status === 'Blocked'
          ? { ...t, status: 'In Progress', assignee: assignedEngineers[0] || 'Devon Patel' }
          : t
      )
    );

    // 3. Mark insight resolved
    setInsights((prev) =>
      prev.map((ins) =>
        ins.id === 'insight-2'
          ? { ...ins, isResolved: true }
          : ins
      )
    );

    // 4. Update stats
    setStats((prev) => ({
      ...prev,
      atRiskProjects: Math.max(0, prev.atRiskProjects - 1),
      totalBlockedTasks: 0,
      totalInProgressTasks: prev.totalInProgressTasks + 2,
      overallHealthPct: 88,
    }));

    addAuditLog(
      'Resource Reallocation Approved',
      `Transferred ${assignedEngineers.join(' & ')} from Builtech to Spark MMT. Cleared 2 blocked frontend workflows.`,
      'Bottleneck Unblocked'
    );

    showToast(`Transferred ${assignedEngineers.join(' & ')} to Spark MMT. Blockers cleared.`);
  };

  // Action: Update single task status in modal
  const handleUpdateTaskStatus = (taskId: string, newStatus: 'Open' | 'In Progress' | 'Done' | 'Blocked') => {
    setAllTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Task ${taskId} moved to ${newStatus}`);
  };

  // Export report opener
  const handleOpenExport = (fmt: 'pdf' | 'csv' | 'json') => {
    setExportFormat(fmt);
    setExportModalOpen(true);
  };

  // Trigger quick action by type
  const handleTriggerAction = (type: 'reassign_tasks' | 'budget_review' | 'reallocate_resources') => {
    if (type === 'reassign_tasks') {
      setReassignModalOpen(true);
    } else if (type === 'budget_review') {
      setBudgetReviewModalOpen(true);
    } else if (type === 'reallocate_resources') {
      setResourceReallocModalOpen(true);
    }
  };

  const resolvedInsightsCount = insights.filter((i) => i.isResolved).length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Top Application Header */}
      <Header 
        onOpenAuditLogs={() => setAuditTrailModalOpen(true)}
        resolvedInsightsCount={resolvedInsightsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* 1. Executive Summary Cards */}
        <ExecutiveCards
          stats={stats}
          onFilterHealth={(health) => setHealthFilter(health)}
          activeHealthFilter={healthFilter}
          onOpenTeamModal={() => setTeamModalOpen(true)}
          onOpenCompletedTasksModal={() => setTaskDetailModalStatus('Done')}
        />

        {/* 2. Filter & Control Bar */}
        <FilterControlBar
          department={department}
          setDepartment={setDepartment}
          manager={manager}
          setManager={setManager}
          healthFilter={healthFilter}
          setHealthFilter={setHealthFilter}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          onExport={handleOpenExport}
        />

        {/* 3. Project Performance & Status Distribution */}
        <ProjectDistribution
          projects={projects}
          departmentFilter={department}
          managerFilter={manager}
          healthFilter={healthFilter}
          onSelectProject={(proj) => setSelectedProjectForDrawer(proj)}
        />

        {/* 4. Aggregated AI Risk Engine & Insights */}
        <AiRiskEngine
          riskMatrix={riskMatrix}
          insights={insights}
          onTriggerAction={handleTriggerAction}
          onRunAiDiagnostics={handleRunAiDiagnostics}
          isAnalyzing={isAnalyzing}
        />

        {/* 5. Interactive Task Breakdown */}
        <TaskBreakdown
          stats={stats}
          onSelectStatus={(status) => setTaskDetailModalStatus(status)}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0d1322] py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Executive Project Intelligence & Risk Engine · High-Precision Portfolio Oversight
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Server: Asia-Southeast1</span>
            <span>·</span>
            <span>Security: ISO 27001 Certified</span>
          </div>
        </div>
      </footer>

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Modals and Drawers */}
      <ReassignTasksModal
        isOpen={reassignModalOpen}
        onClose={() => setReassignModalOpen(false)}
        onConfirmReassignment={handleConfirmReassignTasks}
      />

      {projects.find((p) => p.id === 'mallionair') && (
        <BudgetReviewModal
          isOpen={budgetReviewModalOpen}
          onClose={() => setBudgetReviewModalOpen(false)}
          project={projects.find((p) => p.id === 'mallionair')!}
          onApproveBudgetRevision={handleApproveBudgetRevision}
        />
      )}

      <ResourceReallocationModal
        isOpen={resourceReallocModalOpen}
        onClose={() => setResourceReallocModalOpen(false)}
        onConfirmReallocation={handleConfirmReallocation}
      />

      <TaskDetailModal
        isOpen={taskDetailModalStatus !== null}
        onClose={() => setTaskDetailModalStatus(null)}
        status={taskDetailModalStatus}
        allTasks={allTasks}
        onUpdateTaskStatus={handleUpdateTaskStatus}
      />

      <TeamRosterModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
      />

      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        format={exportFormat}
        stats={stats}
        projects={projects}
        riskMatrix={riskMatrix}
      />

      <ProjectDetailDrawer
        project={selectedProjectForDrawer}
        onClose={() => setSelectedProjectForDrawer(null)}
        onTriggerReassign={() => setReassignModalOpen(true)}
        onTriggerBudgetReview={() => setBudgetReviewModalOpen(true)}
        onTriggerReallocate={() => setResourceReallocModalOpen(true)}
      />

      <AuditTrailModal
        isOpen={auditTrailModalOpen}
        onClose={() => setAuditTrailModalOpen(false)}
        logs={auditLogs}
      />

    </div>
  );
}
