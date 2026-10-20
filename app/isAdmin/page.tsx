"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
function AdminLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showToast , setShowToast]= useState(false);


    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "123456789") {
            localStorage.setItem("Admin", "true");
            setShowToast(true);
             
            setTimeout(()=>{
                router.push("/admin")
            },1500)
        } else {
            setError("Invalid Email or password!")
        }
    }
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
            <Toast message = "Admin Login Successful!"
             show = {showToast}
             onClose={()=> setShowToast(false)}
             />

            <form onSubmit={handleLogin}
                className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-center text-3xl font-bold text-gray-800">
                    Admin Login
                </h1>
                 <p className="text-center text-lg font-bold text-gray-900">
                    Login to Manage your Store
                 </p>

                <div>
                    <label className="mb-2 block text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                        className="w-full rounded-lg border p-3 text-gray-900"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                        className="w-full rounded-lg border p-3 text-gray-900"
                    />
                </div>

                {error && (
                    <p className="text-red-600 text-lg">
                        {error}
                    </p>
                )}

                <button type="submit"
                    className="w-full rounded-lg bg-black p-3 font-semibold text-white hover:bg-gray-800">
                    Login as Admin
                </button>

                <Link href="/" className="flex text-center py-3 w-full justify-center bg-gray-600 rounded-lg text-white">
                   Back Home
                </Link>
            </form>
        </main>
    );
}

export default AdminLogin;