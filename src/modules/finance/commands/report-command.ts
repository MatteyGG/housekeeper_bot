import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { requireAuth } from "../../../core/auth/auth-middleware";

export function registerReportCommand(bot: Bot<MyContext>) {
  bot.command("report", requireAuth, async (ctx) => {
    // TODO: Реализовать логику отчетов
    await ctx.reply("📊 Отчеты пока в разработке... Скоро будет!");
  });
}