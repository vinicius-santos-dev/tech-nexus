"use client"

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";

/**
 * ProductGrid Component: 
 * A responsive grid layout component that displays product cards with animation effects.
 *
 * Features:
 * - Responsive grid layout (2 columns mobile, 3 tablets, 4 desktop)
 * - Animated product card entry/exit using Framer Motion
 */
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <ProductCard key={product._id} product={product} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default ProductGrid;
