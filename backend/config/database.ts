import { PrismaClient } from "@prisma/client";

// Prisma client singleton — reuses connection across the app
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});

export default prisma;
