// import { v } from "convex/values";
// import { query } from "./_generated/server";

// export const get = query({
//   args: {
//     formId: v.id("forms"),
//     userId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Unauthorized");

//     const responses = await ctx.db
//       .query("responses")
//       .withIndex("by_userId_formId", (q) =>
//         q.eq("userId", args.userId).eq("formId", args.formId)
//       )
//       .order("asc")
//       .collect();
//     return responses;
//   },
// });
