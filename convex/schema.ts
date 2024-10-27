import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  forms: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()), // Determines if the form is publicly accessible
    isPublished: v.optional(v.boolean()), // Determines if the form is publicly accessible
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
    formId: v.id("forms"), // Reference to the associated form's id
    label: v.string(), // The question or prompt for the field
    required: v.boolean(), // Indicates if the field is mandatory
    order: v.number(), // Position of the field within the form
    type: v.string(),
    imageUrl: v.optional(v.string()),
    // options: v.optional(v.array(v.string())),
  })
    .index("by_formId", ["formId"])
    .searchIndex("search_label", {
      searchField: "label",
      filterFields: ["formId"],
    }),

  responses: defineTable({
    formId: v.id("forms"), // The ID of the form being responded to
    userId: v.string(), // The ID of the user filling out the form
    status: v.string(), // 'draft' or 'submitted'
    submittedAt: v.optional(v.string()), // Timestamp when the form was submitted, null if draft
  })
    .index("by_form_and_user", ["formId", "userId"])
    .index("by_form_status", ["formId", "status"])

    .index("by_status", ["status"]),

  // ResponseAnswers Table
  responseAnswers: defineTable({
    responseId: v.id("responses"), // Reference to the associated response's id
    formFieldId: v.id("formFields"), // Reference to the associated form field's id
    answer: v.optional(v.string()), // The respondent's answer
    optionIds: v.optional(v.array(v.string())), // Array of option IDs (for checkboxes) or a single option ID (for multiple choice)
  })
    .index("by_responseId", ["responseId"])
    .index("by_formFieldId", ["formFieldId"])
    .index("by_formFieldId_responseId", ["responseId", "formFieldId"])

    .searchIndex("search_answer", {
      searchField: "answer",
      filterFields: ["responseId", "formFieldId"],
    }),
  options: defineTable({
    formFieldId: v.string(), // Reference to the form field (question)
    optionText: v.optional(v.string()), // The option text
  }).index("by_formFieldId", ["formFieldId"]),
});
