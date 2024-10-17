import { create } from "zustand";

const defaultValue = {
    id: "",
    title: ""
}

interface RenameFormProps {
  isOpen: boolean;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
  defaultValue: typeof defaultValue;
}

export const useRenameForm = create<RenameFormProps>((set) => ({
  isOpen: false,
  defaultValue: defaultValue,
  onOpen: (id: string, title: string) =>
    set(() => ({
      isOpen: true,
      defaultValue: {
        id,
        title,
      },
    })),
  onClose: () => set({ isOpen: false, defaultValue: defaultValue }),
}));
