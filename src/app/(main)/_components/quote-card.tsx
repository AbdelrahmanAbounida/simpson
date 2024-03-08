import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SimpsonQuote } from "@/schemas/quotes-schemas";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BsShare } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import {
  checkQuoteState,
  updateUserFavourites,
  updateUserShares,
} from "@/actions/simpsons";
import toast from "react-hot-toast";
import { HiShare } from "react-icons/hi";
import ViewModal from "./modals/view-modal";
import ShareModal from "./modals/share-modal";
import Spinner from "@/app/(auth)/_components/spinner";

const QuoteCard = ({ quote }: { quote: SimpsonQuote }) => {
  // quote states
  const [isfavouriteQuote, setisfavouriteQuote] = useState(false);
  const [isShareQuote, setisShareQuote] = useState(false);

  // update states in db
  const [favPending, setfavPending] = useState(false);
  const [sharePending, setsharePending] = useState(false);

  // check the quote state (favourite or shared)
  const checkState = async () => {
    const state = await checkQuoteState({ quote });

    if (state.error) {
      return;
    }
    setisfavouriteQuote(state.isFavourite as boolean);
    setisShareQuote(state.isShare as boolean);
  };

  // unshare quote
  const unshareItem = async () => {
    try {
      setsharePending(true);
      await updateUserShares({
        quote,
        updateType: "remove",
      });
      setisShareQuote(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setsharePending(false);
    }
  };

  // unfavourite quote
  const unfavouriteItem = async () => {
    try {
      setfavPending(true);
      await updateUserFavourites({
        quote,
        updateType: isfavouriteQuote ? "remove" : "add",
      });
      if (!isfavouriteQuote) {
        toast.success("Quote added to your favourites");
      }
      setisfavouriteQuote(!isfavouriteQuote);
    } catch (error) {
      console.log({ error });
    } finally {
      setfavPending(false);
    }
  };

  useEffect(() => {
    checkState();
  }, []);

  return (
    <Card className="shadow-md relative max-w-[350px] transform transition-all duration-100 ">
      <CardHeader className="w-full flex justify-center text-center">
        <CardTitle>{quote.character}</CardTitle>
      </CardHeader>
      <CardContent className=" flex items-center justify-center ">
        <div className="h-[220px]">
          <Image src={quote.image} width={110} height={100} alt="quote image" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center mb-5">
        <p className="text-slate-600 text-center flex overflow-hidden  max-h-11 mb-9">
          {quote.quote}...
        </p>
        <div className="flex gap-2 absolute bottom-5  left-[21%] p3-3">
          {favPending ? (
            <Button variant={"outline"} size={"icon"}>
              <Spinner className=" h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                unfavouriteItem();
              }}
              size={"icon"}
              variant={"outline"}
              className="flex justify-center"
            >
              {isfavouriteQuote ? (
                <FaHeart className="h-4 w-4 " fill="red" color="red" />
              ) : (
                <FaRegHeart className="h-4 w-4 " fill="red" color="red" />
              )}
            </Button>
          )}

          {sharePending ? (
            <Button variant={"outline"} size={"icon"}>
              <Spinner className=" h-4 w-4 animate-spin" />
            </Button>
          ) : isShareQuote ? (
            <Button
              size={"icon"}
              variant={"outline"}
              className="flex items-center justify-center text-center"
              onClick={() => {
                unshareItem();
              }}
            >
              <HiShare className="h-4 w-4 " fill="black" />
            </Button>
          ) : (
            <ShareModal quote={quote} setisShareQuote={setisShareQuote} />
          )}

          <ViewModal quote={quote} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;
