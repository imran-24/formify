import { v } from "convex/values";
import { query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

export const get = query({
  args: {
    formFieldId: v.id("formFields"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);

    const options = await ctx.db
      .query("options")
      .withIndex("by_formFieldId", (q) => q.eq("formFieldId", args.formFieldId))
      .order("asc")
      .collect();
      console.log(options);
    return options;
  },
});
