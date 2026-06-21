"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const [editingProductId, setEditingProductId] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));

    const productList = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    setProducts(productList);
  };

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));

    const orderList = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    setOrders(orderList);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      const adminsSnapshot = await getDocs(collection(db, "admins"));

      const admins = adminsSnapshot.docs.map(
        (document) => document.data().email
      );

      if (admins.includes(user.email)) {
        setIsAdmin(true);
      }

      setCheckingAdmin(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setBrand("");
    setCategory("");
    setDescription("");
    setStock("");
    setEditingProductId(null);
  };

  const addProduct = async () => {
  if (!name || !price || !image) {
    alert("Please fill Product Name, Price and Image URL");
    return;
  }

  setEditingProductId(null);

    await addDoc(collection(db, "products"), {
      name,
      price,
      image,
      brand,
      category,
      description,
      stock,
      createdAt: new Date(),
    });

    resetForm();
    fetchProducts();
  };

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setName(product.name || "");
    setPrice(product.price || "");
    setImage(product.image || "");
    setBrand(product.brand || "");
    setCategory(product.category || "");
    setDescription(product.description || "");
    setStock(product.stock || "");
  };

  const updateProduct = async () => {
    if (!editingProductId) return;

    const productRef = doc(db, "products", editingProductId);

    await updateDoc(productRef, {
      name,
      price,
      image,
      brand,
      category,
      description,
      stock,
      updatedAt: new Date(),
    });

    resetForm();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + (order.total || 0);
  }, 0);

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const averageOrderValue =
    orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const totalStock = products.reduce((sum, product) => {
    return sum + Number(product.stock || 0);
  }, 0);

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock || 0) > 0 && Number(product.stock || 0) <= 5
  );

  const topProductsMap = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      if (!topProductsMap[item.name]) {
        topProductsMap[item.name] = 0;
      }

      topProductsMap[item.name] += item.quantity || 1;
    });
  });

  const topProducts = Object.entries(topProductsMap)
    .map(([name, quantity]) => ({
      name,
      quantity,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const recentOrders = [...orders].slice(-5).reverse();

  if (checkingAdmin) {
    return <h1 className="p-10">Checking Access...</h1>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black px-4 md:px-10 py-10 md:py-20">
     <h1 className="text-3xl md:text-5xl font-bold mb-10">Admin Dashboard</h1>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h2>
          <p>Total Revenue</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">{processingOrders}</h2>
          <p>Processing Orders</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">{shippedOrders}</h2>
          <p>Shipped Orders</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">{deliveredOrders}</h2>
          <p>Delivered Orders</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">
            ₹{averageOrderValue.toLocaleString("en-IN")}
          </h2>
          <p>Average Order Value</p>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-3xl font-bold">{totalStock}</h2>
          <p>Total Stock</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="border rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Top Selling Products</h2>

          {topProducts.length === 0 ? (
            <p>No sales yet.</p>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {index + 1}. {product.name}
                  </span>
                  <b>{product.quantity} sold</b>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <p>No recent orders.</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-b pb-3">
                  <p>
                    <b>Order:</b> #{order.id.slice(0, 6).toUpperCase()}
                  </p>
                  <p>
                    <b>Total:</b> ₹{order.total?.toLocaleString("en-IN")}
                  </p>
                  <p>
                    <b>Status:</b> {order.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="border border-red-300 bg-red-50 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Low Stock Alerts
          </h2>

          <div className="space-y-2">
            {lowStockProducts.map((product) => (
              <p key={product.id}>
                {product.name} has only <b>{product.stock}</b> left.
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="border rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-6">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          placeholder="Price e.g. ₹999"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        {editingProductId ? (
          <div className="flex gap-4">
            <button
              onClick={updateProduct}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Save Changes
            </button>

            <button
              onClick={resetForm}
              className="border px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={addProduct}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Add Product
          </button>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-6">All Products</h2>

      <div className="grid md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-2xl p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />

            <h3 className="text-xl font-bold mt-4">{product.name}</h3>
            <p>{product.price}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm">Stock: {product.stock}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => startEdit(product)}
                className="text-blue-600 font-bold"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}