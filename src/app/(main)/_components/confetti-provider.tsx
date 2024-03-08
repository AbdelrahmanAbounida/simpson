"use client";

import ReactConfetti from "react-confetti";

import { useMainStore } from "@/hooks/use-main-store";

export const ConfettiProvider = () => {
  const store = useMainStore();

  if (!store.isOpenConfetti) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        store.onCloseConfetti();
      }}
    />
  );
};
