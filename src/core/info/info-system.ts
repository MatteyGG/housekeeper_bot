// src/core/info/info-system.ts

export interface ModuleInfo {
  name: string;
  description: string;
  commands: CommandInfo[];
}

export interface CommandInfo {
  command: string;
  description: string;
  requiresAuth?: boolean;
}

class InfoSystem {
  private modules: Map<string, ModuleInfo> = new Map();

  registerModule(moduleInfo: ModuleInfo) {
    this.modules.set(moduleInfo.name, moduleInfo);
  }

  getStartMessage(): string {
    const moduleList = Array.from(this.modules.values())
      .map(module => `• ${module.name}: ${module.description}`)
      .join('\n');

    return `👋 Привет! Я Housekeeper - ваш семейный помощник.

📦 Доступные модули:
${moduleList}

📌 Используйте /help для подробной справки`;
  }

  getHelpMessage(): string {
    let helpText = `🆘 Помощь по командам Housekeeper\n\n`;

    for (const module of this.modules.values()) {
      helpText += `📦 ${module.name}\n`;
      helpText += `${module.description}\n\n`;
      
      for (const cmd of module.commands) {
        const authIcon = cmd.requiresAuth ? '🔒 ' : '';
        helpText += `${authIcon}/${cmd.command} - ${cmd.description}\n`;
      }
      helpText += '\n';
    }

    return helpText;
  }

  getAllCommands(): string[] {
    const commands: string[] = [];
    for (const module of this.modules.values()) {
      commands.push(...module.commands.map(cmd => cmd.command));
    }
    return commands;
  }
}

export const infoSystem = new InfoSystem();