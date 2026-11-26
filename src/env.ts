import { z } from 'zod';

/**
 * Environment variables, validated once at import. Add a key here (and to .env.example) before reading it anywhere;
 * NEXT_PUBLIC_ keys must be referenced literally so Next.js can inline them.
 */
const schema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
});

export const env = schema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
