import {
  inferAdditionalFields,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "~/utils/auth";

import { usernameForgetPasswordClient } from "./auth/username-forget-password-client";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    usernameForgetPasswordClient(),
    twoFactorClient(),
  ],
});
