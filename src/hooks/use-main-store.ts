import { SimpsonQuote } from "@/schemas/quotes-schemas";
import { create } from "zustand";

type Store = {
  currentQuotes: SimpsonQuote[];
  setecurrentQuotes: (newQuotes: SimpsonQuote[]) => void;

  // confetti
  isOpenConfetti: boolean;
  onOpenConfetti: () => void;
  onCloseConfetti: () => void;
};

export const useMainStore = create<Store>((set) => ({
  currentQuotes: [],
  setecurrentQuotes: (newQuotes) =>
    set((state) => ({
      currentQuotes: newQuotes,
    })),

  isOpenConfetti: false,
  onOpenConfetti: () => set({ isOpenConfetti: true }),
  onCloseConfetti: () => set({ isOpenConfetti: false }),
}));
