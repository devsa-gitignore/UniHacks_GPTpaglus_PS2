import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import PL from "../assets/PL Logo.png";

const mockReviewers = [
  { id: 1, name: "Sarah, 26", gender: "Women", bio: "Loves travel & deep conversations." },
  { id: 2, name: "Emily, 29", gender: "Women", bio: "Foodie, reader, and weekend explorer." },
  { id: 3, name: "Alex, 30", gender: "Men", bio: "Into fitness, books, and meaningful dating." },
  { id: 4, name: "Ryan, 34", gender: "Men", bio: "Entrepreneur, traveler, coffee lover." },
  { id: 5, name: "Jordan, 28", gender: "Women", bio: "Creative soul, values authenticity." },
  { id: 6, name: "Taylor, 31", gender: "Non-binary", bio: "Music, art, and honest conversations." },
];

const ReviewerSelection = () => {
  const [genders, setGenders] = useState([]);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [approved, setApproved] = useState([]);

  const toggleGender = (gender) => {
    setGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handleApprove = (id) => {
    setApproved((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleReject = (id) => {
    setApproved((prev) => prev.filter((rid) => rid !== id));
  };

  const filteredReviewers =
    genders.length === 0 ? [] : mockReviewers.filter((r) => genders.includes(r.gender));

  return (
    <div className="min-h-screen bg-white w-[79rem]">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
        <Link to="/home" className="flex items-center gap-3 text-gray-500 hover:text-gray-700">
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <img src={PL} alt="ProfileLens" className="h-6" />
          ProfileLens
        </div>
      </div>

      {/* Page Container */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Preferences */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Reviewer Preferences</h2>
            <p className="text-sm text-gray-500">Choose who you’d like feedback from</p>
          </div>

          {/* Gender */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Gender</p>
            <div className="flex gap-3 flex-wrap">
              {["Women", "Men", "Non-binary"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => toggleGender(gender)}
                  className={`px-4 py-2 rounded-full border text-sm transition
                    ${
                      genders.includes(gender)
                        ? "bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white border-none"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                    }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Age Range</p>

            <input
              type="range"
              min="18"
              max="60"
              value={ageRange[0]}
              onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
              className="w-full accent-pink-600"
            />

            <input
              type="range"
              min="18"
              max="60"
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
              className="w-full mt-2 accent-pink-600"
            />

            <div className="text-sm text-gray-600 mt-2">
              {ageRange[0]} – {ageRange[1]} years
            </div>
          </div>
        </div>

        {/* Reviewers Grid */}
        {filteredReviewers.length > 0 && (
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Select Reviewers</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReviewers.map((reviewer) => {
                const isApproved = approved.includes(reviewer.id);
                const rating = (4 + reviewer.id * 0.1).toFixed(1);
                const cost = 199 + reviewer.id * 50;

                return (
                  <div
                    key={reviewer.id}
                    className={`rounded-xl border p-4 space-y-3 transition shadow-sm
                      ${
                        isApproved
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{reviewer.name}</p>
                      <p className="text-xs text-gray-500">{reviewer.gender}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <FaStar className="text-sm" />
                        {rating}
                      </span>
                      <span className="font-semibold text-gray-800">₹{cost}</span>
                    </div>

                    <p className="text-xs text-gray-500">{reviewer.bio}</p>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleReject(reviewer.id)}
                        className="flex-1 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => handleApprove(reviewer.id)}
                        className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white text-sm hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-sm text-gray-700">
              Approved reviewers: <span className="font-semibold">{approved.length}</span> (select 3–5)
            </div>
          </div>
        )}

        {/* Continue Button */}
        <Link to="/payment">
          <button
            disabled={approved.length < 3}
            className={`w-full py-3 rounded-xl font-medium transition
              ${
                approved.length >= 3
                  ? "bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            Continue to Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewerSelection;
