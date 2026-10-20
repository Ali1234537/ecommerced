"use client"
import { LoaderCircle, LogOut, Trash, Pencil } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProduct, removeProduct, editProduct } from "@/redux/features/product/productSlice";

import Toast from "@/components/Toast";

function Admin() {
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    const isadmin = localStorage.getItem("Admin") === "true";
    if (!isadmin) {
      window.location.replace("/isAdmin");
    } else {
      //setCheckUser(false);
      setTimeout(() => {
        setCheckUser(false)
      }, 1000)
    }
  }, []);


  const products = useAppSelector((state) => state.product.Products);
  const dispatch = useAppDispatch();

  const [showToast , setShowToast] = useState(false);

  const[toastMsg , setToastMsg] = useState("");

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [category, setCategory] = useState("");

  const [detail, setDetail] = useState("");

  const [image, setImage] = useState("");

  function handleProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const productToAdd = {
      id: editingProductId ?? Math.max(0, ...products.map((product) => product.id)) + 1,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category.trim(),
      detail: detail.trim(),
      image: image.trim(),
    };
    
    

    if (editingProductId !== null) {
      dispatch(editProduct(productToAdd));
      setEditingProductId(null);
      setToastMsg("Product Edited Successfully!");
    } else {
      dispatch(addProduct(productToAdd));
      setToastMsg("Product Added Successfully!");
    }

    setShowToast(true);

    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setDetail("");
    setImage("");
    setEditingProductId(null);

  }

  function handleLogout() {
    localStorage.removeItem("Admin");
    window.location.replace("/isAdmin")
  }
  if (checkUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-10">
      <Toast message={toastMsg}
       show = {showToast}
       onClose={()=> setShowToast(false)}
       />

      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center justify-center rounded-2xl border border-slate-200 bg-gray-700  p-5 shadow-sm sm:p-6">
          <h1 className="w-full text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Admin Dashboard
          </h1>
          {/*<button type="button"
          title="Logout from Admin"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-rose-700 hover:shadow-md">
              <LogOut size={21}/>

            Logout
          </button>*/}
        </div>
        <p className="mb-8 px-1 text-lg text-bold font-medium text-black text-center">
          Manage your  Products from this Admin Dashboard
        </p>


        <form onSubmit={handleProduct} className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-6 border-b border-slate-100 pb-4 text-xl font-bold text-slate-900">
            {editingProductId !== null ? "Edit Product" : "Add Product"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-black outline-none transition placeholder:text-gray-700 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
            <input
              required
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 outline-none transition placeholder:text-gray-700 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
            <input
              required
              type="number"
              min="0"
              step="1"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 outline-none transition placeholder:text-gray-700 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-700 outline-none focus:border-blue-500 cursor-pointer">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothes</option>
              <option value="Footwear">Footwear</option>
              <option value="Bags">Bags</option>
              <option value="Accessories">Accessories</option>
              <option value="Beauty">Beauty</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Grocery">Grocery</option>
              <option value= "Books & Stationery">Books & Stationery</option>
              <option value = "Furniture">Furniture</option>
              <option value = "Home Appliances">Home Appliances</option>
              <option value = "Pet Supplies">Pet Supplies</option>
              <option value ="Fitness & Exercise">Fitness & Exercise</option>
              <option value = "Travel & Luggage">Travel & Luggage</option>
              <option value = "Food & Beverages">Food & Beverages</option>
              <option value="Art">Art</option>
              <option value = "Office">Office</option>
              <option value = "Digital Products">Digital Products</option>
            </select>
            <input
              required
              type="url"
              placeholder="Product image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 outline-none transition placeholder:text-gray-700 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 sm:col-span-2"
            />
            <textarea
              required
              placeholder="Product description"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 outline-none transition placeholder:text-gray-700 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 sm:col-span-2"
              rows={3}
            />
          </div>

          <button type="submit" className="mt-6 cursor-pointer rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-700 hover:shadow-md">
            {editingProductId !== null ? "Save Edited Product" : "Add Product"}
            
          </button>
        </form>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Manage Products
            </h2>

            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Total Products: {products.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-gray-600 text-xs font-bold uppercase tracking-wider text-white">
                  <th className="p-3">Image</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 transition-colors duration-150 last:border-0 hover:bg-emerald-50/40"
                  >
                    <td className="p-3">
                      <img src={product.image}
                        alt={product.name}
                        width={70}
                        height={60}
                        className="h-16 w-16 rounded-xl border border-slate-100 bg-white p-1.5 object-contain"
                      />
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {product.name}
                    </td>

                    <td className="p-3 font-semibold text-slate-800">
                      ${product.price.toLocaleString()}
                    </td>

                    <td className="p-3 font-semibold text-slate-800">
                      {product.stock}
                    </td>

                    <td className="p-3 text-sm text-slate-600">
                      {product.category}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button type="button"
                        title="Edit"
                          onClick={() => {
                            setEditingProductId(product.id)
                            setName(product.name)
                            setPrice(String(product.price))
                            setStock(String(product.stock))
                            setCategory(product.category)
                            setDetail(product.detail)
                            setImage(product.image)
                          }} className="flex items-center gap-2  cursor-pointer whitespace-nowrap rounded-lg border border-sky-200 bg-sky-50 px-2 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100">
                          <Pencil size={18} />

                        </button>
                        <button
                        title="Remove"
                          type="button"
                          onClick={() => {
                            dispatch(removeProduct(product.id));
                          }}
                          className=" flex items-center gap-2  cursor-pointer whitespace-nowrap rounded-lg border border-rose-200 bg-rose-50 px-2 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                        >
                          <Trash size={18} />

                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500"
                    >
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <div className="mt-6 flex justify-end">
          <button type="button"
            title="Logout from Admin"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-rose-700 hover:shadow-md">
            <LogOut size={21} />

            Logout
          </button>
        </div>
      </div>
    </main>
  )
}

export default Admin;