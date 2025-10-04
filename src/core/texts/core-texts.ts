// src/core/texts/core-texts.ts

export const Errors = {
  NOT_LOGGED_IN: "🔒 Для выполнения действия требуется авторизация",
  INVALID_INPUT: "❌ Неверный формат команды", 
  DB_ERROR: "📂 Ошибка доступа к данным. Попробуйте позже",
  REGISTER_FORMAT: "❌ Формат: /register [ID семьи] [пароль]",
  FAMILY_EXISTS: "❌ Семья с таким ID уже существует",
  GENERIC_ERROR: "⚠️ Произошла ошибка, попробуйте позже",
  SESSION_ERROR: "⚠️ Ошибка сессии. Перезайдите в систему",
  UNKNOWN_ERROR: "⚠️ Неизвестная ошибка",
};

export const HelpMessages = {
  LOGIN_HELP: "Формат:\n/login СемейныйID Пароль\nПример:\n/login family123 qwerty"
};

export const StartMessage = `👋 Привет! Я помогу вам вести учёт финансов семьи.

📌 Основные команды:
/start - Начало работы
/register [ID семьи] [пароль] - Создать семью  
/login [ID семьи] [пароль] - Войти в семью

/expense - Добавить расход
/income - Добавить доход

/help - Помощь
/report - Отчёт за месяц
/excel_report - Экспорт в Excel        
/charts - Графики за месяц

⚠️ ВАЖНО: Никому не сообщайте пароль!`;