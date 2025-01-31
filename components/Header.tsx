"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { TrolleyIcon } from "@sanity/icons";
import Link from "next/link";

function Header() {
  const { user } = useUser();

  return (
    <header className="flex flex-wrap flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-3 sm:px-6 max-w-7xl mx-auto py-2">
      <div>
        <Link href="/" className="font-exo2 text-2xl font-bold">
          Tech Nexus
        </Link>
      </div>

      {/* TODO: change the spacings when signed in and signed out */}
      <nav className="flex gap-8 items-center text-sm sm:text-base">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>

        <ClerkLoaded>
          <SignedIn>
            <>
              <Link href="/account">My Account</Link>

              <Link href="/cart">
                <TrolleyIcon className="cursor-pointer h-8 w-8" />
              </Link>
            </>
          </SignedIn>

          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 sm:w-10 sm:h-10",
                  },
                }}
              />

              <div className="hidden sm:block text-xs">
                <p className="text-gray-500">Welcome, </p>
                <p className="font-bold">{user.fullName}!</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button className="text-base">Login</Button>
            </SignInButton>
          )}
        </ClerkLoaded>
      </nav>
    </header>
  );
}

export default Header;
