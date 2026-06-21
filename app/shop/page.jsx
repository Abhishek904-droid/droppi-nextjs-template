"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));

    const productList = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    setProducts(productList);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const matchesBrand =
        brandFilter === "All" ||
        product.brand === brandFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand
      );
    })
    .sort((a, b) => {
      const priceA = Number(
        String(a.price).replace("₹", "").replace(",", "")
      );

      const priceB = Number(
        String(b.price).replace("₹", "").replace(",", "")
      );

      if (sortBy === "low-high") {
        return priceA - priceB;
      }

      if (sortBy === "high-low") {
        return priceB - priceA;
      }

      return 0;
    });

  return (
    <main className="min-h-screen bg-white text-black px-4 md:px-10 py-10 md:py-20">
     <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Shop All Products
      </h1>

      <p className="text-gray-600 mb-10">
        Discover sneakers, streetwear, and premium fashion essentials.
      </p>

      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredProducts.length} product
        {filteredProducts.length !== 1 ? "s" : ""}
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-4 rounded-xl"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-4 rounded-xl"
        >
          <option value="All">All Categories</option>
          <option value="Streetwear">Streetwear</option>
          <option value="Shoes">Shoes</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Accessories">Accessories</option>
        </select>

        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="border p-4 rounded-xl"
        >
          <option value="All">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
          <option value="Crocs">Crocs</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-4 rounded-xl"
        >
          <option value="default">Sort By</option>
          <option value="low-high">
            Price: Low to High
          </option>
          <option value="high-low">
            Price: High to Low
          </option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((product) => (
          <a
            key={product.id}
            href={`/product-details/${product.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition block"
          >
          <img
  src={product.image}
  alt={product.name}
  className="w-full h-40 md:h-64 object-cover"
/>

<div className="p-4">
              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-yellow-500">
                ⭐⭐⭐⭐⭐
              </p>

             <p>{product.price}</p>

<p className="text-sm text-gray-500">
  {product.brand}
</p>

<p className="text-sm mt-1">
  Stock: {product.stock}
</p>

{Number(product.stock) > 0 ? (
<button
    onClick={(e) => {
      e.preventDefault();

      const productData = {
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1,
};

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, productData])
      );

      window.location.href = "/cart";
    }}
    className="mt-3 w-full bg-black text-white py-2 rounded-lg"
  >
    Add to Cart
  </button>
) : (
  <button
    disabled
    className="mt-3 w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
  >
    Out of Stock
  </button>
)}
<button
  onClick={async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    await addDoc(collection(db, "wishlist"), {
      userEmail: user.email,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      createdAt: new Date(),
    });

    alert("Added to Wishlist");
  }}
  className="mt-2 w-full border py-2 rounded-lg"
>
  ❤️ Add to Wishlist
</button>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}