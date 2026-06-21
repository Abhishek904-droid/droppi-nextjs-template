"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    alert("Logged Out");
  };

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">My Account</h1>

      {user ? (
        <div className="border rounded-2xl p-8 max-w-xl">
          <h2 className="text-2xl font-bold mb-4">
            Welcome
          </h2>

          <p className="mb-6">
            <b>Email:</b> {user.email}
          </p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="border rounded-2xl p-8 max-w-xl">
          <h2 className="text-2xl font-bold mb-4">
            Not Logged In
          </h2>

          <a
            href="/login"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Login
          </a>
        </div>
      )}
    </main>
  );
}