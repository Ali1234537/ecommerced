"use client";
import ProductCard from "@/components/ProductCards";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";




function MainScreen() {

  const products = useAppSelector((state) => (
    state.product.Products
  ))

  

  return (
   
    <div className="min-h-screen bg-white">
     

      <div className="relative h-[300px] w-full sm:h-[350px] md:h-[400px]">
        <Image
          src="/bannerid1.jpg"
          alt="Banner"
          fill
          className="object-cover"
        />


        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="rounded-xl bg-white/20 px-4 py-4 sm:px-8 sm:py-6">
            <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-black drop-shadow-sm sm:text-4xl md:text-5xl font-serif">
              Welcome to  E-Store
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-base font-bold text-black drop-shadow-sm sm:text-lg font-serif">
              Discover a wide range of products at unbeatable prices.
            </p>

            <Link
              href="/products"
              className="inline-block rounded-lg bg-gray-700 px-6 py-3 text-md font-semibold text-white shadow-md transition duration-200 hover:bg-black sm:text-base font-sans"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
      <section className="px-4 py-6 sm:p-6 md:p-8">
        <h2 className="mx-auto w-fit max-w-full rounded-t-lg bg-gray-800 px-4 py-2 text-center text-xl font-bold text-white sm:px-6 sm:text-2xl">Featured Products</h2>
        <div className="mt-6 grid grid-cols-1 justify-items-center gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {[...products].slice(-10).reverse().map((product,index)=>(
            <ProductCard
              key={product.id}
              product={product}
              isNew = {index === 0}
              />
          ))}



        </div>
      </section>



    </div>
  );
}

export default MainScreen;