"use client";
import type { Metadata } from "next";
import Navbar from "./_components/navbar";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Simpson",
//   description: "Simpson Quote Generator",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();

  const notPublic =
    currentPath !== "/shares" && currentPath.startsWith("/shares");
  console.log({ currentPath });
  return (
    <div className="max-w-screen-xl mx-auto">
      {!notPublic && <Navbar />}
      {children}
    </div>
  );
}
