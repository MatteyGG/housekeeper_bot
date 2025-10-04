# 🏠 Housekeeper Bot

Модульный Telegram-бот для управления семейными финансами и задачами, построенный на современном стеке технологий.

## 🚀 Технологии

- **TypeScript** - статическая типизация
- **Grammy** - фреймворк для Telegram ботов
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - база данных
- **ExcelJS** - генерация Excel отчетов

## 📁 Структура проекта

```
housekeeper_bot/
├── src/
│   ├── core/                 # Базовые системы
│   │   ├── bot/             # Конфигурация бота
│   │   ├── auth/            # Аутентификация и авторизация
│   │   ├── database/        # Подключение к БД
│   │   ├── info/            # Система информации и помощи
│   │   └── types.ts         # Общие типы
│   ├── modules/             # Функциональные модули
│   │   ├── finance/         # 💰 Учет финансов
│   │   └── tasks/           # ✅ Менеджер задач (в разработке)
│   └── main.ts              # Точка входа
├── prisma/
│   └── schema.prisma        # Схема базы данных
└── package.json
```

## 🏗️ Архитектура

### Модульная система
Проект построен по модульному принципу, где каждый модуль:
- Самостоятелен и изолирован
- Регистрируется через единый интерфейс
- Автоматически появляется в справке (/help)

### Core компоненты
- **Аутентификация** - система входа/регистрации семей
- **Сессии** - хранение состояния пользователя
- **Middleware** - централизованная проверка прав доступа
- **База данных** - единое подключение через Prisma

## ⚡ Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка базы данных
```bash
# Запуск PostgreSQL в Docker
docker-compose up -d

# Настройка Prisma
npx prisma generate
npx prisma db push
```

### 3. Настройка окружения
Создайте `.env` файл:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/housekeeper"
BOT_TOKEN="your_telegram_bot_token"
```

### 4. Запуск
```bash
# Разработка
npm run dev

# Продакшен
npm start
```

## 🛠️ Разработка

### Добавление нового модуля

1. **Создайте структуру модуля:**
```typescript
// modules/your-module/
├── your-module.ts
├── your-module-info.ts
├── commands/
└── handlers/
```

2. **Определите информацию о модуле:**
```typescript
// modules/your-module/your-module-info.ts
export const YourModuleInfo = {
  name: "🎯 Ваш модуль",
  description: "Описание функциональности",
  commands: [
    {
      command: "your_command",
      description: "Описание команды",
      requiresAuth: true
    }
  ]
};
```

3. **Создайте функцию регистрации:**
```typescript
// modules/your-module/your-module.ts
export function registerYourModule(bot: Bot<MyContext>) {
  infoSystem.registerModule(YourModuleInfo);
  // Регистрация команд и обработчиков
  console.log("✅ Your module registered");
}
```

4. **Добавьте в main.ts:**
```typescript
// В правильном порядке:
function initializeModules() {
  registerInfoCommands();     // Core модули
  registerAuthCommands();     // До middleware
  bot.use(requireAuth);       // Middleware авторизации
  registerFinanceModule();    // Защищенные модули
  registerYourModule();       // Ваш новый модуль
}
```

### Ключевые концепции

**Middleware авторизации:**
```typescript
// Проверяет авторизацию для всех команд кроме:
// /start, /help, /register, /login
bot.use(requireAuth);
```

**Система сессий:**
```typescript
// Расширяйте интерфейс для новых модулей
interface SessionData {
  isLoggedIn: boolean;
  familyName: string;
  // Добавьте свои flow данные
  yourModuleFlow?: YourFlowType;
}
```

**Интерактивный UX:**
- Используйте callback-кнопки вместо текстового ввода
- Минимизируйте ввод ID вручную
- Создавайте цепочки взаимодействий (flows)

## 📊 Доступные модули

### 💰 Finance Module
- Учет доходов и расходов
- Категоризация транзакций
- Excel отчеты и аналитика
- Графики и статистика

**Команды:** `/expense`, `/income`, `/report`, `/excel_report`

### ✅ Tasks Module (в разработке)
- Создание и управление задачами
- Иерархия задач и подзадач
- Таймер Pomodoro
- Назначение исполнителей

## 🐛 Отладка и логи

Проект включает подробное логирование:
- Статус инициализации модулей
- Ошибки базы данных
- Проблемы авторизации
- Ошибки выполнения команд

## 🔮 Планы развития

- [ ] Модуль задач и Pomodoro таймера
- [ ] Утренние оповещения с интеграцией Home Assistant
- [ ] Система уведомлений
- [ ] Мобильное приложение

## 📝 Лицензия

MIT License

---

**Housekeeper Bot** - ваш надежный помощник для организации семейной жизни! 🏠✨