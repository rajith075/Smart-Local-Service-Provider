"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/mockData";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-24 px-6 text-center">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-900 leading-tight"
        >
          Find Trusted Local Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Book verified professionals instantly. Transparent pricing,
          trusted reviews, and secure service experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Link
            href="/services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Browse Services
          </Link>
        </motion.div>
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-14"
        >
          Explore Popular Services
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-10 shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="text-5xl mb-6">{category.icon}</div>

              <h3 className="text-xl font-semibold mb-3">
                {category.name}
              </h3>

              <p className="text-gray-500 mb-6">
                {category.description}
              </p>

              <Link
                href={`/services?category=${category.id}`}
                className="text-blue-600 font-medium group-hover:underline"
              >
                View Providers →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-2xl font-bold mb-6">
            Why Choose SmartLocal?
          </h3>

          <div className="grid md:grid-cols-3 gap-10 mt-10">
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Verified Professionals
              </h4>
              <p className="text-gray-500">
                Background-checked experts for safe and reliable service.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Transparent Pricing
              </h4>
              <p className="text-gray-500">
                No hidden charges. Clear hourly rates.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Instant Booking
              </h4>
              <p className="text-gray-500">
                Schedule services in just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Ready to Book a Service?
        </h3>

        <Link
          href="/services"
          className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
}