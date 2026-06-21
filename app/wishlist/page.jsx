"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const fetchWishlist = async (email) => {
    const wishlistQuery = query(
      collection(db, "wishlist"),
      where("userEmail", "==", email)
    );

    const querySnapshot = await getDocs(wishlistQuery);

    const list = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    setWishlist(list);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        fetchWishlist(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const removeWishlist = async (id) => {
    await deleteDoc(doc(db, "wishlist", id));
    fetchWishlist(userEmail);
  };

  if (!userEmail) {
    return (
      <main className="min-h-screen bg-white text-black px-10 py-20">
        <h1 className="text-5xl font-bold mb-6">My Wishlist ❤️</h1>
        <p>Please login to view your wishlist.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>No wishlist products found.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-2xl p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl"
              />

              <h2 className="text-xl font-bold mt-4">{item.name}</h2>
              <p>{item.price}</p>

              <a
                href={`/product-details/${item.productId}`}
                className="block text-center mt-4 bg-black text-white py-3 rounded-xl"
              >
                View Product
              </a>

              <button
                onClick={() => removeWishlist(item.id)}
                className="mt-4 text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}