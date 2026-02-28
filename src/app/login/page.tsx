"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<"user" | "provider">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful 🎉");
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE - Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">
        <h1 className="text-4xl font-bold mb-6">SmartLocal</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Book trusted local professionals instantly.  
          Safe, reliable, and verified services at your doorstep.
        </p>

        <div className="mt-12 space-y-4 text-sm text-blue-100">
          <p>✔ Verified Professionals</p>
          <p>✔ Transparent Pricing</p>
          <p>✔ Instant Booking</p>
          <p>✔ Secure Payments</p>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-12">

        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10">

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setRole("user")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                role === "user"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              User
            </button>
            <button
              onClick={() => setRole("provider")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                role === "provider"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Provider
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Email
              </label>
              <input
                type="email"
                className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Password
              </label>
              <input
                type="password"
                className={`mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot */}
            <div className="text-right text-sm">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full border py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}