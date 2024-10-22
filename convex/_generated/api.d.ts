/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as form from "../form.js";
import type * as formField from "../formField.js";
import type * as formFields from "../formFields.js";
import type * as forms from "../forms.js";
import type * as response from "../response.js";
import type * as responseAnswer from "../responseAnswer.js";
import type * as responseAnswers from "../responseAnswers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  form: typeof form;
  formField: typeof formField;
  formFields: typeof formFields;
  forms: typeof forms;
  response: typeof response;
  responseAnswer: typeof responseAnswer;
  responseAnswers: typeof responseAnswers;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
