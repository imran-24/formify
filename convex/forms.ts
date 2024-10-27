import { v } from "convex/values";
import { query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

export const get = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);

    const forms = await ctx.db
      .query("forms")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();
    return forms;
  },
});
