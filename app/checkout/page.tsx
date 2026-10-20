
"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addOrder } from "@/redux/features/order/orderSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import type { Order } from "@/types/type";

export default function Checkout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("Customer") === "true");
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  function handlePlaceOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");


    const isLoggedIn = localStorage.getItem("Customer") === "true";

    if (!isLoggedIn) {
      alert("Login First to place order!")
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const savedEmail = localStorage.getItem("CustomerEmail");

    let customerid = localStorage.getItem("CustomerId");

    if (!customerid) {
      customerid = crypto.randomUUID();
      localStorage.setItem("CustomerId", customerid);
    }


    const order: Order = {
      id: crypto.randomUUID(),
      customerid,
      items: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      total,
      createdat: new Date().toISOString(),
      name: name.trim(),
      email: savedEmail || email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
    };


    const orders: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );


    localStorage.setItem(
      "orders",
      JSON.stringify([order, ...orders])
    );


    dispatch(addOrder(order));
    dispatch(clearCart(cartItems));


    router.push("/order-success");
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-red-100">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>

        <Link
          href="/products"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Shop Now
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 px-4 py-8 sm:p-6 lg:p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 md:grid-cols-2 lg:gap-8">
        {loggedIn ? (
          <form
            onSubmit={handlePlaceOrder}
            className="space-y-5 rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-sm sm:p-6"
          >
            <h1 className="text-3xl font-bold text-center">Checkout</h1>

            <p className="text-gray-600 text-center">
              You must log in before placing your order.
            </p>

            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label className="mb-2 block">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-gray-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-gray-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-gray-500"
                placeholder="Enter your phone"
              />
            </div>

            <div>
              <label className="mb-2 block">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-gray-500"
                placeholder="Enter your delivery address"
              />
            </div>

            <button
              type="submit"
              
              className="w-full rounded-lg bg-gray-700 hover:bg-gray-800 p-3 font-semibold text-white cursor-pointer">
              Place Order
            </button>
          </form>
        ) : (<div className="h-fit space-y-4 rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-sm sm:p-6 mt-20">
          <h1 className="text-2xl font-bold text-center">Login Required</h1>

          <p className="text-gray-600">
            Please log in to continue with checkout and place your order.
          </p>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full rounded-lg bg-gray-700 hover:bg-gray-800 p-3 font-semibold text-white cursor-pointer"
          >
            Login as User
          </button>
        </div>)}

        <section className="h-fit rounded-xl border border-gray-200 bg-gray-100 p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-2xl font-bold text-center">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 border-b border-gray-200 pb-4"
              >
                <div className="relative h-20 w-20 shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="rounded-lg border border-gray-100 bg-white object-contain p-1"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>

                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>

                  <p className="font-semibold">
                    $
                    {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5 text-xl font-bold bg-gray-700 text-white rounded-lg">
            <span className="mb-4 ml-3">Total</span>
            <span className="mb-4 mr-3">$ {total.toLocaleString()}</span>
          </div>

          <Link
            href="/cart"
            className="mx-auto mt-5 block w-fit rounded-lg bg-gray-700 px-6 py-3 text-center text-white hover:bg-gray-800"
          >
            Back to Cart
          </Link>
        </section>
      </div>
    </main>
  );
}
