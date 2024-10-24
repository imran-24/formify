import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const existingFormField = await ctx.db.get(args.formId);

    if (!existingFormField) {
      throw new Error("Not found");
    }

    const userId = identity.subject;
    if (userId !== existingFormField.authorId) {
      throw new Error("You are Unauthorized");
    }
    const responses = await ctx.db
      .query("responses")
      .withIndex("by_user_form_status", (q) =>
        q
          .eq("formId", args.formId)
          .eq("userId", userId)
          .eq("status", "submitted")
      )
      .order("asc")
      .collect();
    return responses;
  },
});
