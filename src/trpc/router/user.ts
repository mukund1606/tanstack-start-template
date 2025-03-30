import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "~/trpc/init";

export const userRouter: TRPCRouterRecord = {
  getAll: protectedProcedure.query(
    async ({ ctx }) => await ctx.db.query.users.findMany(),
  ),
};
