export type HealthStatus = 'Good' | 'At-Risk' | 'Critical';

export type ViewMode = 'normalized' | 'absolute' | 'table';

export type TimeframeOption = '30d' | '90d' | 'custom';

export type DepartmentOption = 'All' | 'Engineering' | 'Product' | 'Design' | 'Infrastructure' | 'Finance';

export type ManagerOption = 'All' | 'Marcus Chen' | 'Sarah Lin' | 'Alex Vance' | 'Elena Rostova';

export interface ProjectTaskDistribution {
  open: number;
  inProgress: number;
  blocked: number;
  done: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  department: string;
  manager: string;
  progress: number; // percentage 0-100
  tasks: ProjectTaskDistribution;
  budgetStatus: number; // percentage of budget consumed e.g. 206
  budgetLabel: string; // "Overrun" | "On-Track" | "Warning"
  health: HealthStatus;
  keyIssues?: string[];
  dueDate: string;
  allocatedBudget: string;
  spentBudget: string;
}

export interface RiskMatrixItem {
  category: 'Schedule Risk' | 'Budget Risk' | 'Scope Creep';
  severity: 'High' | 'Medium' | 'Low';
  detail: string;
  metric: string;
  trend: 'up' | 'down' | 'neutral';
  impactScore: number; // 1-100
}

export interface ActionableInsight {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY';
  title: string;
  projectName: string;
  projectId: string;
  issue: string;
  recommendedAction: string;
  actions: {
    id: string;
    label: string;
    actionType: 'reassign_tasks' | 'budget_review' | 'reallocate_resources';
    variant: 'danger' | 'warning' | 'primary' | 'secondary';
  }[];
  isResolved?: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  assignee: string;
  assigneeAvatar?: string;
  status: 'Open' | 'In Progress' | 'Done' | 'Blocked';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  dueDate: string;
  daysOverdue?: number;
  category: string;
}

export interface ExecutiveStats {
  totalMembers: number;
  activeProjects: number;
  atRiskProjects: number;
  overBudgetProjects: number;
  tasksCompleted30d: number;
  tasksCompletedChangePct: number; // +24.1
  overallHealthPct: number; // 82
  overallHealthChangePct: number; // -4
  totalOpenTasks: number; // 726
  totalInProgressTasks: number; // 85
  totalDoneTasks: number; // 417
  totalBlockedTasks: number; // 0
}
