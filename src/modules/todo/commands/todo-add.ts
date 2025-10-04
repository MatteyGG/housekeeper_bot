import { Bot } from "grammy";
import { MyContext } from "../../../core/types";

export function registerTodoAddCommand(bot: Bot<MyContext>) {
  bot.command("todo_add", async (ctx) => {
    ctx.session.todoFlow = {
      step: "title",
      taskData: {},
      quickMode: false
    };
    
    await ctx.reply("Давайте создадим задачу! Введите название:");
  });
}