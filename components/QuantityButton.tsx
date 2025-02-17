"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/sanity.types";
import useCartStore from "@/store/store";
import { Minus, Plus, Trash2 } from "lucide-react";

interface QuantityButtonProps {
  product: Product;
  quantity: number;
}

/**
 * QuantityButton Component:
 * Provides increment, decrement, and remove functionality with visual feedback.
 *
 * Features:
 * - Integration with cart store
 * - Toast notifications for actions
 */
export function QuantityButton({ product, quantity }: QuantityButtonProps) {
  const { addItem, removeItem } = useCartStore();
  const { toast } = useToast();

   /**
   * Handles removing item from cart.
   * Shows toast notification on successful removal
   */
  const handleRemoveItem = () => {
    removeItem(product._id, () => {
      toast({
        title: "Removed from Cart",
        description: `${product.name} was removed from your cart`,
        variant: "destructive",
        duration: 3000,
      });
    });
  };

  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-3xl overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-none ${
          quantity === 1 ? "text-red-500 hover:text-red-600" : ""
        }`}
        onClick={handleRemoveItem}
      >
        {quantity === 1 ? (
          <Trash2 className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>

      <span className="w-4 text-center">{quantity}</span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none"
        onClick={() => addItem(product)}
        disabled={product.stock !== undefined && product.stock <= quantity}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
