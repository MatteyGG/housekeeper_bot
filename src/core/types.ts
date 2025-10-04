// src/core/types.ts

import { PrismaClient } from "@prisma/client";
import { Context, SessionFlavor } from "grammy";

export interface SessionData {
  isLoggedIn: boolean;
  familyName: string;
  username?: string;
  familyId: string;
  
  // Finance модуль
  transactionFlow?: {
    type: "expense" | "income";
    category?: string;
    amount?: number;
    description?: string;
    step: "category" | "amount" | "description";
  };
  
  // Todo модуль
  todoFlow?: {
    step: "title" | "description" | "dueDate" | "duration" | "priority" | "assignee" | "category" | "subtasks" | "confirmation";
    taskData: Partial<{
      title: string;
      description?: string;
      dueDate?: Date;
      duration?: number;
      priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
      assignee?: string;
      category?: string;
      parentId?: string;
    }>;
    editingTaskId?: string;
    quickMode?: boolean;
  };
  
  // Pomodoro модуль
  pomodoroFlow?: {
    taskId?: string;
    timerType: "POMODORO_WORK" | "POMODORO_BREAK" | "STOPWATCH";
    startTime: Date;
    duration: number;
    currentTimerId?: string;
  };
}

export type MyContext = {
  prisma: PrismaClient;
} & Context & SessionFlavor<SessionData>;