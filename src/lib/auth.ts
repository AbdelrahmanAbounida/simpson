import { auth } from "@/auth";

// use this for server side components
export const getServerCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};

// for client component use usecurrentuser hook
