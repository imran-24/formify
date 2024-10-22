import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getAnswersByResponseId = query({
  args: {
    responseId: v.id("responses"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { responseId } = args;

    if (!responseId) throw new Error("response id is required");

    const responseAnswers = await ctx.db
      .query("responseAnswers")
      .withIndex("by_responseId", (q) => q.eq("responseId", args.responseId))
      .collect();

    if (!responseAnswers) {
      return [];
    }
    return responseAnswers;
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

export const saveAnswer = mutation({
  args: {
    responseId: v.id("responses"),
    formFieldId: v.id("formFields"),
    answer: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { responseId, formFieldId, answer } = args;

    if (!identity) throw new Error("Unauthorized");

    if (!formFieldId) throw new Error("Form field id is required");

    if (!responseId) throw new Error("Response id is required");

    const existingAnswer = await ctx.db
      .query("responseAnswers")
      .withIndex("by_formFieldId_responseId", (q) =>
        q.eq("responseId", responseId).eq("formFieldId", formFieldId)
      )
      .unique();

    if (existingAnswer) {
      await ctx.db.patch(existingAnswer._id, {
        answer,
      });
    } else {
      await ctx.db.insert("responseAnswers", {
        formFieldId,
        responseId,
        answer,
      });
    }
  },
});
