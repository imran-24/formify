import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/placefolders/1.svg",
  "/placefolders/2.svg",
  "/placefolders/3.svg",
  "/placefolders/4.svg",
  "/placefolders/5.svg",
  "/placefolders/6.svg",
  "/placefolders/7.svg",
  "/placefolders/8.svg",
  "/placefolders/9.svg",
  "/placefolders/10.svg",
];

// Create a new task with the given text
export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const form = await ctx.db.insert("forms", {
      title: args.title,
      authorId: identity.subject,
      authorName: identity.name!,
      isPublic: false,
      imageUrl: randomImage,
    });
    return form;
  },
});

export const getById = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const form = await ctx.db.get(args.formId);

    if (!form) {
      throw new Error("Not found");
    }
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    if (form.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    return form;
  },
});

export const remove = mutation({
  args: { id: v.id("forms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("forms"), title: v.string(), descrition: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const title = args.title;
    const description = args.descrition;

    if (!identity) throw new Error("Unauthorized");

    if (!args.title) throw new Error("Title is required");

    if (title.length > 60)
      throw new Error("Title cannot be longer than 60 characters");

    const existingForm = await ctx.db.get(args.id);

    if (!existingForm) throw new Error("Form doesn't exist");

    const form = await ctx.db.patch(args.id, {
      title,
      description
    });

    return form;
  },
});
