"use client";
import {
  getCurrentUserFavouritesShares,
  updateUserFavourites,
} from "@/actions/simpsons";
import Spinner from "@/app/(auth)/_components/spinner";
import { Button } from "@/components/ui/button";
import { SimpsonFavouriteQuote } from "@prisma/client";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { IoShareSocialOutline } from "react-icons/io5";
import FavouriteSkeletons from "../../_components/skeletons/favourite-skeletons";

const Favourites = () => {
  const [userFavourites, setuserFavourites] =
    useState<SimpsonFavouriteQuote[]>();
  const [pending, startTransition] = useTransition();

  const [removeLoading, setremoveLoading] = useState(false);

  const getuserFavourites = async () => {
    startTransition(() => {
      getCurrentUserFavouritesShares({ infoType: "favourites" }).then(
        (resp) => {
          if (resp.success) {
            setuserFavourites(resp.success);
          }
          if (resp.error) {
            toast.error(resp.error);
          }
        }
      );
    });
  };

  const removeFavourite = async (quote: SimpsonFavouriteQuote) => {
    try {
      setremoveLoading(true);
      await updateUserFavourites({ quote, updateType: "remove" });
    } catch (error) {
      console.log({ error });
      return;
    } finally {
      setremoveLoading(false);
    }
  };

  useEffect(() => {
    getuserFavourites();
  }, [removeLoading]);
  return pending ? (
    <FavouriteSkeletons />
  ) : (
    <div className="w-full ">
      <h1 className="text-[32px] font-bold mt-9 ml-9">Favourite Quotes</h1>

      <div className="flex-col gap-9 mt-10 flex justify-center items-center p-5 ">
        {userFavourites && userFavourites?.length > 0 ? (
          userFavourites.map((quote, index) => (
            <div
              key={index}
              className="flex  justify-between w-full border rounded-lg p-3 shadow-sm relative"
            >
              <div className="flex flex-col gap-2 ">
                <p className="font-semibold">{quote.character}</p>

                <p className="max-w-xl text-sm text-slate-600">{quote.quote}</p>

                <div className="flex gap-3 absolute left-5 bottom-5">
                  {removeLoading ? (
                    <Button
                      variant={"destructive"}
                      disabled={removeLoading}
                      className="max-w-[130px] border-none"
                      type="submit"
                    >
                      <Spinner className="mr-2 h-4 w-4 animate-spin" />
                      Remove
                    </Button>
                  ) : (
                    <Button
                      className="max-w-[130px] border-none "
                      variant={"destructive"}
                      onClick={() => removeFavourite(quote)}
                    >
                      remove
                    </Button>
                  )}

                  {/* <Button
                    className="max-w-[120px] border-none bg-[#F0F2F5]"
                    variant={"outline"}
                  >
                    Share <IoShareSocialOutline className="w-4 h-4 ml-3" />
                  </Button> */}
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
          // <div className="">{"You don't have any favourite quote"}</div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
