"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { providers } from "@/data/mockData";
import type { Provider } from "@/types";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function BookingPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const provider = providers.find((p: Provider) => p.id === id);

  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  if (!provider) {
    return <div className="p-10 text-center">Provider not found</div>;
  }

  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
  ];

  const handlePayment = () => {
    setShowPayment(false);
    toast.success("Booking Confirmed Successfully 🎉");
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">

        {/* STEPPER */}
        <div className="flex justify-between mb-10">
          {["Date", "Time", "Confirm"].map((label, i) => (
            <div key={label} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${
                  step >= i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              <p className="text-xs mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-4">Select Date</h2>
            <input
              type="date"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button
              disabled={!date}
              onClick={() => setStep(2)}
              className={`mt-8 w-full py-4 rounded-xl font-semibold ${
                date
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-semibold mb-6">Select Time</h2>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`py-4 rounded-xl border transition ${
                    time === slot
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button
              disabled={!time}
              onClick={() => setStep(3)}
              className={`mt-8 w-full py-4 rounded-xl font-semibold ${
                time
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Confirm Booking
            </h2>

            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <p className="mb-2">
                <strong>Provider:</strong> {provider.name}
              </p>
              <p className="mb-2">
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>Time:</strong> {time}
              </p>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Proceed to Payment ₹{provider.hourlyRate}
            </button>
          </motion.div>
        )}

        {/* SUCCESS SCREEN */}
        {step === 4 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Booking Confirmed!
            </h2>
            <p className="text-gray-600">
              Your service has been successfully scheduled.
            </p>
          </motion.div>
        )}

      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-96"
          >
            <h3 className="text-lg font-semibold mb-4">
              Payment Details
            </h3>

            <input
              type="text"
              placeholder="Card Number"
              className="w-full border p-3 rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Expiry"
              className="w-full border p-3 rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full border p-3 rounded-lg mb-6"
            />

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Pay ₹{provider.hourlyRate}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}