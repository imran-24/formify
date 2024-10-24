import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const formFields = await ctx.db
      .query("formFields")
      .withIndex("by_formId", (q) => q.eq("formId", args.formId))
      .order("asc")
      .collect();
    return formFields;
  },
});