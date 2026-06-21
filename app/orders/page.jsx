"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const trackingSteps = [
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const getStatusColor = (status) => {
    if (status === "Processing") return "bg-yellow-100 text-yellow-700";
    if (status === "Packed") return "bg-blue-100 text-blue-700";
    if (status === "Shipped") return "bg-purple-100 text-purple-700";
    if (status === "Out for Delivery") return "bg-orange-100 text-orange-700";
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email);

        const ordersQuery = query(
          collection(db, "orders"),
          where("customerEmail", "==", user.email)
        );

        const querySnapshot = await getDocs(ordersQuery);

        const orderList = querySnapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setOrders(orderList);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userEmail) {
    return (
      <main className="min-h-screen bg-white text-black px-10 py-20">
        <h1 className="text-5xl font-bold mb-6">My Orders</h1>
        <p>Please login to view your orders.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStepIndex = trackingSteps.indexOf(order.status);

            return (
              <div key={order.id} className="border rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-2">
                  Order #{order.id.slice(0, 6).toUpperCase()}
                </h2>

                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <p className="text-gray-600 mb-4">
                  Total: <b>₹{order.total?.toLocaleString("en-IN")}</b>
                </p>

                {order.status === "Cancelled" ? (
                  <p className="text-red-600 font-bold mb-6">
                    This order has been cancelled.
                  </p>
                ) : (
                  <div className="mb-6">
                    <h3 className="font-bold mb-3">Tracking</h3>

                    <div className="grid md:grid-cols-5 gap-3">
                      {trackingSteps.map((step, index) => (
                        <div
                          key={step}
                          className={`border rounded-xl p-3 text-center ${
                            index <= currentStepIndex
                              ? "bg-black text-white"
                              : "bg-white text-gray-400"
                          }`}
                        >
                          <p className="font-bold">
                            {index <= currentStepIndex ? "✓" : "○"}
                          </p>
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h3 className="font-bold mb-3">Items:</h3>

                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.price} × {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}