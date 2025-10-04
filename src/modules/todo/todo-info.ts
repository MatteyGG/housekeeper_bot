export const TodoModuleInfo = {
  name: "✅ Todo & Задачи",
  description: "Управление задачами, подзадачами и временем выполнения",
  commands: [
    {
      command: "todo",
      description: "Просмотр и управление задачами",
      requiresAuth: true
    },
    {
      command: "todo_add", 
      description: "Добавить новую задачу",
      requiresAuth: true
    }
  ]
};