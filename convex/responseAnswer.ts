import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";

export const getAnswerByResponseId = query({
  args: {
    responseId: v.id("responses"),
    formFieldId: v.id("formFields"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);
    const { responseId, formFieldId } = args;

    if (!responseId) return undefined;
    if (!formFieldId) throw new CustomError(errorList["badRequest"]);

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

    if (!identity) throw new CustomError(errorList["unauthorized"]);

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

    if (!identity) throw new CustomError(errorList["unauthorized"]);

    if (!formFieldId) throw new CustomError(errorList["badRequest"]);

    if (!responseId) throw new CustomError(errorList["badRequest"]);

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
