"use client";
import { fetchSimpsonQuotes } from "@/actions/simpsons";
import Spinner from "@/app/(auth)/_components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMainStore } from "@/hooks/use-main-store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const SearchQuotesForm = ({
  setcharacter,
  setcount,
}: {
  setcharacter: any;
  setcount: any;
}) => {
  // form schema
  const searchSchema = z.object({
    numCharacters: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z
        .number()
        .positive()
        .max(100)
        .min(1, { message: "Min number of quotes is 1" })
    ),
    character: z.string().min(1, { message: "search word is required" }),
  });

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      // numCharacters: 16,
      character: "",
    },
  });

  // states
  const [searchPending, setsearchPending] = useState(false);
  const { setecurrentQuotes } = useMainStore();

  // search submission
  const onsubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      console.log(values.character);
      setsearchPending(true);
      const quotes = await fetchSimpsonQuotes({
        count: values.numCharacters,
        character: values.character,
      });
      if (quotes.error) {
        toast.error(quotes.error);
      }
      if (quotes.quotes) {
        setecurrentQuotes(quotes.quotes);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setsearchPending(false);
    }
  };

  const all_numbers = Array.from(
    { length: Math.ceil(100) },
    (_, index) => index
  );

  return (
    <div className="w-full  flex items-start gap-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="w-full relative h-full flex justify-start space-x-9 mt-5 "
        >
          <FormField
            name="numCharacters"
            control={form.control}
            render={({ field }) => (
              <FormItem className="gap-0 space-y-1 w-[20%]">
                <Select
                  disabled={searchPending}
                  onValueChange={field.onChange}
                  // defaultValue={"16"}
                >
                  <FormControl className=" min-w-[90px]">
                    <SelectTrigger className="w-full border-gray-200">
                      <SelectValue placeholder="Choose number of Quotes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {all_numbers.map((num, index) => (
                        <SelectItem key={index} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>number of searching results</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="character"
            control={form.control}
            render={({ field }) => (
              <FormItem className="gap-0 space-y-1 w-[60%]">
                <FormControl>
                  <Input
                    disabled={searchPending}
                    id="search_word"
                    placeholder="homer"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  filter the quotes with a searching word
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-full pt-0 flex items-end w-[15%]">
            {!searchPending ? (
              <Button
                variant={"default"}
                disabled={searchPending}
                type="submit"
                className="w-full rounded-sm   hover:shadow-lg hover:bg-sky"
              >
                Search
              </Button>
            ) : (
              <Button
                disabled={searchPending}
                variant="ghost"
                type="submit"
                className="  rounded-sm w-full bg-gray-100"
              >
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchQuotesForm;
