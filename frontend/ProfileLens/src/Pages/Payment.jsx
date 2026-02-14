import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import PL from "../assets/PL Logo.png";
import { authFetch } from "../lib/api";

const Payment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedReviewers = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("selectedReviewers") || "[]");
    } catch {
      return [];
    }
  }, []);

  const profileVersionId = localStorage.getItem("currentProfileVersionId");
  const total = selectedReviewers.reduce((sum, reviewer) => sum + Number(reviewer.price || 0), 0);

  const handlePay = async () => {
    setError("");
    setSuccess("");

    if (!profileVersionId) {
      setError("No profile version found. Please submit your profile first.");
      return;
    }

    if (selectedReviewers.length < 3) {
      setError("Select at least 3 reviewers before payment.");
      return;
    }

    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim() || !name.trim()) {
      setError("All payment fields are required.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await authFetch("/api/review-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_version: Number(profileVersionId),
          reviewers: selectedReviewers.map((reviewer) => reviewer.reviewer_id),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || data.detail || "Could not create review requests.");
        return;
      }

      localStorage.removeItem("selectedReviewers");
      setSuccess(`Payment recorded. ${data.created_count} review requests were created.`);
      setTimeout(() => navigate("/home"), 1200);
    } catch {
      setError("Server unavailable. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
          <img src={PL} alt="ProfileLens" />
          ProfileLens
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">Complete Your Payment</h1>
          <p className="text-sm text-gray-500">Secure checkout for your profile review.</p>

          <div>
            <label className="text-sm text-gray-600">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM / YY"
                className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Name on Card</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Johnson"
              className="mt-1 w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiLock /> Payments are encrypted and secure
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="button"
            onClick={handlePay}
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-60"
          >
            {submitting ? "Submitting..." : `Pay $${total} & Submit Profile`}
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#8b2d52] to-[#d65b9c] text-white rounded-2xl p-8">
            <p className="text-sm opacity-90">Standard Review</p>
            <h2 className="text-4xl font-bold mt-2">${total}</h2>
            <p className="text-sm mt-1 opacity-90">One-time payment</p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>Selected reviewers: {selectedReviewers.length}</li>
              <li>Expected turnaround: 48 hours</li>
              <li>Structured feedback</li>
              <li>Actionable suggestions</li>
              <li>Version comparison</li>
            </ul>
          </div>

          <div className="bg-white border rounded-2xl p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-2">100% Confidential</h3>
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
