export const Categories = {
  expense: [
    "🍔 Фаст-фуд",
    "🍽️ Обеды вне дома", 
    "🚬 Табак",
    "🏥 Здоровье",
    "🛒 Продукты",
    "🏠 Быт",
    "📅 Рассрочки",
    "🚕 Транспорт",
    "🏫 Учеба",
    "🎮 Развлечения",
    "👕 Одежда",
    "💡 ЖКУ",
    "📞 Связь",
    "❔ Другое"
  ],
  income: [
    "💼 Зарплата",
    "🎁 Подарок", 
    "📈 Инвестиции",
    "🔄 Возврат",
    "❔ Другое"
  ]
};

export const FinanceModuleInfo = {
  name: "💰 Финансы",
  description: "Учет доходов, расходов и аналитика",
  commands: [
    {
      command: "expense",
      description: "Добавить расход",
      requiresAuth: true
    },
    {
      command: "income", 
      description: "Добавить доход",
      requiresAuth: true
    },
    {
      command: "report",
      description: "Отчет за период (день/неделя/месяц/всё время)",
      requiresAuth: true
    },
    {
      command: "excel_report",
      description: "Экспорт отчета в Excel",
      requiresAuth: true
    },
    {
      command: "report_week",
      description: "Отчет за неделю", 
      requiresAuth: true
    },
    {
      command: "report_day",
      description: "Отчет за день",
      requiresAuth: true
    },
    {
      command: "report_all", 
      description: "Отчет за всё время",
      requiresAuth: true
    }
  ]
};

export const AmountButtons = {
  preset: [250, 500, 1000, 1500],
  custom: "🔢 Другая сумма"
};

export const CallbackActions = {
  CATEGORY_PREFIX: "category_",
  AMOUNT_PREFIX: "amount_",
  CUSTOM_AMOUNT: "custom_amount",
  CONFIRM: "confirm_transaction",
  CANCEL: "cancel_transaction", 
  SKIP_DESCRIPTION: "skip_description"
};

export const Messages = {
  DESCRIPTION_SKIPPED: "Описание пропущено",
  TRANSACTION_SAVED: (amount: number, description?: string) => 
    `✅ Успешно сохранено!\n${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount)}${description ? `\nОписание: ${description}` : ''}`
};

export const ExcelReportTexts = {
  selectRange: "📊 Выберите период для отчета:",
  week: "📅 За неделю",
  month: "📅 За месяц", 
  year: "📅 За год",
  all: "📅 Весь период",
  generating: "📊 Генерация отчета..."
};

export const HelpMessages = {
  EXPENSE_HELP: "Формат:\n/expense Сумма Категория\nПример:\n/expense 1500 Продукты",
  INCOME_HELP: "Формат:\n/income Сумма Категория\nПример:\n/income 1500 Зарплата"
};