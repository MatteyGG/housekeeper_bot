// src/core/auth/auth-commands.ts
import { bot } from "../bot/bot-instance";
import bcrypt from "bcrypt";
import { Keyboard } from "grammy";
import { prisma } from "../database/database-connection";
import { Errors, HelpMessages, StartMessage } from "../texts/auth-texts";


export function registerAuthCommands() {

// Регистрация семьи
bot.command("register", async (ctx) => {
  const args = ctx.match.split(" ");

  if (args.length < 2) {
    await ctx.reply(Errors.REGISTER_FORMAT);
    return;
  }

  const [familyId, password] = args;

  if (!familyId) {
  await ctx.reply("❌ Invalid family ID");
  return;
}
  if (!password) {
    await ctx.reply(HelpMessages.LOGIN_HELP, {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  if (password.length < 8) {
    await ctx.reply("❌ Пароль должен быть не менее 8 символов");
    return;
  }


  try {
    const exists = await prisma.family.findUnique({ where: { familyId } });
    if (exists) {
      await ctx.reply(Errors.FAMILY_EXISTS);
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await prisma.family.create({ data: { familyId, passwordHash: hash } });

    await ctx.reply("✅ Семья зарегистрирована! Теперь войдите через /login");
  } catch (error) {
    console.error("Registration error:", error);
    await ctx.reply(Errors.DB_ERROR);
  }
});

// Авторизация
bot.command("login", async (ctx) => {
  const args = ctx.match.trim().split(" ");

  if (ctx.session.isLoggedIn) {
    await ctx.reply("❌ Вы уже авторизованы", {
      reply_markup: new Keyboard().text("/logout").resized(),
    });
    return;
  }

  if (args.length < 2) {
    await ctx.reply(HelpMessages.LOGIN_HELP, {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  const [familyId, password] = args;

  // Проверяем, что password не undefined
  if (!password) {
    await ctx.reply(HelpMessages.LOGIN_HELP, {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  try {
    const family = await prisma.family.findUnique({ where: { familyId } });

    if (!family) {
      await ctx.reply(`❌ Семья "${familyId}" не найдена`, {
        reply_markup: new Keyboard().text("/register").resized(),
      });
      return;
    }

    // Теперь password гарантированно string
    const valid = await bcrypt.compare(password, family.passwordHash);
    if (!valid) {
      await ctx.reply("❌ Неверный пароль");
      return;
    }

    // Сохраняем данные в сессии
    ctx.session.isLoggedIn = true;
    ctx.session.familyId = family.id;
    ctx.session.familyName = family.familyId;
    ctx.session.username = ctx.from?.username || "Неизвестный пользователь";

    // Показываем клавиатуру с основными командами
    const mainKeyboard = new Keyboard()
      .text("/expense")
      .text("/income")
      .row()
      .text("/report")
      .text("/logout")
      .row()
      .text("/help");

    await ctx.reply(`✅ Успешный вход, ${ctx.session.username}!`, {
      reply_markup: mainKeyboard.resized(),
    });
  } catch (error) {
    console.error("Login error:", error);
    await ctx.reply(Errors.GENERIC_ERROR);
  }
});

// Выход из системы
bot.command("logout", async (ctx) => {
  if (!ctx.session.isLoggedIn) {
    await ctx.reply(Errors.NOT_LOGGED_IN);
    return;
  }

  // Синхронные операции - убираем await
  ctx.session.isLoggedIn = false;
  ctx.session.familyId = "";
  ctx.session.familyName = "";
  ctx.session.username = "";

  await ctx.reply("✅ Вы вышли из системы", {
    reply_markup: new Keyboard()
      .text("/login")
      .text("/register")
      .text("/help")
      .resized(),
  });
});
}