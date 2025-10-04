import { bot } from "./core/bot/bot-instance";
import { connectDB } from "./core/database/database-connection";

// Импортируем функции регистрации модулей
import { registerInfoCommands } from "./core/info/info-commands";
import { registerAuthCommands } from "./core/auth/auth-commands";
import { registerFinanceModule } from "./modules/finance/finance-module";
import { requireAuth } from "./core/auth/auth-middleware";

// Инициализируем модули в правильном порядке
function initializeModules() {
  // 1. Регистрируем core модули (не требуют авторизации)
  registerInfoCommands();
  registerAuthCommands();
  
  // 2. Подключаем middleware авторизации
  bot.use(requireAuth);
  
  // 3. Регистрируем защищенные модули (требуют авторизации)
  registerFinanceModule();
}

async function main() {
  try {
    // 1. Подключаемся к БД
    await connectDB();
    console.log("✅ Подключение к БД успешно");

    // 2. Инициализируем модули
    initializeModules();
    console.log("✅ Модули инициализированы");

    // 3. Проверяем подключение к Telegram API
    const me = await bot.api.getMe();
    console.log(`🤖 Бот Housekeeper @${me.username} запущен`);

    // 4. Запускаем long polling
    console.log("🔄 Ожидаем сообщения...");
    bot.start({
      onStart: (info: { username: string }) => {
        console.log(`🚀 Бот запущен (${info.username})`);
      },
      allowed_updates: ["message", "callback_query"],
    });
  } catch (error) {
    console.error("💥 Критическая ошибка при запуске:", error);
    process.exit(1);
  }
}

// Обработка ошибок
bot.catch((err: { ctx: any; error: any }) => {
  const ctx = err.ctx;
  console.error(`⚠️ Ошибка в обработчике ${ctx.update.update_id}:`, err.error);
  
  ctx.reply("😔 Произошла техническая ошибка").catch(console.error);
});

// Запускаем приложение
main();