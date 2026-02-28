"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { providers } from "@/data/mockData";

export default function ProviderProfile() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const provider = providers.find((p) => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Provider not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-6 py-12">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* PROFILE HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="flex gap-6 items-center">

              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {provider.name}
                </h1>

                <p className="text-gray-500 mt-1">
                  {provider.profession}
                </p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {provider.rating}
                  </span>
                  <span>({provider.reviewCount} reviews)</span>
                  <span>• {provider.completedJobs} jobs completed</span>
                </div>

                <p className="text-gray-500 mt-2">
                  📍 {provider.location} • {provider.distance} km away
                </p>
              </div>
            </div>
          </motion.div>

          {/* ABOUT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow"
          >
            <h2 className="text-xl font-semibold mb-3">
              About
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {provider.about}
            </p>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow"
          >
            <h2 className="text-xl font-semibold mb-4">
              Skills & Expertise
            </h2>

            <div className="flex flex-wrap gap-3">
              {provider.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* REVIEWS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow"
          >
            <h2 className="text-xl font-semibold mb-6">
              Reviews ({provider.reviewCount})
            </h2>

            <div className="space-y-6">

              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Verified Customer</h4>
                  <span className="text-sm text-gray-400">
                    2 days ago
                  </span>
                </div>
                <p className="text-yellow-500 mt-1">★★★★★</p>
                <p className="text-gray-600 mt-2">
                  Excellent service! Very professional and punctual.
                </p>
              </div>

              <div>
                <div className="flex justify-between">
                  <h4 className="font-medium">Happy Client</h4>
                  <span className="text-sm text-gray-400">
                    1 week ago
                  </span>
                </div>
                <p className="text-yellow-500 mt-1">★★★★☆</p>
                <p className="text-gray-600 mt-2">
                  Quality work and fair pricing.
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-8">

          {/* PRICING CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-lg sticky top-24"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              ₹{provider.hourlyRate}
            </h2>
            <p className="text-gray-500 mb-6">per hour</p>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <p>✔ Available today</p>
              <p>✔ Flexible scheduling</p>
              <p>✔ Verified professional</p>
            </div>

            <Link
              href={`/booking/${provider.id}`}
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Book Now
            </Link>

            <button className="w-full mt-3 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition">
              Contact
            </button>
          </motion.div>

          {/* AVAILABILITY */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h3 className="font-semibold mb-4">
              Availability
            </h3>

            {provider.availability.map((day) => (
              <div
                key={day}
                className="flex justify-between text-gray-600 mb-2"
              >
                <span>{day}</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="bg-white rounded-3xl p-8 shadow grid grid-cols-2 text-center">
            <div>
              <p className="text-2xl font-bold">
                {provider.completedJobs}
              </p>
              <p className="text-gray-500 text-sm">
                Jobs Done
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {provider.reviewCount}
              </p>
              <p className="text-gray-500 text-sm">
                Reviews
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}