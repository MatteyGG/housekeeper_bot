import { MyContext } from "../../../core/types";
import { InlineKeyboard } from "grammy";
import { Categories, AmountButtons, CallbackActions, Messages } from "../texts/finance-texts";
import { Errors } from "../../../core/texts/auth-texts";

export function startTransactionFlow(ctx: MyContext, type: "expense" | "income") {
  ctx.session.transactionFlow = { type, step: "category" };

  const keyboard = new InlineKeyboard();
  Categories[type].forEach((category, index) => {
    if (index % 2 === 0) {
      keyboard.row();
    }
    keyboard.text(category, `${CallbackActions.CATEGORY_PREFIX}${category}`);
  });

  return ctx.reply(
    `Выберите категорию ${type === "expense" ? "расхода" : "дохода"}:`,
    { reply_markup: keyboard }
  );
}

export function handleCategorySelection(ctx: MyContext, category: string) {
  if (!validateTransactionFlow(ctx)) return;

  ctx.session.transactionFlow = {
    ...ctx.session.transactionFlow!,
    category,
    step: "amount"
  };

  return ctx.editMessageText(`Категория: ${category}\nВыберите сумму:`, {
    reply_markup: createAmountKeyboard(),
  });
}

export function handleAmountSelection(ctx: MyContext, amount: number) {
  if (!validateTransactionFlow(ctx)) return;

  ctx.session.transactionFlow!.amount = amount;
  return requestDescription(ctx);
}

export async function requestDescription(ctx: MyContext) {
  ctx.session.transactionFlow!.step = "description";

  const keyboard = new InlineKeyboard()
    .text("Пропустить", CallbackActions.SKIP_DESCRIPTION);

  return ctx.reply("Введите описание транзакции:", {
    reply_markup: keyboard
  });
}

export async function handleTransactionConfirmation(ctx: MyContext) {
  const flow = ctx.session.transactionFlow;
  if (!flow || !flow.amount) return;

  const confirmationKeyboard = new InlineKeyboard()
    .text("✅ Подтвердить", CallbackActions.CONFIRM)
    .text("❌ Отменить", CallbackActions.CANCEL);

  const message = [
    `Подтвердите операцию:`,
    `Тип: ${flow.type === 'expense' ? 'расход' : 'доход'}`,
    `Категория: ${flow.category || 'Не указана'}`,
    `Сумма: ${flow.amount} ₽`,
    `Описание: ${flow.description || 'нет'}`
  ].join("\n");

  return ctx.reply(message, { reply_markup: confirmationKeyboard });
}

export async function saveTransaction(ctx: MyContext) {
  if (!validateTransactionFlow(ctx)) return;

  const flow = ctx.session.transactionFlow!;
  try {
    await ctx.prisma.transaction.create({
      data: {
        amount: flow.amount!,
        type: flow.type,
        category: flow.category || "Другое",
        description: flow.description,
        familyId: ctx.session.familyName!, // Используем familyName как familyId
        username: ctx.session.username || "unknown",
      },
    });

    await ctx.reply(Messages.TRANSACTION_SAVED(flow.amount!, flow.description));
    ctx.session.transactionFlow = undefined;
  } catch (error) {
    console.error("Transaction error:", error);
    await ctx.reply(Errors.GENERIC_ERROR);
    ctx.session.transactionFlow = undefined;
  }
}

export function validateTransactionFlow(ctx: MyContext): boolean {
  if (!ctx.session.transactionFlow) {
    ctx.reply("❌ Ошибка сессии. Начните операцию заново.");
    return false;
  }
  
  // Дополнительные проверки в зависимости от шага
  const flow = ctx.session.transactionFlow;
  
  if (flow.step === "category" && !flow.type) {
    ctx.reply("❌ Ошибка: не указан тип операции");
    return false;
  }
  
  if (flow.step === "amount" && !flow.category) {
    ctx.reply("❌ Ошибка: не выбрана категория");  
    return false;
  }
  
  if (flow.step === "description" && (!flow.category || !flow.amount)) {
    ctx.reply("❌ Ошибка: неполные данные транзакции");
    return false;
  }
  
  return true;
}

function createAmountKeyboard() {
  const keyboard = new InlineKeyboard();
  
  AmountButtons.preset.forEach((amount, index) => {
    if (index % 2 === 0) {
      keyboard.row();
    }
    keyboard.text(`${amount} ₽`, `${CallbackActions.AMOUNT_PREFIX}${amount}`);
  });
  
  keyboard.row().text(AmountButtons.custom, CallbackActions.CUSTOM_AMOUNT);
  
  return keyboard;
}