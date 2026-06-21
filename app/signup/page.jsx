export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button className="w-full bg-black text-white py-4 rounded-xl">
          Create Account
        </button>
      </div>
    </main>
  );
}