// src/core/database/database-connection.ts

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Подключение к базе данных установлено");
  } catch (error) {
    console.error("❌ Ошибка подключения к базе:", error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  await prisma.$disconnect();
}