// Основные типы задач
export interface TodoTask {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: Date;
  duration?: number; // в минутах
  assignee?: string;
  category?: string;
  familyId: string;
  parentId?: string;
  estimatedPomodoros?: number;
  completedPomodoros: number;
  totalTimeSpent: number; // в минутах
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// Flow данных для создания/редактирования задачи
export interface TodoFlowData {
  step: 'title' | 'description' | 'dueDate' | 'duration' | 'priority' | 'assignee' | 'category' | 'subtasks' | 'confirmation';
  taskData: Partial<TodoTask>;
  editingTaskId?: string;
  quickMode?: boolean;
}

// Типы для фильтров и пагинации
export interface TaskFilters {
  period: 'today' | 'week' | 'month' | 'all';
  status?: TodoTask['status'];
  priority?: TodoTask['priority'];
  assignee?: string;
  category?: string;
}

export interface PaginatedTasks {
  tasks: TodoTask[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// Константы
export const TASK_PRIORITIES = {
  LOW: { label: '🟢 Низкий', value: 'LOW' },
  MEDIUM: { label: '🟡 Средний', value: 'MEDIUM' },
  HIGH: { label: '🟠 Высокий', value: 'HIGH' },
  URGENT: { label: '🔴 Срочный', value: 'URGENT' }
} as const;

export const TASK_STATUSES = {
  PENDING: { label: '⏳ Ожидает', value: 'PENDING' },
  IN_PROGRESS: { label: '🔄 В работе', value: 'IN_PROGRESS' },
  COMPLETED: { label: '✅ Выполнено', value: 'COMPLETED' },
  CANCELLED: { label: '❌ Отменено', value: 'CANCELLED' }
} as const;

// Типы для Prisma (соответствуют твоей схеме)
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';