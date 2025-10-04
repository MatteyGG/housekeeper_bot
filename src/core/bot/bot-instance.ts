import { Bot, session } from "grammy";
import { prisma } from "../database/database-connection";
import { prismaSessionStorage } from "../database/session-storage";
import { MyContext, SessionData } from "../types";

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
  
// Сессии
bot.use(
  session({
    initial: (): SessionData => ({ 
      isLoggedIn: false, 
      familyId: "", 
      familyName: "",
      username: "" 
    }),
    storage: prismaSessionStorage,
  })
);

// Prisma клиент в контекст
bot.use(async (ctx, next) => {
  ctx.prisma = prisma;
  await next();
});