"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const getPriceNumber = (price) => {
    return Number(price.replace("₹", "").replace(",", ""));
  };

  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const increaseQty = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity = (newCart[index].quantity || 1) + 1;
    updateCart(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cartItems];
    newCart[index].quantity = Math.max((newCart[index].quantity || 1) - 1, 1);
    updateCart(newCart);
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + getPriceNumber(item.price) * (item.quantity || 1);
  }, 0);

  const shipping = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>

          <a
            href="/shop"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 border rounded-2xl p-6 mb-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div>
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="text-xl font-semibold mt-2">{item.price}</p>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => decreaseQty(index)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() => increaseQty(index)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const updatedCart = cartItems.filter((_, i) => i !== index);
                      updateCart(updatedCart);
                    }}
                    className="mt-4 text-red-500 font-bold"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <a
              href="/checkout"
              className="block text-center mt-6 bg-black text-white py-3 rounded-xl"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      )}
    </main>
  );
}