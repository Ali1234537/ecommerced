"use client";

import Link from "next/link";
import { SquareArrowOutUpRight, Toolbox, SquareMousePointer, KeyRound } from "lucide-react";
import Image from "next/image";
function FooterNavbar() {
  return (
    <footer className="mt-auto border-t border-gray-300 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 shadow-md text-gray-900">


      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">


        <div>
          <Link href="/" className="mb-4 inline-flex items-center gap-2">

            <Image
              src="/logoed1.png"
              alt="Logo.png"
              width={150}
              height={120}
              className="h-auto w-28 shrink-0 object-contain sm:w-24 lg:w-28"
            />
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-700">
            Discover quality products at great prices.
            Enjoy a simple and convenient shopping experience with us.
          </p>

          <Link href="/login" className="inline-flex items-center justify-center gap-3 bg-gray-700 px-5 py-2 text-white rounded-lg mt-9 font-semibold">
            <KeyRound size={20} />
            Login
          </Link>

        </div>

        <div className="w-fit mx-auto">
          <h3 className="mx-auto w-fit bg-gray-600 text-white px-4 py-2 rounded-t-xl  flex items-center justify-center gap-3 mb-4 text-lg font-bold text-center">
            <SquareArrowOutUpRight size={18} />
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-800 text-center">
            <li className="w-full "><Link href="/" className="transition hover:text-black hover:underline font-bold text-md">Home</Link></li>
            <li className="w-full "><Link href="/products" className="transition hover:text-black hover:underline font-bold text-md">Products</Link></li>
            <li className="w-full "><Link href="/cart" className="transition hover:text-black hover:underline font-bold text-md">Shopping Cart</Link></li>
            <li className="w-full "><Link href="/orders" className="transition hover:text-black hover:underline font-bold text-md">My Orders</Link></li>
          </ul>
        </div>


        <div>
          <h3 className=" w-fit mx-auto py-2 px-4 rounded-t-xl flex items-center justify-center gap-3  mb-4 text-lg font-bold text-center bg-gray-600 text-white ">
            <Toolbox size={18} />
            Customer Service</h3>
          <ul className="space-y-3 text-sm text-gray-800 text-center">
            <li><Link href="/" className="transition hover:text-black hover:underline font-bold text-md">Contact Us</Link></li>
            <li><Link href="/" className="transition hover:text-black hover:underline font-bold text-md">Privacy Policy</Link></li>
            <li><Link href="/" className="transition hover:text-black hover:underline font-bold text-md">Terms & Conditions</Link></li>
          </ul>
        </div>


        <div>
          <h3 className="w-fit mx-auto py-2 px-4 rounded-t-xl  flex items-center justify-center gap-3 mb-4 text-lg font-bold text-center bg-gray-600 text-white">
            <SquareMousePointer size={18} />
            Get in Touch</h3>
          <div className="space-y-4 text-sm text-gray-700 ">
            <p className="flex items-center justify-center gap-3 font-bold text-md">

              support@estore.com
            </p>
            <p className="flex items-center justify-center gap-3 font-bold text-md">

              +92 311 0516857
            </p>
            <p className="flex items-center justify-center gap-3 font-bold text-md">

              Pakistan
            </p>
          </div>
        </div>

      </div>


      <div className="border-t border-gray-400/50 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-gray-700 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>
          <p>Built for best shopping experience</p>
        </div>
      </div>

    </footer>
  );
}

export default FooterNavbar;