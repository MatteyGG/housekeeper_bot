import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { TodoMessages, getMainMenuKeyboard } from "../texts/todo-texts";

export function registerTodoActions(bot: Bot<MyContext>) {
  // Обработчик текста для быстрого добавления задачи
  bot.on("message:text", async (ctx, next) => {
    if (ctx.session.todoFlow?.step === "title" && ctx.session.todoFlow.quickMode) {
      const title = ctx.message.text.trim();
      
      if (title.length === 0) {
        await ctx.reply("Название задачи не может быть пустым");
        return;
      }
      
      // TODO: Сохранить задачу в БД
      console.log("Creating quick task:", title, "for family:", ctx.session.familyId);
      
      // Очищаем flow
      ctx.session.todoFlow = undefined;
      
      await ctx.reply(TodoMessages.taskAdded(title), {
        reply_markup: getMainMenuKeyboard()
      });
      return;
    }
    
    await next();
  });
}