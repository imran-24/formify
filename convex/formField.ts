import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    formId: v.id("forms"),
    order: v.number(),
    // options: v.optional(v.array(v.string())),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { formId, order } = args;

    if (!formId) throw new Error("Form is is required");

    const question = await ctx.db.insert("formFields", {
      label: "Question",
      formId: formId,
      required: false,
      order: order,
    });
    return question;
  },
});


export const remove = mutation({
  args: { id: v.id("formFields") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});