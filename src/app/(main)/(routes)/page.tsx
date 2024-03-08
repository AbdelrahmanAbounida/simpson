"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import SearchQuotesForm from "../_components/search-quotes";
import QuotesResults from "../_components/quotes-results";
import { useEffect, useState } from "react";
import MainSkeleton from "../_components/skeletons/main-skeletons";
import { fetchSimpsonQuotes } from "@/actions/simpsons";
import { useMainStore } from "@/hooks/use-main-store";
import toast from "react-hot-toast";

const Home = () => {
  const [count, setcount] = useState<number>(16);
  const [character, setcharacter] = useState<string>("");
  const { currentQuotes, setecurrentQuotes } = useMainStore();
  const [isLoading, setisLoading] = useState(false);

  const updateQuotes = async () => {
    try {
      setisLoading(true);
      const quotes = await fetchSimpsonQuotes({ count, character });
      if (quotes.error) {
        toast.error(quotes.error);
      }
      if (quotes.quotes) {
        setecurrentQuotes(quotes.quotes);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    updateQuotes();
  }, [count, character]);

  return isLoading ? (
    <MainSkeleton />
  ) : (
    <div className="w-full flex-col gap-9 mt-10 flex justify-center items-center p-5">
      <SearchQuotesForm setcharacter={setcharacter} setcount={setcount} />

      <QuotesResults isLoading={isLoading} quotes={currentQuotes || []} />
    </div>
  );
};

export default Home;
