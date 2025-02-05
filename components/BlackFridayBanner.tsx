import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode("BFRIDAY");

  if (!sale?.isActive) return null;

  return (
    <div className="bg-gradient-to-r from-lime-700 via-lime-600 to-black text-white px-4 sm:px-6 py-5 sm:py-10 mt-4 rounded-lg shadow-xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-5xl font-black text-left mb-4 tracking-tight">
            {sale.title}
          </h2>
          <p className="text-base sm:text-2xl font-medium text-left mb-4">
            {sale.description}
          </p>

          <div className="flex cursor-default">
            <div className="bg-white w-full sm:w-fit text-center text-black py-4 px-4 sm:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="font-bold text-lg sm:text-2xl">
                Use code:{" "}
                <span className="text-lime-600 tracking-wider">
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
  );
}

export default BlackFridayBanner;
