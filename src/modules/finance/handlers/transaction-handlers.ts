import { Bot } from "grammy";
import { MyContext } from "../../../core/types";
import { requireAuth } from "../../../core/auth/auth-middleware";
import {
  handleCategorySelection,
  handleAmountSelection,
  requestDescription,
  handleTransactionConfirmation,
  saveTransaction,
  validateTransactionFlow,
} from "../flows/transaction-flow";
import { CallbackActions } from "../texts/finance-texts";

export function registerTransactionFlowHandlers(bot: Bot<MyContext>) {
  // Обработчик выбора категории
  bot.callbackQuery(
    new RegExp(`^${CallbackActions.CATEGORY_PREFIX}`),
    requireAuth,
    async (ctx) => {
      if (!ctx.callbackQuery.data) {
        await ctx.answerCallbackQuery("Ошибка данных");
        return;
      }

      const category = ctx.callbackQuery.data.replace(
        CallbackActions.CATEGORY_PREFIX,
        ""
      );
      await handleCategorySelection(ctx, category);
      await ctx.answerCallbackQuery();
    }
  );


  // Обработчик выбора суммы из пресета
bot.callbackQuery(new RegExp(`^${CallbackActions.AMOUNT_PREFIX}\\d+$`), requireAuth, async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (!data) {
        await ctx.answerCallbackQuery("Ошибка данных");
        return;
    }

    // Более безопасное извлечение числа
    const match = data.match(new RegExp(`^${CallbackActions.AMOUNT_PREFIX}(\\d+)$`));
    if (!match) {
        await ctx.answerCallbackQuery("Неверный формат суммы");
        return;
    }

    const amount = parseInt(match[1] as string);
    await handleAmountSelection(ctx, amount);
    await ctx.answerCallbackQuery();
});
  

  // Обработчик выбора произвольной суммы
  bot.callbackQuery(CallbackActions.CUSTOM_AMOUNT, requireAuth, async (ctx) => {
    if (!validateTransactionFlow(ctx)) return;

    await ctx.editMessageText("Введите сумму в рублях:");
    ctx.session.transactionFlow!.step = "amount";
    await ctx.answerCallbackQuery();
  });

  // Обработчик пропуска описания
  bot.callbackQuery(
    CallbackActions.SKIP_DESCRIPTION,
    requireAuth,
    async (ctx) => {
      if (!validateTransactionFlow(ctx)) return;

      ctx.session.transactionFlow!.description = "";
      await handleTransactionConfirmation(ctx);
      await ctx.answerCallbackQuery();
    }
  );

  // Обработчик подтверждения транзакции
  bot.callbackQuery(CallbackActions.CONFIRM, requireAuth, async (ctx) => {
    await saveTransaction(ctx);
    await ctx.answerCallbackQuery();
  });

  // Обработчик отмены
  bot.callbackQuery(CallbackActions.CANCEL, requireAuth, async (ctx) => {
    ctx.session.transactionFlow = undefined;
    await ctx.editMessageText("❌ Операция отменена");
    await ctx.answerCallbackQuery();
  });

  // Обработчик текстовых сообщений для суммы и описания
  bot.on("message:text", requireAuth, async (ctx, next) => {
    if (!ctx.session.transactionFlow) return next();

    const flow = ctx.session.transactionFlow;
    const text = ctx.message.text.trim();

    // Пропускаем команды
    if (text.startsWith("/")) {
      return next();
    }

    if (flow.step === "amount") {
      const amount = parseFloat(text.replace(",", ".")); // Поддержка запятых
      if (isNaN(amount) || amount <= 0) {
        await ctx.reply(
          "❌ Пожалуйста, введите корректную положительную сумму:"
        );
        return;
      }
      ctx.session.transactionFlow.amount = amount;
      await requestDescription(ctx);
      return;
    }

    if (flow.step === "description") {
      // Ограничим длину описания
      if (text.length > 200) {
        await ctx.reply("❌ Описание слишком длинное (макс. 200 символов):");
        return;
      }
      ctx.session.transactionFlow.description = text;
      await handleTransactionConfirmation(ctx);
      return;
    }

    await next();
  });
}
