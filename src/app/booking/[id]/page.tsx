"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { providers } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const provider = providers.find((p) => p.id === id);

  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!provider) return <div>Provider not found</div>;

  const serviceFee = 49;
  const gst = Math.round(provider.hourlyRate * 0.18);
  const total = provider.hourlyRate + serviceFee + gst;

  const bookingId =
    "SL-" + Math.floor(100000 + Math.random() * 900000);

  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
    "07:00 PM",
  ];

  const handlePayment = () => {
    if (!upiId.includes("@")) return;

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setConfirmed(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* SUCCESS SCREEN */}
        {confirmed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <div className="text-6xl mb-6">🎉</div>

            <h1 className="text-3xl font-bold mb-3">
              Payment Successful
            </h1>

            <p className="text-gray-500 mb-10">
              Your booking is confirmed and payment has been received.
            </p>

            <div className="bg-gray-50 p-8 rounded-2xl text-left max-w-3xl mx-auto shadow-inner">

              <div className="flex justify-between mb-4">
                <span>Booking ID</span>
                <span className="font-semibold text-blue-600">
                  {bookingId}
                </span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Provider</span>
                <span>{provider.name}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Service</span>
                <span>{provider.profession}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Date</span>
                <span>{date}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Time</span>
                <span>{time}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Paid via</span>
                <span>UPI ({upiId})</span>
              </div>

              <hr className="my-6" />

              <div className="flex justify-between mb-2">
                <span>Service Price</span>
                <span>₹{provider.hourlyRate}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Service Fee</span>
                <span>₹{serviceFee}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>GST</span>
                <span>₹{gst}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid</span>
                <span>₹{total}</span>
              </div>

              <div className="mt-4 text-green-600 font-medium">
                Status: Paid ✔
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Back to Home
            </button>
          </motion.div>
        )}

        {!confirmed && (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT SECTION */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-lg">

              <AnimatePresence mode="wait">

                {/* STEP 1 DATE */}
                {step === 1 && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Select Date
                    </h2>

                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-4 border rounded-xl"
                    />

                    <button
                      disabled={!date}
                      onClick={() => setStep(2)}
                      className="mt-8 w-full bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {/* STEP 2 TIME */}
                {step === 2 && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Select Time
                    </h2>

                    <div className="grid grid-cols-3 gap-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`p-3 rounded-xl border ${
                            time === slot
                              ? "bg-blue-600 text-white"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 border py-3 rounded-xl"
                      >
                        Back
                      </button>

                      <button
                        disabled={!time}
                        onClick={() => setStep(3)}
                        className="flex-1 bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 UPI PAYMENT */}
                {step === 3 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Pay via UPI
                    </h2>

                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <p><strong>Provider:</strong> {provider.name}</p>
                      <p><strong>Date:</strong> {date}</p>
                      <p><strong>Time:</strong> {time}</p>
                      <p><strong>Total:</strong> ₹{total}</p>
                    </div>

                    <input
                      type="text"
                      placeholder="Enter UPI ID (example@upi)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-4 border rounded-xl mb-6"
                    />

                    <button
                      disabled={!upiId || processing}
                      onClick={handlePayment}
                      className="w-full bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-xl"
                    >
                      {processing ? "Processing Payment..." : `Pay ₹${total}`}
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* RIGHT SUMMRY */}

            <div className="bg-white rounded-3xl p-8 shadow-lg h-fit sticky top-24">
              <h3 className="text-xl font-semibold mb-6">
                Price Breakdown
              </h3>

              <div className="space-y-3 text-gray-600">
                <p className="flex justify-between">
                  <span>Service Price</span>
                  <span>₹{provider.hourlyRate}</span>
                </p>

                <p className="flex justify-between">
                  <span>Service Fee</span>
                  <span>₹{serviceFee}</span>
                </p>

                <p className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </p>

                <hr />

                <p className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}