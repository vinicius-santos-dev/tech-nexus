"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import Loader from "@/components/Loader";
import { QuantityButton } from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/imageUrl";
import useCartStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Cart Page Component
 * 
 * Displays shopping cart contents and handles checkout process.
 * Integrates with Clerk authentication and Stripe payments.
 * 
 * Features:
 * - Real-time cart total calculation
 * - Dynamic product quantity management
 * - Authentication gate for checkout
 * - Stripe checkout integration
 * - Responsive layout
 */
function CartPage() {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  const handleCheckout = async () => {
    if (!isSignedIn) return;

    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating a checkout session: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!groupedItems.length) {
    return (
      <div className="flex flex-col items-center justify-start sm:justify-center min-h-[calc(100vh-142px)]">
        <div className="p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Your cart is empty</h1>
          <p>Looks like you haven&apos;t added anything to your cart yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-4 md:mb-8">
        <Link href="/" className="flex items-center justify-center h-8 w-8">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">My Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:p-5 md:border border-gray-100 rounded-xl bg-white md:shadow-sm">
            <div className="hidden md:grid md:grid-cols-4 gap-4 pb-3 border-b border-gray-100 text-lg font-semibold">
              <h2 className="col-span-2">Products</h2>
              <h2 className="text-center">Quantity</h2>
              <h2 className="text-right">Subtotal</h2>
            </div>

            <div className="divide-y divide-gray-100 ">
              {groupedItems.map((item) => (
                <div
                  key={item.product._id}
                  className="grid md:grid-cols-4 gap-3 md:gap-4 py-4 items-center"
                >
                  {/* Product Info - Takes 2 columns on desktop */}
                  <div className="col-span-2 flex items-center gap-3 md:gap-4">
                    <div className="w-20 h-20 sm:h-24 sm:w-24 flex-shrink-0">
                      {item.product.image && (
                        <Image
                          src={imageUrl(item.product.image).url()}
                          alt={item.product.name || "Product image"}
                          className="w-full h-full object-contain rounded-lg bg-gray-100"
                          width={96}
                          height={96}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-base md:text-lg font-semibold truncate max-w-[250px] sm:max-w-none">
                        {item.product.name}
                      </h2>

                      <p className="text-sm md:text-base text-gray-500 truncate max-w-[250px] sm:max-w-none">
                        {item.product.description
                          ?.map((block) =>
                            block._type === "block"
                              ? block.children
                                  ?.map((child) => child.text)
                                  .join("")
                              : ""
                          )
                          .join(" ") || ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start md:justify-center">
                    <QuantityButton
                      product={item.product}
                      quantity={item.quantity}
                    />
                  </div>

                  <div className="text-right">
                    <p>
                      ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-4 flex flex-col gap-3 md:gap-4 p-3 md:p-5 border border-gray-100 rounded-xl bg-white shadow-sm">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="flex justify-between">
              <p>
                Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
              </p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p>Shipping</p>
              <p>$0</p>
            </div>

            <div className="flex flex-col border-t border-gray-100 pt-4 gap-6">
              <div className="flex justify-between font-semibold text-lg">
                <h2>Total</h2>
                <h2>${totalPrice.toFixed(2)}</h2>
              </div>

              {isSignedIn ? (
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full text-base h-12 rounded-xl"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="text-base w-full h-12 rounded-xl">
                    Login to Checkout
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
