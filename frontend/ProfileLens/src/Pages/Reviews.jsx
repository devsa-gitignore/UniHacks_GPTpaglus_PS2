import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiTrendingUp } from "react-icons/fi";
import PL from "../assets/PL Logo.png";

const Stars = ({ count }) => (
  <div className="flex gap-1 text-yellow-400 text-sm">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < count ? "" : "text-gray-300"} />
    ))}
  </div>
);

/* 📦 Section Block */
const ReviewSection = ({ title, rating, children }) => (
  <div className="border border-pink-200 rounded-2xl p-6 space-y-5 bg-white shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
      <Stars count={rating} />
    </div>
    {children}
  </div>
);

const Reviews = () => {
  return (
    <div className="min-h-screen bg-white w-[79rem]">
    
      <div className="flex justify-between items-center px-8 py-4 border-b bg-white">
        <Link
          to="/home"
          className="flex justify-center items-center gap-4 text-lg text-gray-500 hover:text-gray-700"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>

        <Link
          to="/compare"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b2d52] text-[#8b2d52] text-sm font-medium hover:bg-pink-50 transition"
        >
          <FiTrendingUp className="text-base" />
          Compare Versions
        </Link>
      </div>

      {/* Container */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Profile Review - Version 3
            <span className="ml-3 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full align-middle">
              Complete
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Received 5 reviews on Feb 12, 2026
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-md">
          <div>
            <p className="text-sm opacity-80">Overall Impression Score</p>

            <h2 className="text-5xl font-bold mt-2">
              85 <span className="text-lg font-medium">/100</span>
            </h2>

            <p className="flex items-center gap-2 text-sm mt-3">
              <FiTrendingUp /> +11 points from Version 2
            </p>

            <p className="text-sm opacity-90 mt-3 max-w-md leading-relaxed">
              Your profile has significantly improved. Reviewers highlighted
              stronger photo selection, a more authentic bio, and clearer prompt
              responses.
            </p>
          </div>

          {/* Score Circle */}
          <div className="w-36 h-36 rounded-full border-[10px] border-white/50 flex items-center justify-center text-2xl font-bold">
            85%
          </div>
        </div>

        {/* Metric Bars */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Photos", score: 88 },
            { label: "Bio", score: 82 },
            { label: "Prompts", score: 87 },
            { label: "Authenticity", score: 84 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>{item.label}</span>
                <span className="font-semibold text-gray-800">
                  {item.score}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#8b2d52] to-[#d65b9c]"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Photos Section */}
        <ReviewSection title="Photos" rating={3}>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Genuine smile and confident eye contact</li>
                <li>Clear, well-lit and recent photos</li>
                <li>Balanced mix of social and solo moments</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-red-500 mb-2">
                Areas to Improve
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Replace unclear group photo</li>
                <li>Add a strong full-body shot</li>
                <li>Swap mirror selfie for natural candid</li>
              </ul>
            </div>
          </div>
        </ReviewSection>

        {/* Bio Section */}
        <ReviewSection title="Bio" rating={3}>
          <p className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
            “Software engineer by day, amateur chef by night. Love hiking,
            trying new restaurants, and terrible puns.”
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-green-600 mb-2">What Works</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Memorable and specific personality cues</li>
                <li>Warm humor creates approachability</li>
                <li>Healthy balance of interests and lifestyle</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-orange-500 mb-2">Suggestions</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Clarify what you're seeking in a partner</li>
                <li>Add motivation behind your interests</li>
                <li>Slightly shorter bios often convert better</li>
              </ul>
            </div>
          </div>
        </ReviewSection>

        {/* Prompt Responses */}
        <ReviewSection title="Prompt Responses" rating={3}>
          {[
            "Suggest a new restaurant or coffee spot you've wanted to try.",
            "Someone spontaneous who also enjoys cozy nights in.",
            "Morning hike, farmers market, sunset cooking, movie night.",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-pink-50 border border-pink-200 rounded-xl p-3 text-sm text-gray-700"
            >
              {text}
            </div>
          ))}
        </ReviewSection>

        {/* Authenticity */}
        <ReviewSection title="Authenticity Rating" rating={3}>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Overall Impression
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Your profile feels genuine, grounded, and believable. The
                specific lifestyle details strengthen trust and relatability.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Trust Signals</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Natural, unfiltered photos</li>
                <li>Specific believable life details</li>
                <li>Consistent tone and personality</li>
              </ul>
            </div>
          </div>
        </ReviewSection>

        {/* Action Items */}
        {/* Action Items */}
        <ReviewSection title="Top 5 Action Items" rating={0}>
          <div className="space-y-3">
            {[
              "Replace group photo with a clear full-body shot",
              "Add specific detail to hiking interest",
              "Expand ‘I’m looking for’ with values or traits",
              "Swap mirror selfie for a natural candid photo",
              "Include a hobby-focused lifestyle photo",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-pink-50 border border-pink-200 rounded-xl px-4 py-3 text-sm"
              >
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white flex items-center justify-center text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
            Upload Improved Version
          </button>
        </ReviewSection>
      </div>
    </div>
  );
};

export default Reviews;
