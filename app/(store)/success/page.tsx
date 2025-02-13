"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/store";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (orderNumber) clearCart();
  }, [orderNumber, clearCart]);

  return (
    <div className="flex flex-col items-center justify-start sm:justify-center min-h-[calc(100vh-142px)]">
      <div className="flex flex-col items-center gap-4 text-center p-6">
        <div className="h-16 w-16 rounded-full bg-lime-100 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-lime-600" />
        </div>

        <h1 className="text-2xl font-bold">Thank you for your order!</h1>
        <p className="mb-2">
          Your order number is:{" "}
          <span className="font-medium">{orderNumber}</span>
        </p>
        <p className="text-sm text-gray-500 mb-8">
          We&apos;ll email you an order confirmation with details and tracking
          info.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button className="w-full sm:w-auto" asChild>
            <Link href={`/orders/${orderNumber}`}>View Order Details</Link>
          </Button>

          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/">Back to Store</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
