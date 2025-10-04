import { bot } from "../../core/bot/bot-instance";
import { registerExpenseCommand } from "./commands/expense-command";
import { registerIncomeCommand } from "./commands/income-command";
import { registerReportCommand } from "./commands/report-command";
import { registerTransactionFlowHandlers } from "./handlers/transaction-handlers";

export function registerFinanceModule() {
  // Регистрируем команды
  registerExpenseCommand(bot);
  registerIncomeCommand(bot);
  registerReportCommand(bot);
  
  // Регистрируем обработчики колбэков и сообщений
  registerTransactionFlowHandlers(bot);

  console.log("✅ Finance module registered");
}