"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/sanity.types";
import useCartStore from "@/store/store";
import { Minus, Plus, Trash2 } from "lucide-react";

interface QuantityButtonProps {
  product: Product;
  quantity: number;
}

export function QuantityButton({ product, quantity }: QuantityButtonProps) {
  const { addItem, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-3xl overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-none ${
          quantity === 1 ? "text-red-500 hover:text-red-600" : ""
        }`}
        onClick={() => removeItem(product._id)}
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
