# housekeeper_bot
Pet project. 
housekeeper_bot/
├── src/
│   ├── core/
│   │   ├── bot/
│   │   │   ├── bot-instance.ts      # Создание и конфигурация бота
│   │   │   └── context.ts           # Расширение контекста
│   │   ├── auth/
│   │   │   ├── auth-commands.ts     # /login, /register, /logout
│   │   │   ├── auth-middleware.ts   # Проверка авторизации
│   │   │   └── auth-texts.ts        # Тексты для авторизации
│   │   ├── database/
│   │   │   ├── database-connection.ts # Подключение к БД
│   │   │   └── session-storage.ts   # Хранилище сессий
│   │   ├── info/
│   │   │   ├── info-commands.ts       # Команды /start и /help
│   │   │   ├── info-system.ts         # Система регистрации модулей
│   │   │   └── info-texts.ts          # Базовые тексты
│   │   └── types.ts                 # Общие типы
│   ├── modules/
│   │   ├── finance/
│   │   │   ├── finance-module.ts    # Инициализация модуля финансов
│   │   │   ├── commands/
│   │   │   │   ├── expense-command.ts
│   │   │   │   ├── income-command.ts
│   │   │   │   └── report-command.ts
│   │   │   └── flows/
│   │   │       └── transaction-flow.ts
│   │   └── tasks/                   # Модуль задач (пока пустой)
│   ├── utils/                       # Общие утилиты
│   └── main.ts                      # Точка входа
├── package.json
└── docker-compose.yml