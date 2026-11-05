import { PrismaClient } from '@prisma/client';

/**
 * @zwantum/database
 * Database client management and connection factory for Zwantum Commerce.
 * Supports connection pooling and singleton client for persistent runtime.
 */

declare global {
  // eslint-disable-next-line no-var
  var __zwantum_prisma__: PrismaClient | undefined;
}

export function createPrismaClient(): PrismaClient {
  const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  return new PrismaClient({
    log: isDev ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma =
  (globalThis as unknown as { __zwantum_prisma__?: PrismaClient }).__zwantum_prisma__ ||
  createPrismaClient();

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  (globalThis as unknown as { __zwantum_prisma__?: PrismaClient }).__zwantum_prisma__ = prisma;
}

export * from '@prisma/client';
