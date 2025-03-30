import { generateId } from "better-auth";
import { createSelectSchema } from "drizzle-arktype";

import { createTable } from "./utils";

export const users = createTable("users", (t) => ({
  id: t.varchar("id", { length: 36 }).primaryKey().$defaultFn(generateId),
  name: t.text("name").notNull(),
  username: t.varchar("username", { length: 255 }).notNull().unique(),
  displayUsername: t.text("display_username"),
  email: t.varchar("email", { length: 255 }).notNull(),
  emailVerified: t.boolean("email_verified").notNull().default(false), // Logically default to true when user account is created
  image: t.text("image"),
  maxSessions: t.int("max_sessions").notNull().default(1),
  twoFactorEnabled: t.boolean("two_factor_enabled").notNull().default(false), // Logically default to true when user account is created

  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}));

export const userSelectSchema = createSelectSchema(users);

export const sessions = createTable("sessions", (t) => ({
  id: t.varchar("id", { length: 36 }).primaryKey(),
  expiresAt: t.timestamp("expires_at").notNull(),
  token: t.varchar("token", { length: 255 }).notNull().unique(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  userId: t
    .varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}));

export const accounts = createTable("accounts", (t) => ({
  id: t.varchar("id", { length: 36 }).primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t
    .varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  idToken: t.text("id_token"),
  accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
  scope: t.text("scope"),
  password: t.text("password"),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}));

export const verifications = createTable("verifications", (t) => ({
  id: t.varchar("id", { length: 36 }).primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
}));

export const rateLimits = createTable("rate_limits", (t) => ({
  id: t.varchar("id", { length: 36 }).primaryKey(),
  key: t.text("key"),
  count: t.int("count"),
  lastRequest: t.bigint("last_request", { mode: "number" }),
}));

export const twoFactors = createTable("two_factors", (t) => ({
  id: t.varchar("id", { length: 36 }).primaryKey(),
  secret: t.text("secret").notNull(),
  backupCodes: t.text("backup_codes").notNull(),
  userId: t
    .varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
}));
