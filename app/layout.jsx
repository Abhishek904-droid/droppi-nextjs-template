import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Droppi - Fashion Marketplace Template",
  description:
    "Premium Next.js fashion marketplace template with shop, cart, checkout, account and admin dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans dark:bg-ink dark:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}