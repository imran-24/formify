import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

export const create = mutation({
  args: {
    formId: v.id("forms"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);
    const { formId } = args;

    if (!formId) throw new CustomError(errorList["badRequest"]);

    const existingResponse = await ctx.db
      .query("responses")
      .withIndex("by_form_and_user", (q) =>
        q
          .eq("formId", args.formId)
          .eq("userId", identity.subject)
          // .eq("status", "draft")
      )
      .unique();

    if (existingResponse) {
      return {id: existingResponse._id,
        status: existingResponse.status
      };
    } else {
      const response = await ctx.db.insert("responses", {
        formId,
        userId: identity.subject,
        status: "draft",
      });
      return {id: response};
    }
  },
});



export const get = query({
  args: {
    responseId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);

    return await ctx.db.get(args.responseId);
  },
});

export const remove = mutation({
  args: { id: v.id("formFields") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new CustomError(errorList["unauthorized"]);

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { responseId: v.id("responses")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);
    const { responseId } = args;

    if (!responseId) throw new CustomError(errorList["badRequest"]);

    const existingResponse = await ctx.db.get(responseId);

    if(existingResponse?.status === "draft"){
       const response = await ctx.db.patch(existingResponse._id, {
         status: "submitted",
       });

       return response;
    }
   
  },
});
