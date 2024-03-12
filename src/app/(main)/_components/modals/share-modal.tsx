"use client";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsShare } from "react-icons/bs";
import { updateUserShares } from "@/actions/simpsons";
import { SimpsonQuote } from "@/schemas/quotes-schemas";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { useMainStore } from "@/hooks/use-main-store";
import Spinner from "@/app/(auth)/_components/spinner";

export function ShareModal({
  quote,
  setisShareQuote,
}: {
  quote: SimpsonQuote;
  setisShareQuote: any;
}) {
  const { onOpenConfetti } = useMainStore();

  const [uniqueId, setuniqueId] = useState(uuidv4());
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${uniqueId}`;

  const [copiedClicked, setcopiedClicked] = useState(false);
  const [sharePending, setsharePending] = useState(false);

  const shareQuote = async () => {
    try {
      setsharePending(true);

      // `${process.env.NEXT_PUBLIC_APP_URL}/shares/`)[1]},

      const resp = await updateUserShares({
        quote,
        updateType: "add",
        quoteShareId: uniqueId,
      });

      if (resp?.error) {
        toast.error("Something went wrong");
        return;
      }
      if (resp.success) {
        toast.success("Quote is public now");
        onOpenConfetti();
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setsharePending(false);
      setisShareQuote(true);
    }
  };

  useEffect(() => {
    if (copiedClicked) {
      setTimeout(() => {
        setcopiedClicked(false);
      }, 1000);
    }
  }, [copiedClicked]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          className="flex items-center justify-center text-center"
        >
          <BsShare className="h-4 w-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Quote</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this quote.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareUrl} readOnly />
          </div>
          <Button
            variant={copiedClicked ? "outline" : "default"}
            onClick={() => {
              setcopiedClicked(true);
              navigator.clipboard.writeText(shareUrl);
            }}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>

            {!copiedClicked ? (
              <CopyIcon className="h-4 w-4" />
            ) : (
              <MdDone className="h-4 w-4 " fill="green" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="w-full flex justify-start">
            <div className="flex gap-3">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              {!sharePending ? (
                <Button
                  disabled={sharePending}
                  variant={"default"}
                  className="flex items-center justify-center text-center"
                  onClick={() => {
                    shareQuote();
                    // setisShareQuote(true);
                    // toast.success("Quote is public now");
                    // updateUserShares({
                    //   quote,
                    //   updateType: "add",
                    //   quoteShareId: uniquteId,
                    // });
                  }}
                >
                  Share
                </Button>
              ) : (
                <Button
                  disabled={sharePending}
                  variant="ghost"
                  // type="submit"
                  className="  rounded-sm w-full bg-gray-100"
                >
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Sharing...
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
