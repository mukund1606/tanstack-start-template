import { createEnv } from "@t3-oss/env-core";
import { type } from "arktype";

export const serverEnv = createEnv({
  server: {
    NODE_ENV: type("'development' | 'production' | 'test'"),
    DATABASE_URL: type("string.url > 1"),
  },
  runtimeEnv: process.env,
});
