import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    HASH_SALT: z.string().min(1).max(30),
    JWT_SECRET: z.string().min(1).max(100),
    GITHUB_CLIENT_ID: z.string().min(1).max(100),
    GITHUB_CLIENT_SECRET: z.string().min(1).max(100),
    GITHUB_REDIRECT_URI: z.string().url(),
    TOKEN_EXPIRES_IN: z.string().min(1).max(100),
    SERVER_PORT: z.coerce.number().default(3333),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    HASH_SALT: process.env.HASH_SALT,
    JWT_SECRET: process.env.JWT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
    SERVER_PORT: process.env.SERVER_PORT,
  },
  emptyStringAsUndefined: true,
})
