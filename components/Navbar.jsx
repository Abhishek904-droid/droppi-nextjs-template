"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, User, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/images/droppi-logo.jpeg"
            alt="Droppi logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl md:text-2xl font-black tracking-widest">
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

        <div className="hidden md:flex items-center gap-4">
          <Link href="/shop">
  <Search size={22} />
</Link>
          <Link href="/wishlist"><Heart size={22} /></Link>
          <Link href="/cart"><ShoppingBag size={22} /></Link>
          <Link href="/account"><User size={22} /></Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-6 space-y-4 font-medium">
          <Link onClick={() => setMenuOpen(false)} href="/" className="block">Home</Link>
          <Link onClick={() => setMenuOpen(false)} href="/shop" className="block">Shop</Link>
          <Link onClick={() => setMenuOpen(false)} href="/product/nike-air-max" className="block">Products</Link>
          <Link onClick={() => setMenuOpen(false)} href="/wishlist" className="block">Wishlist</Link>
          <Link onClick={() => setMenuOpen(false)} href="/orders" className="block">Orders</Link>
          <Link onClick={() => setMenuOpen(false)} href="/cart" className="block">Cart</Link>
          <Link onClick={() => setMenuOpen(false)} href="/login" className="block">Login</Link>
          <Link onClick={() => setMenuOpen(false)} href="/account" className="block">Account</Link>
          <Link onClick={() => setMenuOpen(false)} href="/admin" className="block">Admin</Link>
          <Link onClick={() => setMenuOpen(false)} href="/admin-orders" className="block">Admin Orders</Link>
        </div>
      )}
    </header>
  );
}