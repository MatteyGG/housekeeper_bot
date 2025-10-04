import { TodoTask, PaginatedTasks, TaskFilters } from "../types";

// TODO: Заменить на реальные запросы Prisma
export async function getTasksByPeriod(familyId: string, period: string, page: number): Promise<TodoTask[]> {
  console.log(`Getting tasks for family ${familyId}, period: ${period}, page: ${page}`);
  
  if (page > 2) return [];
  
  const mockTasks: TodoTask[] = [
    {
      id: "1",
      title: "Сделать презентацию",
      description: "Подготовить слайды для совещания",
      status: "PENDING",
      priority: "HIGH",
      dueDate: new Date(Date.now() + 86400000), // Завтра
      duration: 120,
      assignee: "папа",
      category: "Работа",
      estimatedPomodoros: 4,
      completedPomodoros: 1,
      totalTimeSpent: 25,
      familyId: familyId,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2", 
      title: "Купить продукты",
      status: "COMPLETED",
      priority: "MEDIUM",
      dueDate: new Date(),
      duration: 45,
      assignee: "мама",
      category: "Дом",
      completedPomodoros: 0,
      totalTimeSpent: 0,
      familyId: familyId,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: new Date()
    }
  ];
  
  return mockTasks;
}

export async function getTaskById(taskId: string): Promise<TodoTask | null> {
  // TODO: Реальный запрос к БД
  const mockTasks: Record<string, TodoTask> = {
    "1": {
      id: "1",
      title: "Сделать презентацию",
      description: "Подготовить слайды для совещания в пятницу",
      status: "PENDING",
      priority: "HIGH",
      dueDate: new Date(Date.now() + 86400000),
      duration: 120,
      assignee: "папа",
      category: "Работа",
      estimatedPomodoros: 4,
      completedPomodoros: 1,
      totalTimeSpent: 25,
      familyId: "test-family",
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date()
    },
    "2": {
      id: "2", 
      title: "Купить продукты",
      status: "COMPLETED",
      priority: "MEDIUM",
      dueDate: new Date(),
      duration: 45,
      assignee: "мама",
      category: "Дом",
      completedPomodoros: 0,
      totalTimeSpent: 0,
      familyId: "test-family",
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(),
      completedAt: new Date()
    }
  };
  
  return mockTasks[taskId] || null;
}

export async function completeTask(taskId: string): Promise<boolean> {
  console.log(`Completing task ${taskId}`);
  // TODO: Реальный запрос к БД
  return true;
}

export async function deleteTask(taskId: string): Promise<boolean> {
  console.log(`Deleting task ${taskId}`);
  // TODO: Реальный запрос к БД
  return true;
}