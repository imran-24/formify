import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type FormImageStore = {
  url?: string;
  id?: Id<"formFields">;
  isOpen: boolean;
  onOpen: (id: Id<"formFields">) => void;
  onClose: () => void;
  onReplace: (url: string, id: Id<"formFields">) => void;
};

export const useFormImage = create<FormImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  id: undefined,
  onOpen: (id) => set({ isOpen: true, url: undefined, id: id }),
  onClose: () => set({ isOpen: false, url: undefined, id: undefined }),
  onReplace: (url, id) => set({ isOpen: true, url, id })
}));