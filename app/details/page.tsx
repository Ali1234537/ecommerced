
"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import Toast from "@/components/Toast";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { useSearchParams } from "next/navigation";

import { Info, ShoppingCart, CheckCircle2, ChevronRight, House, Package } from "lucide-react";

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const id = searchParams.get("id");
  
  const [showToast , setShowToast] = useState(false);

  const products = useAppSelector((state) => state.product.Products);
  const cartItems = useAppSelector((state) => state.cart.items);

  const items = products.find((item) => item.id === Number(id));

  const currentProduct = products.find(
    (item) => item.id === Number(id)
  );

  const cartItem = cartItems.find(
    (item) => item.product.id === Number(id)
  );

  if (!items) {
    return (
      <div className="p-8 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-red-100 px-4 py-8 sm:px-8">
      <Toast message="Product Added to Cart!"
       show = {showToast}
       onClose={()=> setShowToast(false)}
       />

      <nav aria-label="Breadcrumb" className="mb-8 border-gray-400 border px-6 py-3 rounded-xl  w-fit">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-black transition hover:underline font-semibold"
            >
              <House size={16} />
              Home
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight size={16} className="text-gray-400" />
          </li>

          <li>
            <Link
              href="/products"
              className="flex items-center gap-1 transition text-black font-semibold  hover:underline"
            >
              <Package size={16} className="text-black" />
              Products
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight size={16} className="text-gray-400" />
          </li>

          <li
            aria-current="page"
            className="font-bold text-black "
          >
            {items.name}
          </li>
        </ol>
      </nav>
      <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
        <div className="flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden ">
          <Image
            src={items.image}
            alt={items.name}
            width={200}
            height={200}
            className="h-[400px] w-[600px] object-contain transition-transform duration-200 hover:scale-100 rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-2xl font-bold text-black text-center">
            {items.name}
          </h1>

          <p className="mb-2 text-gray-800">
            <strong>◎ Price: </strong> ${items.price}
          </p>

          <p className="mb-2 text-gray-800">
            <strong>◎ Description: </strong> {items.detail}
          </p>

          <p className="mb-2 text-gray-800">
            <strong>◎ Stock: </strong> {currentProduct?.stock ?? items.stock}
          </p>

          <p className="mb-2 text-gray-800">
            <strong>◎ Category: </strong> {items.category}
          </p>
          <div className="mt-6 rounded-xl border border-gray-200 bg-red-200 p-5">
            <h2 className="mb-3 flex items-center justify-center gap-2 text-lg font-semibold text-black">
              <Info size={20} />
              Shopping Benefits
            </h2>

            <p className="mb-4 text-sm leading-6 text-gray-800 text-center">
              Enjoy a simple and convenient shopping experience. Explore
              our products and find what suits your needs.
            </p>

            <div className="space-y-3">
              <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
                <Info size={18} />
                Clear Product Information
              </p>

              <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
                <ShoppingCart size={18} />
                Easy Cart Management
              </p>

              <p className="flex items-center justify-center gap-2 text-sm text-gray-800">
                <CheckCircle2 size={18} />
                Convenient Shopping
              </p>
            </div>
          </div>



          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                dispatch(addToCart(items));
                setShowToast(true);
              }}
              className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-800 whitespace-nowrap cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              disabled={!cartItem || !currentProduct || currentProduct.stock <= 0}
              onClick={() => {
                if (cartItem && currentProduct && currentProduct.stock > 0) {
                  dispatch(
                    increaseQuantity({
                      id: items.id,
                      stock: currentProduct.stock,
                    })
                  );
                }
              }}
              className="rounded-lg bg-black px-3 py-1 text-white disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              +
            </button>

            <span>
              {cartItem?.quantity || 0}
            </span>

            <button
              disabled={!cartItem || cartItem.quantity <= 1}
              onClick={() => dispatch(decreaseQuantity(items.id))}
              className="rounded-lg bg-black px-3 py-1 text-white disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              -
            </button>

            <button
              onClick={() => {
                const item = cartItems.find(
                  (item) => item.product.id === items.id
                );

                if (item) {
                  dispatch(
                    removeFromCart({
                      id: items.id,
                      quantity: item.quantity,
                    })
                  );
                }
              }}
              className="rounded-lg bg-gray-700 hover:bg-gray-800 px-3 py-2 text-white cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-center text-2xl font-bold mt-10 mx-auto w-fit bg-gray-700 text-white px-6 py-2 rounded-t-xl">Why Choose Us?</h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
        <div className="rounded-xl border bg-red-200 p-6">
          <h3 className="mb-2 font-semibold text-black text-center">
            Product Quality
          </h3>
          <p className="text-sm leading-6 text-gray-800 text-center">
            Explore the product details before making your purchase.
          </p>
        </div>

        <div className="rounded-xl border bg-red-200 p-6 text-center">
          <h3 className="mb-2 font-semibold text-black">
            Easy Shopping
          </h3>
          <p className="text-sm leading-6 text-gray-800 text-center">
            Add your favorite products to the cart and manage quantities easily.
          </p>
        </div>

        <div className="rounded-xl border bg-red-200 p-6 text-center">
          <h3 className="mb-2 font-semibold text-black">
            Stock Availability
          </h3>
          <p className="text-sm leading-6 text-gray-800 text-center">
            Stock: {currentProduct?.stock ?? items.stock}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetails() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen p-8 text-center">
          Loading product details...
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
