import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    formFieldId: v.id("formFields"),
    optionText: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { formFieldId, optionText } = args;

    if (!formFieldId) throw new Error("Formfield id is required");

    const option = await ctx.db.insert("options", {
      formFieldId,
      optionText,
    });
    return option;
  },
});

export const remove = mutation({
  args: { id: v.id("options") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});

export const removeMany = mutation({
  args: { fromFieldId: v.id("formFields") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const options = await ctx.db
      .query("options")
      .withIndex("by_formFieldId", (q) => q.eq("formFieldId", args.fromFieldId))
      .collect();
    if (options.length) {
      for (const option of options) {
        await ctx.db.delete(option._id);
      }
    }
  },
});

export const removeImage = mutation({
  args: { id: v.id("formFields") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const existingFormField = await ctx.db.get(args.id);

    if (!existingFormField) {
      throw new Error("Not found");
    }

    // if (existingDocument. !== userId) {
    //   throw new Error("Unauthorized");
    // }

    const formField = await ctx.db.patch(args.id, {
      imageUrl: undefined,
    });

    return formField;
  },
});

export const update = mutation({
  args: {
    id: v.id("options"),
    optionText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { id, optionText } = args;

    if (!identity) throw new Error("Unauthorized");

    const ExistingOption = await ctx.db.get(id);

    if (!ExistingOption) throw new Error("Option doesn't exist");

    const option = await ctx.db.patch(id, {
      optionText,
    });

    return option;
  },
});
