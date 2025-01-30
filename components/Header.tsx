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
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div>
        <Link href="/" className="font-exo2 text-2xl font-bold">
          Tech Nexus
        </Link>
      </div>

      <div className="flex gap-4 items-center">
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
              <UserButton />

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
      </div>
    </header>
  );
}

export default Header;
