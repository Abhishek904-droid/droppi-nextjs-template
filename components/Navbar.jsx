"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, User, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/droppi-logo.jpeg"
            alt="Droppi logo"
            width={45}
            height={45}
            className="rounded-full"
          />
          <span className="text-2xl font-black tracking-widest">
            DROPPI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/product/nike-air-max">Products</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/login">Login</Link>
          <Link href="/account">Account</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/admin-orders">Admin Orders</Link>
        </div>

        <div className="flex items-center gap-4">
          <Search size={22} />
          <Heart size={22} />
          <Link href="/cart">
            <ShoppingBag size={22} />
          </Link>
          <User size={22} />
        </div>
      </nav>
    </header>
  );
}