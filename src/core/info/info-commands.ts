//src/core/info/info-commands.ts

import { bot } from "../bot/bot-instance";
import { Keyboard } from "grammy";
import { infoSystem } from "./info-system";
import { CoreModuleInfo } from "./info-texts";
export function registerInfoCommands() {
  // Регистрируем core модуль при импорте
  infoSystem.registerModule(CoreModuleInfo);

  bot.command("start", async (ctx) => {
    const keyboard = new Keyboard()
      .text("/login")
      .text("/register")
      .row()
      .text("/help");

    await ctx.reply(infoSystem.getStartMessage(), {
      reply_markup: keyboard.resized(),
    });
  });

  bot.command("help", async (ctx) => {
    const keyboard = new Keyboard();
    
    // Динамически добавляем команды в клавиатуру
    const allCommands = infoSystem.getAllCommands();
    let rowCount = 0;
    
    for (const command of allCommands) {
      keyboard.text(`/${command}`);
      rowCount++;
      
      if (rowCount % 3 === 0) {
        keyboard.row();
      }
    }
    
    keyboard.text("/help");

    await ctx.reply(infoSystem.getHelpMessage(), {
      reply_markup: keyboard.resized(),
    });
  });

  console.log("✅ Info commands registered");
}