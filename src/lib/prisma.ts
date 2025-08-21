// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Avoid multiple PrismaClient instances in dev
  // (Next.js hot reload can re-import this file many times)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // optional for debugging
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
