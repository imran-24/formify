import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAnswerByResponseId = query({
  args: {
    responseId: v.optional(v.id("responses")),
    formFieldId: v.id("formFields"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const { responseId, formFieldId } = args;

    if (!responseId) return undefined;
    if (!formFieldId) throw new Error("Form field id is required");

    const responseAnswer = await ctx.db
      .query("responseAnswers")
      .withIndex("by_formFieldId_responseId", (q) =>
        q.eq("responseId", args.responseId!).eq("formFieldId", args.formFieldId)
      )
      .unique();

    return responseAnswer;
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
    optionIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const { responseId, formFieldId, answer, optionIds } = args;

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
        optionIds
      });
    } else {
      await ctx.db.insert("responseAnswers", {
        formFieldId,
        responseId,
        answer,
        optionIds
      });
    }
  },
});
