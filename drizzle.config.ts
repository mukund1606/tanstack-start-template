import type { Config } from "drizzle-kit";

const config: Config = {
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  verbose: true,
  strict: true,
  dialect: "mysql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["tanstack_start_*"],
};

export default config;
