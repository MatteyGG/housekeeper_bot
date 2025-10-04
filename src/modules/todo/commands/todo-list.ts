import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { getTaskListKeyboard, TodoMessages } from "../texts/todo-texts";
import { getTasksByPeriod } from "../services/todo-service";

export function registerTodoListCommand(bot: Bot<MyContext>) {
  bot.command("todo", async (ctx) => {
    // Сразу показываем задачи на сегодня
    const tasks = await getTasksByPeriod(ctx.session.familyId, "today", 1);
    const keyboard = getTaskListKeyboard(tasks, "today", 1, tasks.length === 10);
    const message = TodoMessages.taskList("today", 1, tasks.length);
    
    await ctx.reply(message, {
      reply_markup: keyboard,
      parse_mode: "Markdown"
    });
  });
}