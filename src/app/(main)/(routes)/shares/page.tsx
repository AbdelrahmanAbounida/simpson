"use client";
import {
  getCurrentUserFavouritesShares,
  updateUserShares,
} from "@/actions/simpsons";
import { Button } from "@/components/ui/button";
import { SimpsonFavouriteQuote, SimpsonShareQuote } from "@prisma/client";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import SharesSkeletons from "../../_components/skeletons/shares-skeletons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Shares = () => {
  const [userShares, setuserShares] = useState<SimpsonShareQuote[]>();
  const [pending, startTransition] = useTransition();
  const [removeLoading, setremoveLoading] = useState(false);

  const router = useRouter();

  const getUserShares = async () => {
    startTransition(() => {
      getCurrentUserFavouritesShares({ infoType: "shares" }).then((resp) => {
        if (resp.success) {
          setuserShares(resp.success);
        }
        if (resp.error) {
          toast.error(resp.error);
        }
      });
    });
  };

  const removeShare = async (quote: SimpsonFavouriteQuote) => {
    try {
      setremoveLoading(true);
      await updateUserShares({ quote, updateType: "remove" });
    } catch (error) {
      console.log({ error });
      return;
    } finally {
      setremoveLoading(false);
    }
  };

  useEffect(() => {
    getUserShares();
  }, [removeLoading]);

  return pending ? (
    <SharesSkeletons />
  ) : (
    <div className="w-full ">
      <h1 className="text-[32px] font-bold mt-9 ml-9">Public Quotes</h1>
      <h3 className="text-slate-500 text-sm ml-9">
        List of quotes you share with others
      </h3>

      <div className="flex-col gap-9 mt-10 flex justify-center items-center p-5 ">
        {userShares && userShares?.length > 0 ? (
          userShares.map((quote, index) => (
            <div
              key={index}
              className="flex  justify-between w-full border rounded-lg p-3 shadow-sm relative"
            >
              <div className="flex flex-col gap-2 ">
                <p className="font-semibold">{quote.character}</p>

                <p className="max-w-xl text-sm text-slate-600">{quote.quote}</p>

                <div className="flex gap-3 absolute left-5 bottom-5">
                  <Button
                    className="max-w-[130px] border-none "
                    variant={"destructive"}
                    onClick={() => {
                      removeShare(quote);
                    }}
                  >
                    unshare
                  </Button>

                  <Button
                    className="w-[110px] border-none "
                    variant={"secondary"}
                    // onClick={() => {
                    // }}
                  >
                    <Link href={`/shares/${quote.shareId}`} target="_blank">
                      View
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="border rounded-md w-[304px] bg-gray-100">
                <img
                  src={quote.image}
                  alt="quote character"
                  className="object-contain h-48 w-96 ..."
                />
              </div>

              {/* <div className="border rounded-md w-[304px] h-[171px] flex justify-center items-center">
                <img
                  src={quote.image}
                  alt="quote character"
                  className="object-cover h-30 w-32"
                />
              </div> */}
            </div>
          ))
        ) : (
          <p></p>
          // <div className="">{"You don't have any Public quote"}</div>
        )}
      </div>
    </div>
  );
};

export default Shares;
