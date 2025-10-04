import { bot } from "../../core/bot/bot-instance";
import { TodoModuleInfo } from "./todo-info";
import { infoSystem } from "../../core/info/info-system";
import { registerTodoListCommand } from "./commands/todo-list";
import { registerTodoCallbacks } from "./handlers/todo-callbacks";
import { registerTodoActions } from "./handlers/todo-actions";
import { registerTodoAddCommand } from "./commands/todo-add";

export function registerTodoModule() {
  // Регистрируем модуль в системе информации
  infoSystem.registerModule(TodoModuleInfo);

  // Регистрируем команды
  registerTodoListCommand(bot);
  registerTodoAddCommand(bot);
  
  // Регистрируем обработчики
  registerTodoCallbacks(bot);
  registerTodoActions(bot);

  console.log("✅ Todo module registered");
}