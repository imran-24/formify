import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    formId: v.id("forms"),
    order: v.number(),
    label: v.optional(v.string()),
    required: v.optional(v.boolean()),
    type: v.optional(v.string())

    // options: v.optional(v.array(v.string())),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { formId, order, label, required, type } = args;

    if (!formId) throw new Error("Form is is required");

    const question = await ctx.db.insert("formFields", {
      label: label || "Question",
      formId: formId,
      required: required || false,
      order: order,
      type: type || "1"
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

export const update = mutation({
  args: {
    id: v.id("formFields"),
    label: v.optional(v.string()),
    required: v.optional(v.boolean()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const {label, id, required, type} = args;

    if (!identity) throw new Error("Unauthorized");

    const existingFormField = await ctx.db.get(args.id);

    if (!existingFormField) throw new Error("Formfield doesn't exist");

    
    const formField = await ctx.db.patch(args.id, {
      label: label || existingFormField.label,
      required: required || existingFormField.required,
      type: type || existingFormField.type
    });

    return formField;
  },
});