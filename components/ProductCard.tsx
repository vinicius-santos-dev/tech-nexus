import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <span className="text-white font-bold text-lg">
              Out of stock
            </span>
          </div>
        )}

        {product.image && (
          <Image
            className="object-contain bg-gray-100 transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold truncate">{product.name}</h2>

        <p className="mt-2 truncate">
          {product.description?.map((block) =>
            block._type === "block"
              ? block.children?.map((child) => child.text).join("")
              : ""
          ).join(" ") || ""}
        </p>
        <p className="text-lg">${(product.price)?.toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
