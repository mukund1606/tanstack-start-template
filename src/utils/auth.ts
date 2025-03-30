import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor, username } from "better-auth/plugins";

import {
  accounts,
  rateLimits,
  sessions,
  twoFactors,
  users,
  verifications,
  type userSelectSchema,
} from "~/db/schema";
import { db } from "~/db";

import { usernameForgetPassword } from "./auth/username-forget-password";

type User = typeof userSelectSchema.infer;

export const auth = betterAuth({
  appName: "Tanstack Start",
  trustedOrigins: ["http://192.168.29.4:3000", "http://localhost:3000"],
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: {
      users,
      accounts,
      sessions,
      verifications,
      rateLimits,
      twoFactors,
    },
    usePlural: true,
  }),
  plugins: [
    username({
      minUsernameLength: 5,
    }),
    usernameForgetPassword<User>({
      expiresIn: 60 * 15,
      sendResetPassword: async ({ url }) => {
        console.log(url);
      },
    }),
    twoFactor({
      skipVerificationOnEnable: true,
      totpOptions: {
        disable: true,
      },
      otpOptions: {
        digits: 6,
        period: 15,
        async sendOTP({ otp }) {
          console.log(otp);
        },
      },
    }),
  ],
  rateLimit: {
    enabled: true,
    storage: "database",
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
      },
      maxSessions: {
        type: "number",
        required: true,
      },
    },
  },
});
