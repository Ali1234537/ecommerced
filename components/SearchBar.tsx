
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

import {ShieldAlert} from "lucide-react";

 function SearchBar() {
  const [query, setQuery] = useState("");

  const products = useAppSelector(
    (state) => state.product.Products
  );

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md">
       
      <div className="flex items-center gap-4 rounded-xl border border-gray-500 bg-gradient-to-r from-blue-50 via-white to-purple-50 px-4 py-2 shadow-sm focus-within:border-gray-600 focus-within:ring-2 focus-within:ring-gray-300">
        <Search size={15} className="shrink-0 text-gray-800" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Discover E-Store..."
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-500"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-md font-semibold text-gray-800 hover:text-black cursor-pointer"
          >
            🗙
          </button>
        )}
      </div>

       
      {query.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/details?id=${product.id}`}
                onClick={() => setQuery("")}
                className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 text-black transition hover:bg-orange-50"
              >
                <div className="flex items-center gap-3">
                  <Image
                   src={product.image}
                   alt={product.name}
                   width={50}
                   height={50}
                   className="shrink-0 rounded-lg object-contain"
                   />
                   <div>
                     <p className="font-semibold">
                         {product.name}
                     </p>

                      <p className="text-xs text-gray-500">
                         {product.category}
                     </p>
                  </div>
                </div>

                <span className="whitespace-nowrap text-sm font-bold text-gray-800">
                  ${product.price}
                </span>
              </Link>
            ))
          ) : (
            <p className=" flex items-center justify-center gap-1  px-4 py-5 text-center text-md font-medium text-red-600 bg-red-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <ShieldAlert className="w-7 h-7 shrink-0"/>
                </span>
              Product does not exist.
            </p>
          )}

        </div>
      )}
    </div>
  );
}


export default SearchBar;