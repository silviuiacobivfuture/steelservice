import { createCookieSessionStorage } from "@remix-run/node";

const wishlistStorage = createCookieSessionStorage({
  cookie: {
    name: "_wishlist",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"], // TODO: Move to env variable
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getWishlist(request: Request): Promise<string[]> {
  const session = await wishlistStorage.getSession(request.headers.get("Cookie"));
  return session.get("wishlist") || [];
}

export async function addToWishlist(request: Request, productId: string) {
  const session = await wishlistStorage.getSession(request.headers.get("Cookie"));
  const wishlist = session.get("wishlist") || [];
  
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
  }
  
  session.set("wishlist", wishlist);
  
  return {
    headers: {
      "Set-Cookie": await wishlistStorage.commitSession(session),
    },
  };
}

export async function removeFromWishlist(request: Request, productId: string) {
  const session = await wishlistStorage.getSession(request.headers.get("Cookie"));
  const wishlist = session.get("wishlist") || [];
  
  const updatedWishlist = wishlist.filter((id: string) => id !== productId);
  session.set("wishlist", updatedWishlist);
  
  return {
    headers: {
      "Set-Cookie": await wishlistStorage.commitSession(session),
    },
  };
}