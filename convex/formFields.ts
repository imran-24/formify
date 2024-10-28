import { v } from "convex/values";
import { query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

// much needed
export const get = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);
    const form = await ctx.db.get(args.formId);

    if (!form) return null;

    const formFields = await ctx.db
      .query("formFields")
      .withIndex("by_formId", (q) => q.eq("formId", args.formId))
      .order("asc")
      .collect();

    if(!formFields.length) return []; 

    const formFieldsWithOptions = formFields.map((formField) => {
      return ctx.db
        .query("options")
        .withIndex("by_formFieldId", (q) => q.eq("formFieldId", formField._id))
        .collect()
        .then((options) => {
          return {
            ...formField,
            options: options || undefined,
          };
        });
    });

    const formsWithOptionsBoolean = Promise.all(formFieldsWithOptions);
    return formsWithOptionsBoolean;
  },
});

export const getQuestionOnly = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);
    const form = await ctx.db.get(args.formId);

    if (!form) throw new CustomError(errorList["notFound"]);

    const formFields = await ctx.db
      .query("formFields")
      .withIndex("by_formId", (q) => q.eq("formId", args.formId))
      .order("asc")
      .collect();

    return formFields;
  },
});