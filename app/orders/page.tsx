
"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState ,useEffect } from "react";
function OrderShow() {
  const orders = useAppSelector((state) => state.Order.orders);
  const router = useRouter();
  const [checking , setChecking] = useState(true);
  
  useEffect(()=>{
    const orderCheck = localStorage.getItem("orderCheck");
    
    if(orderCheck !== "true"){
      router.replace("/");
      return
    }
    
    localStorage.removeItem("orderCheck");
    setChecking(false);
  },[router]);

  if(checking){
    return null;
  }
  

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-8 text-3xl font-bold">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-lg text-gray-600">
            You haven't placed any orders yet.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded bg-black px-5 py-3 text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border p-6 shadow-sm"
            >
              <div className="mb-4 flex flex-wrap justify-between gap-3 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Placed on: {order.createdat}
                  </p>
                </div>

                <p className="font-bold text-green-600">
                  Total: ${order.total}
                </p>
              </div>

              <h3 className="mb-4 font-semibold">
                Products
              </h3>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">
                        {item.product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ${item.product.price}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/products"
        className="mt-8 inline-block rounded border px-5 py-3"
      >
        Continue Shopping
      </Link>
    </main>
  );
}

export default OrderShow;
