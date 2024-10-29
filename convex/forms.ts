import { v } from "convex/values";
import { query } from "./_generated/server";
import { CustomError, errorList } from "../lib/utils";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    authorId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);

    if (args.favorites) {
      const favoriteForms = await ctx.db
        .query("userFavorites")
        .withIndex("by_user", (q) => q.eq("authorId", identity.subject))
        .order("desc")
        .collect();
      const ids = favoriteForms.map((b) => b.formId);
      const forms = await getAllOrThrow(ctx.db, ids);

      return forms.map((form) => ({
        ...form,
        isFavorite: true,
      }));
    }
    const title = args.search as string;
    let forms = [];
    if (title) {
      forms = await ctx.db
        .query("forms")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("authorId", args.authorId)
        )
        .collect();
    } else {
      forms = await ctx.db
        .query("forms")
        .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
        .order("desc")
        .collect();
    }

    const formsWithFavoriteRelation = forms.map((form) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_form", (q) =>
          q.eq("formId", form._id).eq("authorId", form.authorId)
        )
        .unique()
        .then((favorite) => {
          return {
            ...form,
            isFavorite: !!favorite,
          };
        });
    });
    const formsWithFavoriteBoolean = Promise.all(formsWithFavoriteRelation);
    return formsWithFavoriteBoolean;
  },
});

export const getAll = query({
  args: {
    authorId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new CustomError(errorList["unauthorized"]);

    if (args.favorites) {
      const favoriteForms = await ctx.db
        .query("userFavorites")
        .withIndex("by_user", (q) => q.eq("authorId", identity.subject))
        .order("desc")
        .collect();
      const ids = favoriteForms.map((b) => b.formId);
      const forms = await getAllOrThrow(ctx.db, ids);

      return forms.map((form) => ({
        ...form,
        isFavorite: true,
      }));
    }
    const title = args.search as string;
    let forms = [];
    if (title) {
      forms = await ctx.db
        .query("forms")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title)
          // .eq("authorId", args.authorId)
        )
        .collect();
    } else {
      forms = await ctx.db
        .query("forms")
        // .withIndex("by_authorId", (q) => q.eq("authorId", args.authorId))
        .order("desc")
        .collect();
    }

    const formsWithFavoriteRelation = forms.map((form) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_form", (q) =>
          q.eq("formId", form._id).eq("authorId", form.authorId)
        )
        .unique()
        .then((favorite) => {
          return {
            ...form,
            isFavorite: !!favorite,
          };
        });
    });
    const formsWithFavoriteBoolean = Promise.all(formsWithFavoriteRelation);
    return formsWithFavoriteBoolean;
  },
});
