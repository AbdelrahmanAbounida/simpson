"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { settingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User } from "next-auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Settings = ({ user }: { user: User | undefined }) => {
  const [pending, startTransition] = useTransition();
  const [showPassword, setshowPassword] = useState(false);

  const [currentEmail, setcurrentEmail] = useState<string>(
    user?.email as string
  );

  type settingType = z.infer<typeof settingsSchema>;

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
  });

  const onSubmit = async (data: settingType) => {};
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {(user?.image?.length as number) > 0 ? (
        <Image
          className="rounded-full"
          src={user?.image || ""}
          alt="user profile"
          width={100}
          height={100}
        />
      ) : (
        <div className="h-20 w-20 bg-sky-800 rounded-full"> </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center "
        >
          <div className=" flex flex-col items-center w-[600px]  mx-auto">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="gap-0 space-y-1 w-full">
                  <FormLabel className="font-normal text-small pl-1">
                    Email
                  </FormLabel>
                  <FormControl className="">
                    <Input
                      disabled={pending}
                      id="email"
                      type="text"
                      className="hover:border-1  hover:border-gray-400"
                      placeholder="ex@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="gap-0 space-y-1 w-full">
                  <FormLabel className="font-normal text-small pl-1">
                    old Password
                  </FormLabel>

                  <div className="flex relative">
                    <FormControl className="">
                      <Input
                        disabled={pending}
                        id="oldpassword"
                        type="text"
                        className="hover:border-1  hover:border-gray-400"
                        placeholder="*****"
                        {...field}
                      />
                    </FormControl>

                    <div
                      onClick={() => setshowPassword((prev) => !prev)}
                      className="flex justify-center items-center h-full absolute right-2 cursor-pointer"
                    >
                      {showPassword ? (
                        <FaRegEye className="  " />
                      ) : (
                        <FaRegEyeSlash className="  " />
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="gap-0 space-y-1 w-full">
                  <FormLabel className="font-normal text-small pl-1">
                    New Password
                  </FormLabel>
                  <div className="flex relative">
                    <FormControl className="">
                      <Input
                        disabled={pending}
                        id="newpassword"
                        type="text"
                        className="hover:border-1  hover:border-gray-400"
                        placeholder="*****"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div
                      onClick={() => setshowPassword((prev) => !prev)}
                      className="flex justify-center items-center h-full absolute right-2 cursor-pointer"
                    >
                      {showPassword ? (
                        <FaRegEye className="  " />
                      ) : (
                        <FaRegEyeSlash className="  " />
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button variant={"default"} type="submit" className="mt-7 px-10">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Settings;
