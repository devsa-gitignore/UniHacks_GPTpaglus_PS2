import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import PL from "../assets/PL Logo.png"

const Payment = () => {
  return (
    <div className="min-h-screen bg-white w-[79rem]">
      <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
        <Link
          to="/home"
          className="flex justify-center items-center gap-4 text-lg text-gray-500 hover:text-gray-700"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <img src={PL}></img>
          ProfileLens
        </div>
      </div>

      {/* Container */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-8">
        {/* LEFT — Payment Form */}
        <div className="bg-white rounded-2xl border p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Complete Your Payment
          </h1>
          <p className="text-sm text-gray-500">
            Secure checkout for your profile review.
          </p>

          {/* Card Number */}
          <div>
            <label className="text-sm text-gray-600">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Expiry Date</label>
              <input
                type="text"
                placeholder="MM / YY"
                className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">CVV</label>
              <input
                type="password"
                placeholder="123"
                className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name on Card</label>
            <input
              type="text"
              placeholder="Alex Johnson"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Secure note */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiLock /> Payments are encrypted and secure
          </div>

          {/* Pay Button */}
          <button className="w-full bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer">
            Pay $49 & Submit Profile
          </button>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-[#8b2d52] to-[#d65b9c] text-white rounded-2xl p-8">
            <p className="text-sm opacity-90">Standard Review</p>
            <h2 className="text-4xl font-bold mt-2">$49</h2>
            <p className="text-sm mt-1 opacity-90">One-time payment</p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>✓ 3–5 detailed reviews</li>
              <li>✓ 48-hour turnaround</li>
              <li>✓ Structured feedback</li>
              <li>✓ Actionable suggestions</li>
              <li>✓ Version comparison</li>
            </ul>
          </div>

          {/* Guarantee */}
          <div className="bg-white border rounded-2xl p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-2">
              100% Confidential
            </h3>
            <p>
              Your profile is never shared publicly. Only selected reviewers can
              see it, and all feedback remains anonymous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
