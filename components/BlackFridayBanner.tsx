import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import Image from "next/image";

/**
 * BlackFridayBanner Component:
 * Displays promotional banner for active Black Friday sales
 */
async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode("BFRIDAY");

  if (!sale?.isActive) return null;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-xl mt-4">
      <Image
        src="/assets/blackfriday-banner.jpg"
        alt="Black Friday Banner"
        width={1200}
        height={400}
        className="object-cover w-full h-full absolute"
        priority={true}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-lime-700/90 via-lime-600/80 to-black/90" />

      <div className="relative px-4 sm:px-6 py-5 sm:py-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-5xl font-black text-white text-left mb-4 tracking-tight">
              {sale.title}
            </h2>
            <p className="text-base sm:text-2xl font-medium text-white text-left mb-4">
              {sale.description}
            </p>

            <div className="flex cursor-default">
              <div className="bg-white w-full sm:w-fit text-center text-black py-4 px-4 sm:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="font-bold text-lg sm:text-2xl">
                  Use code:{" "}
                  <span className="text-lime-700 tracking-wider">
                    {sale.couponCode}{" "}
                  </span>
                </span>
                <span className="font-bold text-lg sm:text-2xl">
                  for {sale.discountAmount}% OFF!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
