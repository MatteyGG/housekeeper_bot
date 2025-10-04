import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { 
  formatTaskMessage,
  getMainMenuKeyboard, 
  getPriorityKeyboard, 
  getTaskListKeyboard, 
  getTaskViewKeyboard, 
  TodoMessages
} from "../texts/todo-texts";
import { completeTask, deleteTask, getTaskById, getTasksByPeriod } from "../services/todo-service";
import { TodoTask } from "../types";

export function registerTodoCallbacks(bot: Bot<MyContext>) {
  // Главное меню задач
  bot.callbackQuery("todo_main_menu", async (ctx) => {
    await ctx.editMessageText(TodoMessages.mainMenu, {
      reply_markup: getMainMenuKeyboard(),
      parse_mode: "Markdown"
    });
    await ctx.answerCallbackQuery();
  });

  // Список задач по периодам
  bot.callbackQuery(/^todo_list_(today|week|month|all)_(\d+)$/, async (ctx) => {
    // Безопасное извлечение параметров
    const match = ctx.match;
    if (!match || match.length < 3) {
      await ctx.answerCallbackQuery("Ошибка запроса");
      return;
    }

    const period = match[1];
    const pageStr = match[2];
    
    // Проверяем что параметры не undefined
    if (!period || !pageStr) {
      await ctx.answerCallbackQuery("Ошибка в параметрах");
      return;
    }
    
    const page = parseInt(pageStr);
    if (isNaN(page)) {
      await ctx.answerCallbackQuery("Неверный номер страницы");
      return;
    }
    
    const tasks = await getTasksByPeriod(ctx.session.familyId, period, page);
    const keyboard = getTaskListKeyboard(tasks, period, page, tasks.length === 10);
    const message = TodoMessages.taskList(period, page, tasks.length);
    
    await ctx.editMessageText(message, {
      reply_markup: keyboard,
      parse_mode: "Markdown"
    });
    await ctx.answerCallbackQuery();
  });

  // Быстрое добавление задачи
  bot.callbackQuery("todo_quick_add", async (ctx) => {
    ctx.session.todoFlow = {
      step: "title",
      taskData: {},
      quickMode: true
    };
    
    await ctx.editMessageText(TodoMessages.quickAddPrompt);
    await ctx.answerCallbackQuery();
  });

  // Просмотр конкретной задачи
  bot.callbackQuery(/^todo_view_/, async (ctx) => {
    const taskId = ctx.callbackQuery.data.replace('todo_view_', '');
    const task = await getTaskById(taskId);
    
    if (!task) {
      await ctx.answerCallbackQuery("Задача не найдена");
      return;
    }
    
    const message = formatTaskMessage(task);
    const keyboard = getTaskViewKeyboard(task);
    
    await ctx.editMessageText(message, {
      reply_markup: keyboard,
      parse_mode: "Markdown"
    });
    await ctx.answerCallbackQuery();
  });

  // Выполнение задачи
  bot.callbackQuery(/^todo_complete_/, async (ctx) => {
    const taskId = ctx.callbackQuery.data.replace('todo_complete_', '');
    const task = await getTaskById(taskId);
    
    if (!task) {
      await ctx.answerCallbackQuery("Задача не найдена");
      return;
    }
    
    const success = await completeTask(taskId);
    
    if (success) {
      await ctx.editMessageText(TodoMessages.completeConfirm(task.title), {
        reply_markup: getMainMenuKeyboard()
      });
    } else {
      await ctx.answerCallbackQuery("Ошибка при выполнении задачи");
    }
  });

  // Удаление задачи
  bot.callbackQuery(/^todo_delete_/, async (ctx) => {
    const taskId = ctx.callbackQuery.data.replace('todo_delete_', '');
    const task = await getTaskById(taskId);
    
    if (!task) {
      await ctx.answerCallbackQuery("Задача не найдена");
      return;
    }
    
    const success = await deleteTask(taskId);
    
    if (success) {
      await ctx.editMessageText(TodoMessages.deleteConfirm(task.title), {
        reply_markup: getMainMenuKeyboard()
      });
    } else {
      await ctx.answerCallbackQuery("Ошибка при удалении задачи");
    }
  });

  // Редактирование задачи
  bot.callbackQuery(/^todo_edit_/, async (ctx) => {
    const taskId = ctx.callbackQuery.data.replace('todo_edit_', '');
    const task = await getTaskById(taskId);
    
    if (!task) {
      await ctx.answerCallbackQuery("Задача не найдена");
      return;
    }
    
    // Показываем меню редактирования (начнем с приоритета)
    await ctx.editMessageText(TodoMessages.prioritySelect, {
      reply_markup: getPriorityKeyboard(taskId)
    });
    await ctx.answerCallbackQuery();
  });

  // Установка приоритета
  bot.callbackQuery(/^todo_set_priority_/, async (ctx) => {
    const parts = ctx.callbackQuery.data.split('_');
    const taskId = parts[3];
    const priority = parts[4] as TodoTask['priority'];
    
    console.log(`Setting priority ${priority} for task ${taskId}`);
    
    // TODO: Обновить задачу в БД
    const task = await getTaskById(taskId as string);
    if (task) {
      task.priority = priority;
    }
    
    await ctx.answerCallbackQuery(`Приоритет обновлен!`);
    // Возвращаемся к просмотру задачи
    await ctx.editMessageText(
      formatTaskMessage(task!),
      { reply_markup: getTaskViewKeyboard(task!), parse_mode: "Markdown" }
    );
  });
}