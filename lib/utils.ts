import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const questionType = [
  { label: "Short Answer", value: '1' },
  { label: "Paragraph", value: '2' },
  { label: "Checkboxes", value: '3' },
  { label: "Multiple Choice", value: '4' },
];

export class CustomError extends Error {
  status: number;
  description: string;

  constructor({
    message,
    status,
    description,
  }: {
    message: string;
    status: number;
    description: string;
  }) {
    super(message);
    this.status = status;
    this.description = description;
    this.name = "CustomError"
  }
}




export const errorList = {
  unauthorized: {
    message: "Unauthorized access",
    status: 401,
    description:
      "The request requires user authentication. Please ensure you have the correct credentials.",
  },
  forbidden: {
    message: "Forbidden",
    status: 403,
    description:
      "You do not have permission to access this resource. Please contact your administrator.",
  },
  notFound: {
    message: "Not Found",
    status: 404,
    description:
      "The requested resource could not be found on the server. Check the URL or try searching again.",
  },
  internalServerError: {
    message: "Internal Server Error",
    status: 500,
    description:
      "An unexpected error occurred on the server. Please try again later.",
  },
  badRequest: {
    message: "Bad Request",
    status: 400,
    description:
      "The server could not understand the request due to invalid syntax. Please check your input and try again.",
  },
  serviceUnavailable: {
    message: "Service Unavailable",
    status: 503,
    description:
      "The server is currently unavailable due to maintenance or overload. Please try again later.",
  },
  gatewayTimeout: {
    message: "Gateway Timeout",
    status: 504,
    description:
      "The server took too long to respond. Please check your network connection and try again.",
  },
  conflict: {
    message: "Conflict",
    status: 409,
    description:
      "The request could not be completed due to a conflict with the current state of the resource.",
  },
  unsupportedMediaType: {
    message: "Unsupported Media Type",
    status: 415,
    description:
      "The media format of the requested data is not supported by the server.",
  },
  tooManyRequests: {
    message: "Too Many Requests",
    status: 429,
    description:
      "You have made too many requests in a short period of time. Please wait and try again.",
  },
};
