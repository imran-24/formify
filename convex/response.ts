import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    formId: v.id("forms"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { formId } = args;

    if (!formId) throw new Error("Form is is required");

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

export const getById = query({
  args: {
    formId: v.id("forms"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { formId, userId } = args;

    if (!formId) throw new Error("Form is is required");

    if (identity.subject == userId) throw new Error("Unauthorized");

    const response = await ctx.db
      .query("responses")
      .withIndex("by_form_and_user", (q) =>
        q
          .eq("formId", args.formId)
          .eq("userId", args.userId)
      )
      .unique();

    if (!response) {
      return null;
    }

    // if (form.isPublished) {
    //   return form;
    // }

    // if (!identity) throw new Error("Not authenticated");

    // const userId = identity.subject;

    // if (form.authorId !== userId) {
    //   throw new Error("Unauthorized");
    // }

    return response;
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
  args: { responseId: v.id("responses")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { responseId } = args;

    if (!responseId) throw new Error("Response Id is required");

    const existingResponse = await ctx.db.get(responseId);

    if(existingResponse?.status === "draft"){
       const response = await ctx.db.patch(existingResponse._id, {
         status: "submited",
       });

       return response;
    }
   
  },
});
