import { v } from "convex/values";
import { query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

export const get = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);

    const existingFormField = await ctx.db.get(args.formId);

    if (!existingFormField) {
      throw new CustomError(errorList["notFound"]);
    }

    const userId = identity.subject;
    if (userId !== existingFormField.authorId) {
      throw new CustomError(errorList["forbidden"]);
    }
    const responses = await ctx.db
      .query("responses")
      .withIndex("by_form_status", (q) =>
        q
          .eq("formId", args.formId)
          .eq("status", "submitted")
      )
      .order("asc")
      .collect();
    return responses;
  },
});
