import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { Keyboard } from "grammy";
import { getPeriodDates, formatCurrency } from "../reports/report-utils";
import { Errors } from "../../../core/texts/core-texts";

async function generateReport(ctx: MyContext, period: string): Promise<void> {
  try {
    const [startDate, endDate] = getPeriodDates(period);

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        familyId: ctx.session.familyName,
        ...(period !== "all" && {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }),
      },
    });

    if (transactions.length === 0) {
      await ctx.reply("Нет данных для отчета за выбранный период");
      return;
    }

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    await ctx.reply(
      `💰 Баланс: ${formatCurrency(balance)}\n` +
        `📈 Доходы: ${formatCurrency(income)}\n` +
        `📉 Расходы: ${formatCurrency(expenses)}\n\n` +
        `📅 Период: ${
          period === "all"
            ? "все время"
            : period === "month"
            ? "за месяц"
            : period === "week"
            ? "за неделю"
            : "за день"
        }\n\n` +
        `Экспорт в Excel:\n` +
        `/excel_report\n\n` +
        `Графики:\n` +
        `/charts`,
      {
        reply_markup: new Keyboard()
          .text("/report_week")
          .text("/report_day")
          .text("/report_all")
          .resized(),
      }
    );
    
    return;
  } catch (error) {
    console.error("Report error:", error);
    await ctx.reply(Errors.GENERIC_ERROR);
    return; 
  }
}

export function registerReportCommand(bot: Bot<MyContext>) {
  bot.command("report", async (ctx) => {
    await generateReport(ctx, "month");
  });

  bot.command("report_week", async (ctx) => {
    await generateReport(ctx, "week");
  });

  bot.command("report_day", async (ctx) => {
    await generateReport(ctx, "day");
  });

  bot.command("report_all", async (ctx) => {
    await generateReport(ctx, "all");
  });
}