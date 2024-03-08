import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegEye } from "react-icons/fa";
import { SimpsonQuote } from "@/schemas/quotes-schemas";

export function ViewModal({ quote }: { quote: SimpsonQuote }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          className="flex items-center justify-center text-center"
        >
          <FaRegEye className="h-4 w-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{quote.character}</DialogTitle>
          {/* <DialogDescription>{quote.quote}</DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2 text-slate-700">{quote.quote}</div>
        </div>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="default" className="w-[150px]">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewModal;
