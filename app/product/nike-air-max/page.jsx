"use client";

import { useRouter } from "next/navigation";

export default function NikePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <img
          src="/images/products/nike.jpg"
          alt="Nike Air Max"
          className="w-full rounded-3xl shadow-xl"
        />

        <div>
          <p className="text-sm text-gray-500 mb-2">Nike</p>
          <h1 className="text-5xl font-bold mb-4">Nike Air Max</h1>
          <p className="text-2xl font-semibold mb-6">₹5,999</p>

          <p className="text-gray-600 mb-8">
            Classic Nike Air Max sneakers with streetwear style, premium comfort,
            and everyday fashion appeal.
          </p>

          <h3 className="font-bold mb-3">Select Size</h3>

          <div className="flex gap-3 mb-8">
            {["7", "8", "9", "10"].map((size) => (
              <button key={size} className="border px-5 py-3 rounded-lg">
                {size}
              </button>
            ))}
          </div>

         <div className="flex gap-4">
<button
  onClick={() => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          name: "Nike Air Max",
          price: "₹5,999",
          image: "/images/products/nike.jpg",
        },
      ])
    );

    router.push("/cart");
  }}
  className="px-8 py-4 bg-black text-white rounded-xl"
>
  Add to Cart
</button>
  <button className="px-8 py-4 border rounded-xl">
    ❤️ Wishlist
  </button>
</div>
        </div>
      </div>
    </main>
  );
}