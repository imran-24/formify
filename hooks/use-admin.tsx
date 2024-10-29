import { create } from "zustand";

type AdminStore = {
  id?: string;
  isAdmin: boolean;
  setAdmin: (id: string) => void;
  clear: () => void;
};

export const useAdmin = create<AdminStore>((set) => ({
  id: undefined,
  isAdmin: false,
  setAdmin: (id) => set({ isAdmin: true, id }),
  clear: () => set({ isAdmin: false }),
}));

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type AdminStore = {
//   id?: string;
//   isAdmin: boolean;
//   setAdmin: (id: string) => void;
//   clear: () => void;
// };

// export const useAdmin = create<AdminStore>()(
//   persist(
//     (set) => ({
//       id: undefined,
//       isAdmin: false,
//       setAdmin: (id) => set({ isAdmin: true, id }),
//       clear: () => set({ isAdmin: false, id: undefined }),
//     }),
//     {
//       name: "admin-storage", // Storage key
//     }
//   )
// );