import { SIMPSON_BASE_API_URL } from "@/const/simpson";
import useSWR from "swr";

export const useSimpsonsQuotes = (count: number, character?: string) => {
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  const url =
    !character || character == "Any"
      ? `${SIMPSON_BASE_API_URL}?count=${count}`
      : `${SIMPSON_BASE_API_URL}?count=${count}&?character=${character}`;

  const { data, isLoading, error } = useSWR(url, fetcher);
  return { data, isLoading, error };
};
