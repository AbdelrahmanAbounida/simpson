"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SharesSkeletons = () => {
  const userShares = [1, 2, 3, 4, 5];
  return (
    <div className="w-full ">
      <Skeleton className="w-[230px] h-[20px] text-[32px] font-bold mt-9 ml-9" />

      <div className="flex-col gap-9 mt-10 flex justify-center items-center p-5 ">
        {userShares && userShares?.length > 0 ? (
          userShares.map((_, index) => (
            <div
              key={index}
              className="flex  justify-between w-full border rounded-lg p-3 shadow-sm relative"
            >
              <div className="flex flex-col gap-2 ">
                <Skeleton className="w-[130px] h-[15px] rounded-full" />

                <div className="mt-1 flex flex-col gap-1">
                  <Skeleton className="w-[350px] h-[15px] rounded-full" />
                  <Skeleton className="w-[200px] h-[15px] rounded-full" />
                </div>

                <div className="flex gap-3 absolute left-5 bottom-5">
                  <Skeleton className="w-[140px] h-[35px] rounded-sm" />
                </div>
              </div>

              <div className=" rounded-md w-[304px] ">
                <Skeleton className="h-[145px] w-[304px] rounded-xl" />
              </div>
            </div>
          ))
        ) : (
          <div className="">{"You don't have any favourite quote"}</div>
        )}
      </div>
    </div>
  );
};

export default SharesSkeletons;
