"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));

    const orderList = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    setOrders(orderList);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    const orderRef = doc(db, "orders", orderId);

    await updateDoc(orderRef, {
      status,
    });

    fetchOrders();
  };

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-2">
                Order #{order.id.slice(0, 6).toUpperCase()}
              </h2>

              <p><b>Customer:</b> {order.customerName}</p>
              <p><b>Email:</b> {order.customerEmail}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
              <p><b>Total:</b> ₹{order.total?.toLocaleString("en-IN")}</p>
              <p><b>Status:</b> {order.status}</p>

              <h3 className="font-bold mt-4 mb-2">Items:</h3>

              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
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

              <div className="mt-6">
                <label className="font-bold block mb-2">
                  Update Order Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border p-3 rounded-xl w-full md:w-80"
                >
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}