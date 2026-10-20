"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {Package} from "lucide-react";

import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/features/cart/cartSlice";

function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );
  const products = useAppSelector(
    (state) => state.product.Products
  );

  const total = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-red-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
      <h1 className="mx-auto mb-8 max-w-7xl text-3xl font-bold tracking-tight text-black sm:text-4xl text-center">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-200 p-10 text-center shadow-sm sm:p-14">
          <h2 className="text-2xl font-bold">
            Cart Empty
          </h2>

          <p className="mt-2 text-gray-500">
            Your Cart is currently empty!
          </p>
          
          <Link href="/products" className="mt-6 inline-flex gap-3 items-center justify-center text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded-lg">
           <Package size={20} />
           Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="rounded-2xl border border-red-200 bg-red-200 p-5 shadow-sm transition duration-200 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={120}
                      height={100}
                      className="h-24 w-24 rounded-xl border border-red-100 bg-white object-contain p-2 sm:h-28 sm:w-28"
                    />

                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                        {item.product.name}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        ${item.product.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.product.id)
                        )
                      }
                      className="rounded border px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white cursor-pointer text-lg"
                    >
                      -
                    </button>

                    <span className="min-w-8 text-center font-bold tabular-nums text-gray-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => {
                        const currentProduct = products.find(
                          (product) => product.id === item.product.id
                        );

                        if (currentProduct && currentProduct.stock > 0) {
                          dispatch(
                            increaseQuantity({
                              id: item.product.id,
                              stock: currentProduct.stock,
                            })
                          );
                        }
                      }}
                      className="rounded border px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white cursor-pointer text-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-base font-bold text-gray-900 sm:text-lg">
                    ${item.product.price * item.quantity}
                  </p>

                  <button
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          id: item.product.id,
                          quantity: item.quantity,
                        })
                      )
                    }
                    className="rounded-lg px-3 py-2 text-md font-semibold bg-gray-700 text-white transition  hover:bg-gray-800 cursor-pointer "
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-7xl rounded-2xl border border-red-200 bg-red-200 p-6 shadow-md sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Order Summary
            </h2>

            <p className="mt-5 border-t border-red-300 pt-5 text-lg font-semibold text-gray-800 ">
              Subtotal: ${total}
            </p>

            <Link
              href="/checkout"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-gray-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto "
            >
              Checkout
            </Link>
          </div>
        </>
      )}
      </div>
    </main>
  );
}

export default CartPage;