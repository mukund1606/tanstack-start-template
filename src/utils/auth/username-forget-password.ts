import { type } from "arktype";
import { generateId, type User } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";

type UsernameForgetPasswordOptions<T extends User> = {
  /**
   * The time to live of the token in seconds.
   *
   * @default 60 * 15  (15 minutes)
   */
  expiresIn?: number;
  /**
   * The function to send a password reset email to the user.
   */
  sendResetPassword: (
    data: {
      user: T;
      url: string;
      token: string;
    },
    request?: Request,
  ) => Promise<void>;
};

const bodySchema = type({
  username: "string",
  "redirectTo?": "string",
});

export const usernameForgetPassword = <T extends User>(
  options: UsernameForgetPasswordOptions<T>,
) => {
  return {
    id: "username-forget-password",
    endpoints: {
      usernameForgetPassword: createAuthEndpoint(
        "/username-forget-password",
        {
          method: "POST",
          body: bodySchema,
          metadata: {
            openapi: {
              description: "Send a password reset email to the user",
              responses: {
                "200": {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        async (ctx) => {
          const username = ctx.body.username;
          const userModel = ctx.context.options.user?.modelName ?? "user";
          const user: T | null = await ctx.context.adapter.findOne({
            model: userModel,
            where: [
              {
                field: "username",
                value: username,
                operator: "eq",
              },
            ],
          });
          if (!user) {
            ctx.context.logger.error("Reset Password: User not found", {
              username,
            });
            return ctx.json({
              status: true,
            });
          }
          const defaultExpiresIn = 60 * 15;
          const expiresAt = new Date(
            Date.now() + (options?.expiresIn ?? defaultExpiresIn) * 1000,
          );
          const verificationToken = generateId(24);
          await ctx.context.internalAdapter.createVerificationValue({
            value: user.id.toString(),
            identifier: `reset-password:${verificationToken}`,
            expiresAt,
          });
          const redirectTo = ctx.body.redirectTo ?? "/";
          const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${redirectTo}`;
          await options?.sendResetPassword(
            {
              user,
              url,
              token: verificationToken,
            },
            ctx.request,
          );
          return ctx.json({
            status: true,
          });
        },
      ),
    },
  };
};
