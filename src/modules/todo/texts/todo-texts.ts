import { InlineKeyboard } from "grammy";
import { TodoTask, TASK_PRIORITIES, TASK_STATUSES, TaskFilters } from "../types";

// Главное меню
export const getMainMenuKeyboard = () => {
  return new InlineKeyboard()
    .text("📅 Сегодня", "todo_list_today_1")
    .text("📆 Неделя", "todo_list_week_1")
    .row()
    .text("📊 Месяц", "todo_list_month_1")
    .text("📋 Все задачи", "todo_list_all_1")
    .row()
    .text("➕ Быстрая задача", "todo_quick_add");
};

// Клавиатура списка задач
export const getTaskListKeyboard = (tasks: TodoTask[], period: string, page: number, hasMore: boolean = false) => {
  const keyboard = new InlineKeyboard();
  
  tasks.forEach(task => {
    const statusIcon = getTaskStatusIcon(task);
    const priorityIcon = getPriorityIcon(task.priority);
    
    keyboard.text(
      `${statusIcon}${priorityIcon} ${truncateText(task.title, 18)}`,
      `todo_view_${task.id}`
    ).row();
  });
  
  // Пагинация
  const paginationRow = [];
  if (page > 1) {
    paginationRow.push(InlineKeyboard.text("⬅️ Назад", `todo_list_${period}_${page - 1}`));
  }
  if (hasMore) {
    paginationRow.push(InlineKeyboard.text("➡️ Вперед", `todo_list_${period}_${page + 1}`));
  }
  
  if (paginationRow.length > 0) {
    keyboard.row(...paginationRow);
  }
  
  keyboard.row().text("🎯 Главное меню", "todo_main_menu");
  
  return keyboard;
};

// Клавиатура просмотра задачи
export const getTaskViewKeyboard = (task: TodoTask) => {
  return new InlineKeyboard()
    .text("✅ Выполнить", `todo_complete_${task.id}`)
    .text("✏️ Редактировать", `todo_edit_${task.id}`)
    .row()
    .text("⏱️ Запустить таймер", `pomodoro_start_${task.id}`)
    .text("🗑️ Удалить", `todo_delete_${task.id}`)
    .row()
    .text("📋 К списку", `todo_list_today_1`);
};

// Клавиатура выбора приоритета
export const getPriorityKeyboard = (taskId?: string) => {
  const keyboard = new InlineKeyboard();
  
  Object.values(TASK_PRIORITIES).forEach(priority => {
    const callbackData = taskId ? `todo_set_priority_${taskId}_${priority.value}` : `todo_priority_${priority.value}`;
    keyboard.text(priority.label, callbackData).row();
  });
  
  if (taskId) {
    keyboard.text("⬅️ Назад", `todo_edit_${taskId}`);
  }
  
  return keyboard;
};

// Вспомогательные функции
export const getTaskStatusIcon = (task: TodoTask): string => {
  switch (task.status) {
    case 'COMPLETED': return '✅ ';
    case 'IN_PROGRESS': return '🔄 ';
    default: return '⏳ ';
  }
};

export const getPriorityIcon = (priority: TodoTask['priority']): string => {
  switch (priority) {
    case 'URGENT': return '🔴';
    case 'HIGH': return '🟡'; 
    case 'MEDIUM': return '🟢';
    case 'LOW': return '🔵';
    default: return '';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const getPeriodName = (period: string): string => {
  const periodNames: Record<string, string> = {
    today: "сегодня",
    week: "эту неделю", 
    month: "этот месяц",
    all: "все время"
  };
  return periodNames[period] || period;
};

export const formatTaskMessage = (task: TodoTask): string => {
  const status = TASK_STATUSES[task.status].label;
  const priority = TASK_PRIORITIES[task.priority].label;
  
  let message = `🎯 **${task.title}**\n\n`;
  message += `📊 Статус: ${status}\n`;
  message += `🎯 Приоритет: ${priority}\n`;
  
  if (task.description) {
    message += `📄 Описание: ${task.description}\n`;
  }
  
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate).toLocaleDateString('ru-RU');
    message += `📅 Срок: ${dueDate}\n`;
  }
  
  if (task.duration) {
    message += `⏱️ Длительность: ${task.duration} мин\n`;
  }
  
  if (task.assignee) {
    message += `👤 Исполнитель: ${task.assignee}\n`;
  }
  
  if (task.category) {
    message += `📂 Категория: ${task.category}\n`;
  }
  
  if (task.estimatedPomodoros) {
    message += `🍅 Помидоры: ${task.completedPomodoros || 0}/${task.estimatedPomodoros}\n`;
  }
  
  if (task.totalTimeSpent > 0) {
    message += `⏰ Затрачено времени: ${task.totalTimeSpent} мин\n`;
  }
  
  message += `\n📅 Создана: ${task.createdAt.toLocaleDateString('ru-RU')}`;
  
  return message;
};

// Текстовые сообщения
export const TodoMessages = {
  mainMenu: "🎯 **Управление задачами**\n\nВыберите период для просмотра:",
  taskList: (period: string, page: number, taskCount: number) => 
    `📋 **Задачи на ${getPeriodName(period)}** (стр. ${page}):\n\n` +
    `${taskCount === 0 ? "🚫 Задач нет - можно отдохнуть!" : "Выберите задачу для просмотра:"}`,
  quickAddPrompt: "Введите название задачи (остальные поля можно заполнить позже):",
  taskAdded: (title: string) => `✅ Задача "${title}" создана!`,
  taskView: "Детали задачи:",
  completeConfirm: (title: string) => `✅ Задача "${title}" выполнена!`,
  deleteConfirm: (title: string) => `🗑️ Задача "${title}" удалена!`,
  prioritySelect: "Выберите приоритет задачи:"
};