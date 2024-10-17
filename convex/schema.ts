import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  forms: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()), // Determines if the form is publicly accessible
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_authorId", ["authorId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["authorId"],
    }),

  formFields: defineTable({
    formId: v.string(), // Reference to the associated form's id
    label: v.string(), // The question or prompt for the field
    required: v.boolean(), // Indicates if the field is mandatory
    order: v.number(), // Position of the field within the form
    // options: v.optional(v.array(v.string())),
  })
    .index("by_formId", ["formId"])
    .searchIndex("search_label", {
      searchField: "label",
      filterFields: ["formId"],
    }),
});
