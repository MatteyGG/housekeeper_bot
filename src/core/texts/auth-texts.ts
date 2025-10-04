export const Errors = {
  NOT_LOGGED_IN: "🔒 Для выполнения действия требуется авторизация",
  DB_ERROR: "📂 Ошибка доступа к данным. Попробуйте позже",
  REGISTER_FORMAT: "❌ Формат: /register [ID семьи] [пароль]",
  FAMILY_EXISTS: "❌ Семья с таким ID уже существует",
  GENERIC_ERROR: "⚠️ Произошла ошибка, попробуйте позже",
  SESSION_ERROR: "⚠️ Ошибка сессии. Перезайдите в систему",
};

export const HelpMessages = {
  LOGIN_HELP: "Формат:\n/login СемейныйID Пароль\nПример:\n/login family123 qwerty",
};

export const StartMessage = `👋 Привет! Я Housekeeper - ваш семейный помощник.

📌 Основные команды:
/start - Начало работы  
/register [ID семьи] [пароль] - Создать семью
/login [ID семьи] [пароль] - Войти в семью
/help - Помощь

⚠️ ВАЖНО: Никому не сообщайте пароль!`;