export function getPeriodDates(period: string): [Date, Date] {
  const now = new Date();
  switch (period) {
    case "day":
      return [new Date(now.getFullYear(), now.getMonth(), now.getDate()), new Date()];
    case "week":
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return [weekAgo, new Date()];
    case "month":
      return [new Date(now.getFullYear(), now.getMonth(), 1), new Date()];
    case "year":
      return [new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 11, 31)];
    default:
      return [new Date(0), new Date()];
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(amount);
}