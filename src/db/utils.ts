import { mysqlTableCreator } from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator(
  (name) => `tanstack_start_${name}`,
);
