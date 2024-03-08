import { SimpsonQuote } from "@/schemas/quotes-schemas";
import React from "react";
import QuoteCard from "./quote-card";

const QuotesResults = ({
  quotes,
  isLoading,
}: {
  quotes: SimpsonQuote[];
  isLoading: boolean;
}) => {
  return (
    <div className="w-full  gap-2  ">
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  items-center text-center mx-auto justify-center">
        {quotes.map((quote, index) => (
          <QuoteCard quote={quote} key={index} />
        ))}
      </div>
    </div>
  );
};

export default QuotesResults;
