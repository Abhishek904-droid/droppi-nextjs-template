"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
const [selectedColor, setSelectedColor] = useState("Black");

  const fetchProduct = async () => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      setProduct({ id: productSnap.id, ...productSnap.data() });
    }
  };

  const fetchReviews = async () => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("productId", "==", id)
    );

    const querySnapshot = await getDocs(reviewsQuery);

    const reviewList = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    setReviews(reviewList);
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const addReview = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!comment) {
      alert("Please write a review");
      return;
    }

    await addDoc(collection(db, "reviews"), {
      productId: id,
      userEmail: user.email,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    });

    setComment("");
    setRating("5");
    fetchReviews();

    alert("Review added");
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  if (!product) {
    return (
      <main className="min-h-screen px-10 py-20">
        <h1 className="text-3xl font-bold">Loading product...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black px-10 py-20">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-3xl shadow-xl"
        />

        <div>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">{product.price}</p>

          <p className="mb-4">
            ⭐ Average Rating: <b>{averageRating}/5</b> ({reviews.length} reviews)
          </p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <p className="mb-2">
            <b>Category:</b> {product.category}
          </p>

       <p className="mb-4">
  <b>Stock:</b> {product.stock}
</p>

<div className="mb-4">
  <p className="font-bold mb-2">Size</p>

  <div className="flex gap-2">
    {["S", "M", "L", "XL"].map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-4 py-2 border rounded-lg ${
          selectedSize === size
            ? "bg-black text-white"
            : ""
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>

<div className="mb-8">
  <p className="font-bold mb-2">Color</p>

  <div className="flex gap-2">
    {["Black", "White", "Red"].map((color) => (
      <button
        key={color}
        onClick={() => setSelectedColor(color)}
        className={`px-4 py-2 border rounded-lg ${
          selectedColor === color
            ? "bg-black text-white"
            : ""
        }`}
      >
        {color}
      </button>
    ))}
  </div>
</div>

          {Number(product.stock) > 0 ? (
            <button
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];

                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    ...cart,
                   {
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1,
  size: selectedSize,
  color: selectedColor,
}
                  ])
                );

                router.push("/cart");
              }}
              className="px-8 py-4 bg-black text-white rounded-xl"
            >
              Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="px-8 py-4 bg-gray-400 text-white rounded-xl"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>

      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        <div className="border rounded-2xl p-6 mb-10">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-3 rounded-xl mb-4 w-full"
          >
            <option value="5">⭐⭐⭐⭐⭐ - 5 Stars</option>
            <option value="4">⭐⭐⭐⭐ - 4 Stars</option>
            <option value="3">⭐⭐⭐ - 3 Stars</option>
            <option value="2">⭐⭐ - 2 Stars</option>
            <option value="1">⭐ - 1 Star</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-4 rounded-xl mb-4"
            rows="4"
          />

          <button
            onClick={addReview}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Submit Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-2xl p-6">
                <p className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </p>

                <p className="mt-2">{review.comment}</p>

                <p className="text-sm text-gray-500 mt-2">
                  By {review.userEmail}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}