import { prismadb } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface ShareViewerParams {
  params: {
    shareId: string;
  };
}

const ShareViewer = async ({ params: { shareId } }: ShareViewerParams) => {
  const currentQuote = await prismadb.simpsonShareQuote.findFirst({
    where: {
      shareId: shareId,
    },
  });

  if (!currentQuote) {
    return redirect("/");
  }
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 mt-9 pt-12">
      <h1 className="text-3xl font-bold">{currentQuote.character}</h1>
      <Image
        src={currentQuote.image}
        alt="Quote image"
        width={300}
        height={200}
      />
      <p className="text-xl text-slate-600 max-w-[900px]">
        {currentQuote.quote}
      </p>
    </div>
  );
};

export default ShareViewer;
