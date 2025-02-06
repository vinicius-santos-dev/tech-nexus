"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { SearchIcon, TrolleyIcon } from "@sanity/icons";
import Form from "next/form";
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

      <div className="flex flex-1 flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <div></div>

        <Form action="/search" className="relative max-w-md w-full mt-3 sm:mt-0">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-2 w-7 h-7 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for products..."
              name="query"
              className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-200 
                        rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 
                        focus:border-transparent transition-all duration-200 
                      placeholder-gray-400"
            />
          </div>
        </Form>

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
      </div>
    </header>
  );
}

export default Header;
