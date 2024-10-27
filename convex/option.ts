import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

export const create = mutation({
  args: {
    formFieldId: v.id("formFields"),
    optionText: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);
    const { formFieldId, optionText } = args;

    if (!formFieldId) throw new CustomError(errorList["badRequest"]);

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

    if (!identity) throw new CustomError(errorList["unauthorized"]);

    await ctx.db.delete(args.id);
  },
});

export const removeMany = mutation({
  args: { fromFieldId: v.id("formFields") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new CustomError(errorList["unauthorized"]);

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
      throw new CustomError(errorList["unauthorized"]);
    }
    const existingFormField = await ctx.db.get(args.id);

    if (!existingFormField) {
      throw new CustomError(errorList["notFound"]);
    }

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

    if (!identity) throw new CustomError(errorList["unauthorized"]);

    const ExistingOption = await ctx.db.get(id);

    if (!ExistingOption) throw new CustomError(errorList["notFound"]);

    const option = await ctx.db.patch(id, {
      optionText,
    });

    return option;
  },
});
