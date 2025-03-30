import type { usernameForgetPassword } from "./username-forget-password";

export const usernameForgetPasswordClient = () => {
  return {
    id: "username-forget-password",
    $InferServerPlugin: {} as ReturnType<typeof usernameForgetPassword>,
  };
};
