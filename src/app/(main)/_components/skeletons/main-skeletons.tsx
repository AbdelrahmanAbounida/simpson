import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import CardSkeleton from "./card-skeleton";

const MainSkeleton = () => {
  const quotes = Array.from({ length: Math.ceil(16) }, (_, index) => index);
  return (
    <div className="w-full flex-col gap-9 mt-10 flex justify-center items-center p-5">
      <div className="flex gap-12 mx-auto text-center justify-around w-full">
        <Skeleton className="w-1/4 h-[35px]" />
        <Skeleton className="w-1/4 h-[35px]" />
        <Skeleton className="w-1/4 h-[35px]" />
      </div>

      <div className="w-full  gap-2  ">
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
          {quotes.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSkeleton;
