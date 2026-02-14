import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import PL from "../assets/PL Logo.png";
import { apiUrl } from "../lib/api";

const genderMap = {
  Women: "female",
  Men: "male",
  "Non-binary": "other",
};

const ReviewerSelection = () => {
  const navigate = useNavigate();
  const [genders, setGenders] = useState([]);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [approved, setApproved] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchReviewers = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          min_age: String(ageRange[0]),
          max_age: String(ageRange[1]),
        });

        const response = await fetch(apiUrl(`/api/reviewers/?${params.toString()}`));
        const data = await response.json();

        if (!response.ok) {
          setError("Could not load reviewers.");
          setReviewers([]);
          return;
        }

        setReviewers(data);
      } catch {
        setError("Could not connect to server.");
        setReviewers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewers();
  }, [ageRange]);

  const filteredReviewers = useMemo(() => {
    if (genders.length === 0) return reviewers;
    const selectedApiGenders = genders.map((gender) => genderMap[gender]);
    return reviewers.filter((reviewer) => selectedApiGenders.includes(reviewer.gender));
  }, [genders, reviewers]);

  const handleContinue = () => {
    if (approved.length < 3) return;

    const selectedReviewers = reviewers.filter((reviewer) =>
      approved.includes(reviewer.reviewer_id)
    );

    localStorage.setItem("selectedReviewers", JSON.stringify(selectedReviewers));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-white w-[79rem]">
      <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
        <Link to="/home" className="flex items-center gap-3 text-gray-500 hover:text-gray-700">
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <img src={PL} alt="ProfileLens" className="h-6" />
          ProfileLens
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Reviewer Preferences</h2>
            <p className="text-sm text-gray-500">Choose who you would like feedback from</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Gender</p>
            <div className="flex gap-3 flex-wrap">
              {["Women", "Men", "Non-binary"].map((gender) => (
                <button
                  key={gender}
                  type="button"
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
              {ageRange[0]} - {ageRange[1]} years
            </div>
          </div>
        </div>

        {loading && <p className="text-sm text-gray-600">Loading reviewers...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {filteredReviewers.length > 0 && (
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Select Reviewers</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReviewers.map((reviewer) => {
                const isApproved = approved.includes(reviewer.reviewer_id);
                const rating = Number(reviewer.average_rating || 0).toFixed(1);
                const cost = reviewer.price || 0;
                const genderLabel = reviewer.gender
                  ? `${reviewer.gender[0].toUpperCase()}${reviewer.gender.slice(1)}`
                  : "N/A";

                return (
                  <div
                    key={reviewer.reviewer_id}
                    className={`rounded-xl border p-4 space-y-3 transition shadow-sm
                      ${
                        isApproved
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{reviewer.public_username}</p>
                      <p className="text-xs text-gray-500">
                        {genderLabel}, {reviewer.age}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <FaStar className="text-sm" />
                        {rating}
                      </span>
                      <span className="font-semibold text-gray-800">${cost}</span>
                    </div>

                    <p className="text-xs text-gray-500">
                      Credibility: {Number(reviewer.credibility_score || 0).toFixed(1)} | Reviews: {reviewer.total_reviews}
                    </p>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleReject(reviewer.reviewer_id)}
                        className="flex-1 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition"
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApprove(reviewer.reviewer_id)}
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
              Approved reviewers: <span className="font-semibold">{approved.length}</span> (select 3-5)
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
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
      </div>
    </div>
  );
};

export default ReviewerSelection;
