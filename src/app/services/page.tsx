"use client";

import { useState } from "react";
import Link from "next/link";
import { providers, categories } from "@/data/mockData";
import type { Provider } from "@/types";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProviders = providers.filter((provider: Provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      provider.profession.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory ? provider.categoryId === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Trusted Local Professionals
          </h1>
          <p className="text-blue-100 mb-8">
            Book verified experts near you in minutes
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by name or profession..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div className="max-w-6xl mx-auto px-6 mt-10 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-white shadow hover:bg-gray-100"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white"
                : "bg-white shadow hover:bg-gray-100"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* PROVIDER GRID */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {filteredProviders.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No providers found.
          </div>
        )}

        {filteredProviders.map((provider: Provider) => (
          <motion.div
            key={provider.id}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col"
          >

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {provider.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {provider.profession}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 mb-4">
              ⭐
              <span className="ml-2 text-gray-700 font-medium">
                {provider.rating}
              </span>
              <span className="ml-1 text-gray-400 text-sm">
                ({provider.reviewCount})
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {provider.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">
                ₹{provider.hourlyRate}
                <span className="text-sm text-gray-500 font-normal">
                  {" "} / hr
                </span>
              </span>

              <Link
                href={`/provider/${provider.id}`}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
              >
                View
              </Link>
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}