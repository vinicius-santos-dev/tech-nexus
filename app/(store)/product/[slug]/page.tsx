import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const isInStock = product?.stock && product.stock > 0;

  if (!product) return notFound();

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="rounded-lg overflow-hidden sm:max-w-[50%] aspect-video w-full h-full relative">
        {product.image && (
          <Image
            className="object-contain bg-gray-100"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority
          />
        )}
      </div>

      <div className="flex flex-col gap-4 sm:max-w-[50%] w-full">
        <h1 className="text-2xl sm:text-5xl font-bold">{product.name}</h1>

        <div className="flex flex-wrap gap-3">
          {product.categories?.map((category) => (
            <span
              key={category.title}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full"
            >
              {category.title}
            </span>
          ))}

          <span
            className={`px-3 py-1 text-sm rounded-full ${
              isInStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isInStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        <p className="hidden sm:block text-lg">${product.price}</p>

        <div>
          <h2 className="text-lg font-bold">Description</h2>

          {Array.isArray(product.description) && (
            <PortableText value={product.description} />
          )}
        </div>

        <div
          className="mt-auto flex justify-between items-center fixed bottom-0 left-0 right-0 px-3 py-3
                  bg-white border-t border-gray-200 shadow-lg sm:shadow-none sm:border-0 
                    sm:relative sm:px-0 sm:py-0"
        >
          <h3 className="block sm:hidden text-lg font-bold">
            ${product.price}
          </h3>

          <Button
            disabled={!isInStock}
            className="max-w-[70%] sm:max-w-none w-full text-base h-12 rounded-xl"
          >
            {isInStock ? "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
