"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const getPriceNumber = (price) => {
    return Number(price.replace("₹", "").replace(",", ""));
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + getPriceNumber(item.price) * (item.quantity || 1);
  }, 0);

  const shipping = cartItems.length > 0 ? 99 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount + shipping;

  const applyCoupon = () => {
    const code = coupon.toUpperCase();

    if (code === "WELCOME10") {
      setDiscountPercent(10);
      alert("Coupon applied: 10% off");
    } else if (code === "EKIER20") {
      setDiscountPercent(20);
      alert("Coupon applied: 20% off");
    } else {
      setDiscountPercent(0);
      alert("Invalid coupon");
    }
  };

  const placeOrder = async () => {
    if (!fullName || !userEmail || !phone || !address) {
      alert("Please fill all shipping details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    for (const item of cartItems) {
      const productRef = doc(db, "products", item.id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const currentStock = Number(productSnap.data().stock || 0);
        const orderedQty = item.quantity || 1;
        const newStock = Math.max(currentStock - orderedQty, 0);

        await updateDoc(productRef, {
          stock: newStock,
        });
      }
    }

    await addDoc(collection(db, "orders"), {
      customerName: fullName,
      customerEmail: userEmail,
      phone,
      address,
      items: cartItems,
      subtotal,
      shipping,
      coupon: coupon.toUpperCase(),
      discountPercent,
      discountAmount,
      total,
      status: "Processing",
      createdAt: new Date(),
    });

    localStorage.removeItem("cart");
    router.push("/order-success");
  };

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-4 rounded-lg mb-4"
          />

          <input
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border p-4 rounded-lg mb-4"
          />

          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-4 rounded-lg mb-4"
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-4 rounded-lg mb-4"
            rows="4"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="border rounded-2xl p-6">
            <div className="flex gap-3 mb-6">
              <input
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border p-3 rounded-xl flex-1"
              />

              <button
                onClick={applyCoupon}
                className="bg-black text-white px-5 rounded-xl"
              >
                Apply
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Try: WELCOME10 or EKIER20
            </p>

            <div className="flex justify-between mb-4">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Discount</span>
              <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
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

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-black text-white py-4 rounded-xl"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}