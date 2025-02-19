import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * Orders Page Component
 *
 * Protected page that displays user's order history.
 * Requires authentication via Clerk.
 *
 * Features:
 * - Authentication check with redirect
 * - Server-side order fetching
 * - Empty state handling
 * - Responsive order list display
 */
async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-start sm:justify-center min-h-[calc(100vh-142px)]">
        <div className="p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">No orders yet</h1>
          <p className="mb-8">When you place an order, it will appear here</p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col my-4 gap-4 sm:gap-8">
      <h1 className="text-2xl font-bold">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-100 rounded-xl p-3 md:p-6 bg-white shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 md:text-center">Date</p>
                <p className="font-medium">
                  {new Date(order.orderDate!).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 md:text-center">Status</p>
                <p
                  className={`px-3 py-1 text-sm w-fit rounded-full ${order.status === "paid" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                >
                  {order.status?.toLocaleUpperCase()}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500 md:text-end">Total</p>
                <div className="text-start md:text-end">
                  {order.amountDiscount ? (
                    <>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400 line-through">
                          {formatPrice(
                            order.totalPrice! + order.amountDiscount
                          )}
                        </p>
                      </div>

                      <div className="space-y-1 pb-2">
                        <p className="text-sm font-medium text-lime-600">
                          - {formatPrice(order.amountDiscount)}
                        </p>
                      </div>

                      <div className="space-y-1 border-t pt-2">
                        <p className="font-medium">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1">
                      <p className="font-medium">
                        {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Order Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {order.products?.map((item) => (
                  <div
                    key={item._key}
                    className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg w-full"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {item.product?.image && (
                        <Image
                          src={imageUrl(item.product.image).url()}
                          alt={item.product.name || "Product image"}
                          fill
                          className="object-contain bg-gray-100 rounded-lg"
                        />
                      )}
                    </div>

                    {item.product && (
                      <>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                            {item.product?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="flex flex-col items-end text-right">
                          <p className="font-medium">
                            {formatPrice(item.product.price! * item.quantity!)}
                          </p>
                          {item.quantity! > 1 && (
                            <p className="text-sm text-gray-500">
                              {formatPrice(item.product.price)} each
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
