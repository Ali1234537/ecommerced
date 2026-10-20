
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/Toast";

 function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[showToast , setShowToast] = useState(false);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

     
    localStorage.setItem("Customer", "true");
    localStorage.setItem("CustomerEmail", email.trim().toLowerCase());

    if (!localStorage.getItem("CustomerId")) {
      localStorage.setItem("CustomerId", crypto.randomUUID());
    }
   
    setShowToast(true);
     
    const location = new URLSearchParams(window.location.search);
    const goto = location.get("redirect");
     
    setTimeout(()=>{
      if(goto === "/checkout"){
        router.push("/checkout");
      }else{
        router.push("/products");
      }
    },2000);
    
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <Toast message="User Login Successful!"
      show = {showToast}
      onClose={()=> setShowToast(false)}
      />

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Customer Login
        </h1>
        {/*<h2 className="text-center text-2xl font-bold text-black">
          LogIn To place Order
        </h2>*/}

        <div>
          <label className="mb-2 block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-800 p-3 font-semibold text-white hover:bg-black cursor-pointer"
        >
          Login
        </button>

        <Link href="/" className="flex justify-center w-full text-center py-3 bg-gray-600 rounded-lg text-white">
          Back Home
        </Link>
      </form>
    </main>
  );
}

export default Login;
