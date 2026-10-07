import { PrismaClient } from "@/prisma/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  let connectionString =
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/vcet_shortfilm";

  // Prevent pg-connection-string libpq warning when sslmode=require is used
  if (
    connectionString.includes("sslmode=require") &&
    !connectionString.includes("uselibpqcompat=true")
  ) {
    connectionString = connectionString.includes("?")
      ? `${connectionString}&uselibpqcompat=true`
      : `${connectionString}?uselibpqcompat=true`;
  }

  // Configure pg Pool
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("neon.tech") || connectionString.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : undefined,
    max: 10,
  });

  globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Export a proxy so it lazily initializes on actual usage
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === "function") {
      return (val as (...args: unknown[]) => unknown).bind(client);
    }
    return val;
  },
});
