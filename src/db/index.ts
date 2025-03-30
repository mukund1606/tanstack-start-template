import { drizzle } from "drizzle-orm/mysql2";

import { serverEnv } from "~/env/server";

import { relations } from "~/db/relations";

export const db = drizzle(serverEnv.DATABASE_URL, { relations });
