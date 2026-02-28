import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "SmartLocal",
  description: "Book trusted local services instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 antialiased">

        <AuthProvider>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "12px",
                padding: "14px 16px",
                fontSize: "14px",
              },
            }}
          />

          <div className="min-h-screen flex flex-col">

            {/* NAVBAR COMPONENT */}
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="flex-1">
              {children}
            </main>

            {/* FOOTER */}
            <footer className="bg-white border-t mt-20">
              <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-500">

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    SmartLocal
                  </h3>
                  <p>
                    India’s trusted platform to book local professionals instantly.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Company
                  </h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                    <li><Link href="/services" className="hover:text-blue-600">Services</Link></li>
                    <li><Link href="/login" className="hover:text-blue-600">Login</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Legal
                  </h4>
                  <ul className="space-y-2">
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                  </ul>
                </div>

              </div>

              <div className="border-t py-4 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} SmartLocal. All rights reserved.
              </div>
            </footer>

          </div>
        </AuthProvider>

      </body>
    </html>
  );
}