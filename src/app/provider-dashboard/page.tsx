"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProviderDashboard() {
  const { role, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== "provider") {
      router.push("/login");
    }
  }, [role]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Provider Dashboard
      </h1>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="bg-red-500 text-white px-6 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}