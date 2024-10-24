import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    formId: v.id("forms"),
    order: v.number(),
    label: v.optional(v.string()),
    required: v.optional(v.boolean()),
    type: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    options: v.optional(v.any())
    // options: v.optional(v.array(v.string())),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { formId, order, label, required, type, imageUrl, options } = args;

    if (!formId) throw new Error("Form is is required");

    const question = await ctx.db.insert("formFields", {
      label: label || "Question",
      formId: formId,
      required: required || false,
      order: order,
      type: type || "1",
      imageUrl: imageUrl
    });

    const formFieldId = question;

    if (!formFieldId) throw new Error("Formfield id is required");

    if(options.length){
      for(const option of options){
        await ctx.db.insert("options", {
          formFieldId,
          optionText: option.optionText,
        });
      }
    }
    return question;
  },
});

export const remove = mutation({
  args: { id: v.id("formFields") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
    const options = await ctx.db
      .query("options")
      .withIndex("by_formFieldId", (q) => q.eq("formFieldId", args.id))
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
    id: v.id("formFields"),
    label: v.optional(v.string()),
    required: v.optional(v.boolean()),
    imageUrl: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { id, ...rest } = args;

    if (!identity) throw new Error("Unauthorized");

    const existingFormField = await ctx.db.get(args.id);

    if (!existingFormField) throw new Error("Formfield doesn't exist");

    const formField = await ctx.db.patch(args.id, {
      ...rest,
    });

    return formField;
  },
});
