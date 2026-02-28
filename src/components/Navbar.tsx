"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { role, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          SmartLocal
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">

          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/services" className="hover:text-blue-600 transition">
            Services
          </Link>

          {role === "provider" && (
            <Link
              href="/provider-dashboard"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
          )}

          {role ? (
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}