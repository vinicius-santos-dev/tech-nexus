"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/store";
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

  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="flex flex-wrap flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-3 sm:px-6 max-w-7xl mx-auto py-2">
      <div>
        <Link href="/" className="font-exo2 text-2xl font-bold">
          Tech Nexus
        </Link>
      </div>

      <div className="flex flex-1 w-full flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <div></div>

        <Form
          action="/search"
          className="relative max-w-md w-full mt-3 sm:mt-0"
        >
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

        <nav className="flex gap-8 items-center text-sm sm:text-base">
          <Link
            href="/"
            className="relative w-[40px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full hover:font-medium"
          >
            Shop
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <>
                <Link
                  href="/orders"
                  className="relative w-[50px] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full hover:font-medium"
                >
                  Orders
                </Link>
              </>
            </SignedIn>

            <Link href="/cart" className="relative">
              <TrolleyIcon className="cursor-pointer h-8 w-8" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-lime-500 text-black text-xs font-bold rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>

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
