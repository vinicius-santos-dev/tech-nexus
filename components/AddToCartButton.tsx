'use client'

import { Button } from "@/components/ui/button";
import { Product } from "@/sanity.types";
import useCartStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
  product: Product;
  isDisabled: boolean;
}

export default function AddToCartButton({ product, isDisabled }: AddToCartButtonProps) {
  const { addItem } = useCartStore();

  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set isClient to true after component mounts
  // This ensures that the component only renders on the client-side 
  // preventing hydration errors due to server/client mismatch
  useEffect(() => {
    setIsClient(true);
  }, [])

  if (!isClient) return null;

  return (
    <Button 
      onClick={() => addItem(product)}
      disabled={isDisabled}
      className="max-w-[70%] sm:max-w-none w-full text-base h-12 rounded-xl"
    >
      {!isDisabled ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}