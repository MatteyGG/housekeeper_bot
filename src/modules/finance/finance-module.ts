import { bot } from "../../core/bot/bot-instance";
import { infoSystem } from "../../core/info/info-system";
import { registerExpenseCommand } from "./commands/expense-command";
import { registerIncomeCommand } from "./commands/income-command";
import { registerReportCommand } from "./commands/report-command";
import { registerTransactionFlowHandlers } from "./handlers/transaction-handlers";
import { registerExcelReports } from "./reports/excel-reports";
import { FinanceModuleInfo } from "./texts/finance-texts";

export function registerFinanceModule() {
  // Регистрируем команды
  registerExpenseCommand(bot);
  registerIncomeCommand(bot);
  
  registerReportCommand(bot);
  registerExcelReports(bot);
  
  // Регистрируем обработчики колбэков и сообщений
  registerTransactionFlowHandlers(bot);

  console.log("✅ Finance module registered");

  infoSystem.registerModule(FinanceModuleInfo);
}