"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Login / Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button
          onClick={login}
          className="w-full bg-black text-white py-4 rounded-xl mb-3"
        >
          Sign In
        </button>

        <button
          onClick={signup}
          className="w-full border py-4 rounded-xl"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}