export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-10">
      <div className="max-w-xl text-center border rounded-3xl p-10 shadow-xl">
        <div className="text-6xl mb-6">✅</div>

        <h1 className="text-4xl font-bold mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with Droppi. Your order has been received.
        </p>

        <p className="font-bold mb-8">
          Order ID: #DRP1001
        </p>

        <a
          href="/shop"
          className="bg-black text-white px-8 py-4 rounded-xl inline-block"
        >
          Continue Shopping
        </a>
      </div>
    </main>
  );
}