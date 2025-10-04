export const CoreTexts = {
  WELCOME: "👋 Добро пожаловать в Housekeeper!",
  HELP_TITLE: "🆘 Помощь по командам Housekeeper",
  UNAUTHORIZED: "🔒 Для этой команды требуется авторизация",
};

export const CoreModuleInfo = {
  name: "🔐 Авторизация",
  description: "Управление доступом к семейному аккаунту",
  commands: [
    {
      command: "login",
      description: "Войти в семейный аккаунт",
      requiresAuth: false
    },
    {
      command: "register", 
      description: "Создать семейный аккаунт",
      requiresAuth: false
    },
    {
      command: "logout",
      description: "Выйти из системы",
      requiresAuth: true
    }
  ]
};