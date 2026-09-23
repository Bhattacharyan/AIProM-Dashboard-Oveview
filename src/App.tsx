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

// Dedicated Action Screens
import { ReassignWorkItemsScreen } from './components/screens/ReassignWorkItemsScreen';
import { MilestoneScopeReviewScreen } from './components/screens/MilestoneScopeReviewScreen';
import { ReallocateResourcesScreen } from './components/screens/ReallocateResourcesScreen';

import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<
    'dashboard' | 'reassign_work_items' | 'milestone_scope_review' | 'reallocate_resources'
  >('dashboard');

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
      action: 'Portfolio Health Scan Completed',
      details: 'Evaluated 127 projects across 4 divisions. Identified 12 At-Risk projects and 1 delayed milestone.',
      author: 'Operations PMO',
      impact: 'Baseline Synchronized',
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
      author: 'Portfolio Operations',
      impact,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Action: Refresh Portfolio
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Portfolio status synchronized.');
    }, 600);
  }, []);

  // Action: Run Risk Diagnostics
  const handleRunAiDiagnostics = useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      showToast('Portfolio risk factors refreshed.');
    }, 700);
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
              keyIssues: ['Overdue tasks reassigned to engineering squad', 'Scope review in progress'],
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
      'Reassigned 14 Work Items',
      `Transferred 14 work items from Mallionair Fintech App to ${targetAssignee}.`,
      'Schedule Bottleneck Cleared'
    );

    setCurrentScreen('dashboard');
    showToast(`Successfully reassigned 14 work items to ${targetAssignee}.`);
  };

  // Action: Approve Scope Review
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
              keyIssues: ['Milestone scope frozen and realigned', 'SLA on schedule'],
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
              detail: 'Scope frozen and gate timeline restored',
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
      'Milestone Scope Review Approved',
      `Realigned Sprint 42 gate for Mallionair Fintech App. Scope frozen: ${scopeFrozen ? 'Yes' : 'No'}.`,
      'Milestone SLA Restored'
    );

    setCurrentScreen('dashboard');
    showToast(`Mallionair Fintech scope frozen. Milestone gate aligned with schedule.`);
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
              keyIssues: ['Resource bottleneck resolved by team loan'],
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
      `Assigned ${assignedEngineers.join(' & ')} to Spark MMT. Cleared 2 blocked frontend work items.`,
      'Bottleneck Unblocked'
    );

    setCurrentScreen('dashboard');
    showToast(`Assigned ${assignedEngineers.join(' & ')} to Spark MMT. Blockers cleared.`);
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

  // Trigger action: route to dedicated operational screens
  const handleTriggerAction = (type: 'reassign_tasks' | 'budget_review' | 'reallocate_resources') => {
    if (type === 'reassign_tasks') {
      setCurrentScreen('reassign_work_items');
    } else if (type === 'budget_review') {
      setCurrentScreen('milestone_scope_review');
    } else if (type === 'reallocate_resources') {
      setCurrentScreen('reallocate_resources');
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
        {currentScreen === 'reassign_work_items' ? (
          <ReassignWorkItemsScreen
            tasks={allTasks.filter((t) => t.projectId === 'mallionair' && t.daysOverdue > 0)}
            onBack={() => setCurrentScreen('dashboard')}
            onExecute={handleConfirmReassignTasks}
          />
        ) : currentScreen === 'milestone_scope_review' ? (
          <MilestoneScopeReviewScreen
            onBack={() => setCurrentScreen('dashboard')}
            onExecute={(cap, frozen) => handleApproveBudgetRevision(cap, frozen)}
          />
        ) : currentScreen === 'reallocate_resources' ? (
          <ReallocateResourcesScreen
            onBack={() => setCurrentScreen('dashboard')}
            onExecute={handleConfirmReallocation}
          />
        ) : (
          <>
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
              managerFilter={manager}
              healthFilter={healthFilter}
              onSelectProject={(proj) => setSelectedProjectForDrawer(proj)}
            />

            {/* 4. Action Center & Mitigation Workflows */}
            <AiRiskEngine
              riskMatrix={riskMatrix}
              insights={insights}
              onTriggerAction={handleTriggerAction}
              onOpenScreen={(screen) => setCurrentScreen(screen)}
              onRunAiDiagnostics={handleRunAiDiagnostics}
              isAnalyzing={isAnalyzing}
            />

            {/* 5. Interactive Task Breakdown */}
            <TaskBreakdown
              stats={stats}
              onSelectStatus={(status) => setTaskDetailModalStatus(status)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0d1322] py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Enterprise Project Portfolio & Operations Management
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Server: Asia-Southeast1</span>
            <span>·</span>
            <span>Security: SOC2 & ISO 27001</span>
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
        onTriggerReassign={() => {
          setSelectedProjectForDrawer(null);
          setCurrentScreen('reassign_work_items');
        }}
        onTriggerBudgetReview={() => {
          setSelectedProjectForDrawer(null);
          setCurrentScreen('milestone_scope_review');
        }}
        onTriggerReallocate={() => {
          setSelectedProjectForDrawer(null);
          setCurrentScreen('reallocate_resources');
        }}
      />

      <AuditTrailModal
        isOpen={auditTrailModalOpen}
        onClose={() => setAuditTrailModalOpen(false)}
        logs={auditLogs}
      />

    </div>
  );
}
