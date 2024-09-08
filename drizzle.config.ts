import { defineConfig, Config } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgres://user:user@127.0.0.1:5432/",
  },
  verbose: true,
  strict: true,
} as Config);