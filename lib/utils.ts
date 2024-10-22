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
  { label: "File Upload", value: '5' },
];
