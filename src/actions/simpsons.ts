"use server";

import { SIMPSON_BASE_API_URL } from "@/const/simpson";
import { getServerCurrentUser } from "@/lib/auth";
import { prismadb } from "@/lib/db";
import { SimpsonQuote } from "@/schemas/quotes-schemas";
import { SimpsonFavouriteQuote } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const getCurrentUserFavouritesShares = async ({
  infoType,
}: {
  infoType: "shares" | "favourites";
}) => {
  // a function to return user favourites/shares
  const currentUser = await getServerCurrentUser();

  // check user
  if (!currentUser || !currentUser.email) {
    return { error: "Un authorized" };
  }

  if (infoType == "favourites") {
    const user = await prismadb.user.findUnique({
      where: {
        email: currentUser.email as string,
      },
      include: {
        favourites: true,
      },
    });

    if (!user) {
      return { error: "No User Found" };
    }

    return {
      success: user.favourites,
    };
  } else {
    const user = await prismadb.user.findUnique({
      where: {
        email: currentUser.email as string,
      },
      include: {
        shares: true,
      },
    });

    if (!user) {
      return { error: "No User Found" };
    }

    return {
      success: user.shares,
    };
  }
};

export const updateUserFavourites = async ({
  quote,
  updateType,
}: {
  quote: SimpsonQuote | SimpsonFavouriteQuote;
  updateType: "add" | "remove";
}) => {
  try {
    // Retrieve current user
    const currentUser = await getServerCurrentUser();

    // Check if currentUser exists and has an email
    if (!currentUser || !currentUser.email) {
      throw new Error("Unauthorized");
    }

    // Find user by email and include favourites
    const user = await prismadb.user.findUnique({
      where: {
        email: currentUser.email,
      },
      include: {
        favourites: true,
      },
    });
    // If no user found, return error
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the quote already exists in the database
    const existingQuote = await prismadb.simpsonFavouriteQuote.findUnique({
      where: {
        quote: quote.quote,
      },
    });

    let updatedUser;

    if (updateType === "add") {
      if (!existingQuote) {
        // Create the quote if it doesn't exist
        updatedUser = await prismadb.user.update({
          where: { email: currentUser.email },
          data: {
            favourites: {
              create: {
                character: quote.character,
                image: quote.image,
                quote: quote.quote,
              },
            },
          },
          include: {
            favourites: true,
          },
        });
      } else {
        // Connect the existing quote
        updatedUser = await prismadb.user.update({
          where: { email: currentUser.email },
          data: {
            favourites: {
              connect: {
                quote: quote.quote,
              },
            },
          },
          include: {
            favourites: true,
          },
        });
      }
    } else if (updateType === "remove") {
      // Check if the quote exists in the user's favourites
      const quoteExists = user.favourites.some(
        (item) => item.quote === quote.quote
      );

      if (!quoteExists) {
        throw new Error(`Quote not found in favourites`);
      }

      // Remove the quote
      updatedUser = await prismadb.user.update({
        where: { email: currentUser.email },
        data: {
          favourites: {
            delete: {
              quote: quote.quote,
            },
          },
        },
        include: {
          favourites: true,
        },
      });
    }
    return updatedUser;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const updateUserShares = async ({
  quote,
  updateType,
  quoteShareId,
}: {
  quote: SimpsonQuote | SimpsonFavouriteQuote;
  updateType: "add" | "remove";
  quoteShareId?: String;
}) => {
  try {
    // const uniquteId = uuidv4();
    // Retrieve current user
    const currentUser = await getServerCurrentUser();

    // Check if currentUser exists and has an email
    if (!currentUser || !currentUser.email) {
      throw new Error("Unauthorized");
    }

    // Find user by email and include shares
    const user = await prismadb.user.findUnique({
      where: {
        email: currentUser.email,
      },
      include: {
        shares: true,
      },
    });

    // If no user found, return error
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the quote already exists in the database
    const existingQuote = await prismadb.simpsonShareQuote.findUnique({
      where: {
        quote: quote.quote,
      },
    });

    let updatedUser;

    if (updateType === "add") {
      if (!existingQuote) {
        // Create the quote if it doesn't exist
        updatedUser = await prismadb.user.update({
          where: { email: currentUser.email },
          data: {
            shares: {
              create: {
                character: quote.character,
                image: quote.image,
                quote: quote.quote,
                shareId: quoteShareId as string,
              },
            },
          },
          include: {
            shares: true,
          },
        });
      } else {
        // Connect the existing quote
        updatedUser = await prismadb.user.update({
          where: { email: currentUser.email },
          data: {
            shares: {
              connect: {
                quote: quote.quote,
              },
            },
          },
          include: {
            shares: true,
          },
        });
      }

      // onOpenConfetti(); // open confetti for share
    } else if (updateType === "remove") {
      // Check if the quote exists in the user's shares
      const quoteExists = user.shares.some(
        (item) => item.quote === quote.quote
      );

      if (!quoteExists) {
        throw new Error(`Quote not found in shares`);
      }

      // Remove the quote
      updatedUser = await prismadb.user.update({
        where: { email: currentUser.email },
        data: {
          shares: {
            delete: {
              quote: quote.quote,
            },
          },
        },
        include: {
          shares: true,
        },
      });
    }

    return updatedUser;
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong" };
  }
};

export const checkQuoteState = async ({ quote }: { quote: SimpsonQuote }) => {
  const currentUser = await getServerCurrentUser();

  // Check user
  if (!currentUser || !currentUser.email) {
    return { error: "Unauthorized" };
  }

  // Find user
  const user = await prismadb.user.findUnique({
    where: {
      email: currentUser.email as string,
    },
    include: {
      favourites: true,
      shares: true,
    },
  });

  // Check if user exists
  if (!user) {
    return { error: "User not found" };
  }

  // Check if quote exists in favourites
  const isFavourite = user.favourites.some(
    (favourite) => favourite.quote === quote.quote
  );

  // Check if quote exists in shares
  const isShare = user.shares.some((share) => share.quote === quote.quote);

  return { isFavourite, isShare };
};

export const fetchSimpsonQuotes = async ({
  count,
  character,
}: {
  count: number;
  character?: string;
}) => {
  try {
    const url =
      !character || character == "Any"
        ? `${SIMPSON_BASE_API_URL}?count=${count}`
        : `${SIMPSON_BASE_API_URL}?count=${count}&?character=${character}`;

    const response = await fetch(url);
    const quotes = await response.json();
    return { quotes };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong" };
  }
};
