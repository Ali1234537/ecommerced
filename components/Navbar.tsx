"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import {
  ShoppingCart,
  UserRoundCheck,
  Menu,
  X,
  House,
  Package,
  KeyRound,
  CircleUserRound,
  ShieldUser,
  LogOut
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";

function Navbar() {
  const router = useRouter();
  const Pathname = usePathname();

  const [loginOptions, setLoginOptions] = useState(false);
  const [customerLoggedIn, setCustomerLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setCustomerLoggedIn(
      localStorage.getItem("Customer") === "true"
    );
  }, [Pathname]);

  useEffect(() => {
    setMobileMenu(false);
    setLoginOptions(false);
  }, [Pathname]);

  function handleLogout() {
    localStorage.removeItem("Customer");
    localStorage.removeItem("CustomerEmail");
    localStorage.removeItem("CustomerPassword");
    localStorage.removeItem("CustomerId");

    setCustomerLoggedIn(false);
    setLoginOptions(false);
    setMobileMenu(false);

    router.push("/");
  }

  const link = (path: string) =>
    Pathname === path
      ? "flex justify-center items-center whitespace-nowrap rounded-lg bg-gray-600 px-3 py-2 text-sm font-semibold text-white border border-gray-300"
      : "flex justify-center items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm text-black font-semibold hover:bg-gray-600 hover:text-white border  border-gray-300 ";

  const CartItems = useAppSelector(
    (state) => state.cart.items
  );

  const cartCount = CartItems.length;

  function closeMenus() {
    setMobileMenu(false);
    setLoginOptions(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 shadow-md">
      <div className="relative mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8">


        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logoed1.png"
            alt="Logo"
            width={120}
            height={100}
            priority
            className="h-auto w-28 shrink-0 object-contain sm:w-24 lg:w-28"
          />
        </Link>


        <div className="hidden items-center gap-1 md:flex lg:gap-4">
          <Link href="/" className={link("/")}>
            <House size={18} className="mr-2"/>
            HOME
          </Link>

          <Link href="/products" className={link("/products")}>
            <Package size={18} className="mr-2"/>
            PRODUCTS
          </Link>

          <Link
            href="/cart"
            className={`relative gap-2 ${link("/cart")}`}
          >
            <ShoppingCart size={19} />

            <span className="relative flex items-center">
              Cart

              {cartCount > 0 && (
                <span className="absolute -right-5 -top-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <SearchBar />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">


          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOptions(!loginOptions)}
              aria-expanded={loginOptions}
              className={`flex cursor-pointer items-center justify-center bg-gray-600 text-white font-semibold ${customerLoggedIn ? "h-10 w-10 p-2 rounded-lg" : "rounded-xl px-4 py-2"}`}
            >
              {customerLoggedIn ? (
                <span
                  className="flex items-center justify-center"
                  title="LoggedIn"
                >
                  <UserRoundCheck size={22} />
                </span>
              ) : (
                <>
                 <KeyRound size={18} className="mr-2"/>
                   Login
                </>
              )}
            </button>

            {loginOptions && (
              <div className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-lg border border-white bg-gray-700 shadow-lg">

                {customerLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Logout"
                    className="flex items-center gap-2 w-full cursor-pointer px-4 py-3 text-center text-white hover:bg-gray-600"
                  >
                     <LogOut size={23} className="mr-2"/> 
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    title="Login as Customer"
                    className="flex items-center gap-2 cursor-pointer px-4 py-3 font-sans  text-white hover:bg-gray-600 text-center"
                  >
                    <CircleUserRound size={23} className="mr-2"/>
                    Login as User
                  </Link>
                )}

                <Link
                  href="/isAdmin"
                  onClick={closeMenus}
                  title="Login as Admin"
                  className="flex items-center gap-2 cursor-pointer border-t px-4 py-3 font-sans  text-white hover:bg-gray-600 text-center"
                >
                  <ShieldUser size={23} className="mr-2"/>
                  Login as Admin
                </Link>
              </div>
            )}
          </div>


          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={
              mobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenu}
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-800 md:hidden cursor-pointer"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>


      {mobileMenu && (
        <div className="absolute right-3 top-full z-50 flex w-56 flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg sm:right-6 md:hidden">
          <Link
            href="/"
            onClick={closeMenus}
            className={link("/")}
          >
            <House size={18} className="mr-2"/>
            HOME
          </Link>

          <Link
            href="/products"
            onClick={closeMenus}
            className={link("/products")}
          >
            <Package size={18} className="mr-2"/>
            PRODUCTS
          </Link>

          <Link
            href="/cart"
            onClick={closeMenus}
            className={link("/cart")}
          >
            <ShoppingCart size={18} className="mr-2" />
            Cart ({cartCount})
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;