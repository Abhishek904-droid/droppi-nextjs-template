export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="bg-black/80 backdrop-blur-xl p-12 rounded-3xl text-white max-w-3xl shadow-2xl">
          <h1 className="text-8xl font-black mb-4 tracking-widest">
            DROPPI
          </h1>

          <p className="text-xl mb-6">
            The future of fashion. Discover premium brands, sneakers,
            streetwear and luxury essentials in one place.
          </p>

          <input
            type="text"
            placeholder="Search Nike, Adidas, Puma, Crocs..."
            className="w-full px-5 py-4 rounded-xl text-black mb-6"
          />

          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-lg">
              Shop Now
            </button>

            <button className="px-6 py-3 border border-white rounded-lg">
              Explore Brands
            </button>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Featured Brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-8 border rounded-2xl text-center font-bold text-xl hover:bg-black hover:text-white transition duration-300 cursor-pointer">
  Nike
</div>
          <div className="p-8 border rounded-2xl text-center font-bold text-xl hover:bg-black hover:text-white transition duration-300 cursor-pointer">
  Adidas
</div>
         <div className="p-8 border rounded-2xl text-center font-bold text-xl hover:bg-black hover:text-white transition duration-300 cursor-pointer">
  Puma
</div>
          <div className="p-8 border rounded-2xl text-center font-bold text-xl hover:bg-black hover:text-white transition duration-300 cursor-pointer">
  Crocs
</div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 px-10 bg-gray-50">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Trending Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
 ["Nike Air Max", "₹5,999", "/images/products/nike.jpg", "/product/nike-air-max"],
  ["Adidas Superstar", "₹4,999", "/images/products/adidas.jpg", "/product/adidas-superstar"],
  ["Puma RS-X", "₹5,499", "/images/products/puma.jpg", "/product/puma-rs-x"],
  ["Crocs Classic", "₹2,999", "/images/products/crocs.jpg", "/product/crocs-classic"],
].map((product) => (
            <div
              key={product[0]}
              className="bg-white rounded-2xl overflow-hidden shadow-lg relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                SALE
              </div>

              <img
                src={product[2]}
                alt={product[0]}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 relative">
                <button className="absolute top-4 right-4 text-2xl hover:scale-125 transition">
                  ❤️
                </button>

               <a
  href={product[3]}
  className="font-bold text-lg hover:text-blue-600"
>
  {product[0]}
</a>
                <p>{product[1]}</p>

                <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-black text-white p-10 rounded-2xl text-center">
            Sneakers
          </div>

          <div className="bg-black text-white p-10 rounded-2xl text-center">
            Streetwear
          </div>

          <div className="bg-black text-white p-10 rounded-2xl text-center">
            Luxury Fashion
          </div>

          <div className="bg-black text-white p-10 rounded-2xl text-center">
            Accessories
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-10 bg-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p>Brands</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">50K+</h3>
            <p>Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p>Products</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-10 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-8 rounded-2xl shadow">
            <p className="mb-4">⭐⭐⭐⭐⭐</p>
            <p>
              Amazing collection and fast delivery. My favorite fashion marketplace.
            </p>
            <h4 className="mt-4 font-bold">Rahul Sharma</h4>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl shadow">
            <p className="mb-4">⭐⭐⭐⭐⭐</p>
            <p>
              Premium quality products and genuine brands.
            </p>
            <h4 className="mt-4 font-bold">Priya Singh</h4>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl shadow">
            <p className="mb-4">⭐⭐⭐⭐⭐</p>
            <p>
              The best place to discover sneakers and streetwear.
            </p>
            <h4 className="mt-4 font-bold">Arjun Kumar</h4>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 px-10 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Join Droppi Club
        </h2>

        <p className="mb-6">
          Get updates on new drops, offers and premium fashion collections.
        </p>

        <div className="max-w-xl mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-lg text-black"
          />

          <button className="px-6 py-3 bg-white text-black rounded-lg">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">DROPPI</h3>
            <p className="text-gray-400">
              Premium multi-brand marketplace for fashion, sneakers,
              streetwear and luxury essentials.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Men</li>
              <li>Women</li>
              <li>Sneakers</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Brands</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Nike</li>
              <li>Adidas</li>
              <li>Puma</li>
              <li>Crocs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Contact Us</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
          © 2026 Droppi. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}

