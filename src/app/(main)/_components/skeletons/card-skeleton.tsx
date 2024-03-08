import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="shadow-md relative">
      <CardHeader className="w-full flex justify-center text-center">
        {/* <CardTitle>{quote.character}</CardTitle> */}
        <Skeleton className="w-[190px] h-[15px] rounded-sm mx-auto" />
      </CardHeader>
      <CardContent className=" flex items-center justify-center ">
        <div className="h-[220px] w-full flex justify-center">
          <Skeleton className="w-2/3 h-[220px] rounded-slg" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col  justify-center items-center mb-5">
        <p className="text-slate-600 justify-center items-center w-full text-center flex flex-col gap-3  max-h-11 mb-9">
          <Skeleton className="w-full h-[15px] rounded-sm" />
          <Skeleton className="w-2/3  h-[15px] rounded-sm" />
        </p>
        <div className="flex gap-2 absolute  items-center bottom-5 mt-4 left-[11%] p3-3">
          <Skeleton className="w-[70px] h-[35px] rounded-sm" />

          <Skeleton className="w-[70px] h-[35px] rounded-sm" />
          <Skeleton className="w-[70px] h-[35px] rounded-sm" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
