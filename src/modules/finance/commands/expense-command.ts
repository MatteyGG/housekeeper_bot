import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { startTransactionFlow } from "../flows/transaction-flow";
import { requireAuth } from "../../../core/auth/auth-middleware";

export function registerExpenseCommand(bot: Bot<MyContext>) {
  bot.command("expense", requireAuth, async (ctx) => {
    await startTransactionFlow(ctx, "expense");
  });
}