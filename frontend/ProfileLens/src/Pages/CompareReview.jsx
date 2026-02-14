import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTrendingUp } from "react-icons/fi";

const CompareReview = () => {
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
          to="/reviews"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b2d52] text-[#8b2d52] text-sm font-medium hover:bg-pink-50 transition"
        >
          View Full Feedback
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-[#8b2d52]">
            Version Comparison
          </h1>
          <p className="text-[#a23360] text-sm mt-1">
            Track your profile improvements over time
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white p-8 shadow-md">
          <div className="flex items-center gap-2 mb-6 font-medium">
            <FiTrendingUp />
            Your Improvement Journey
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { value: 62, label: "Starting Score", sub: "Jan 15, 2026" },
              { value: 85, label: "Current Score", sub: "Feb 10, 2026" },
              { value: "+23", label: "Total Growth", sub: "37% improvement" },
              { value: 3, label: "Versions", sub: "26 days tracked" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm opacity-80">{item.label}</div>
                <div className="text-xs opacity-70 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-pink-200 rounded-2xl p-6">
          <h2 className="font-semibold text-[#8b2d52] mb-4">
            Score Progression
          </h2>

          <div className="h-64 flex items-end justify-between px-6 text-xs text-gray-400">
            <span>V1</span>
            <span>V2</span>
            <span>V3</span>
          </div>

          <div className="text-center text-xs text-gray-400 mt-4">
            V1: 62 · V2: 74 · V3: 85
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#8b2d52]">
            Compare Versions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Version 2</h3>
                  <p className="text-xs text-gray-400">Jan 28, 2026</p>
                </div>
                <div className="text-2xl font-bold">74</div>
              </div>

              {[
                { label: "Photos", score: 78 },
                { label: "Bio", score: 70 },
                { label: "Prompts", score: 76 },
                { label: "Authenticity", score: 72 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{item.label}</span>
                    <span>{item.score}/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-gradient-to-r from-[#93375b] to-[#d65b9c] rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="text-sm text-gray-600 pt-2">
                • Good photo variety but quality issues • Bio too generic in
                places • Prompts lacked specificity
              </div>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Version 3</h3>
                  <p className="text-xs text-gray-400">Feb 10, 2026</p>
                </div>
                <div className="text-2xl font-bold text-pink-600">85</div>
              </div>

              {[
                { label: "Photos", score: 88 },
                { label: "Bio", score: 82 },
                { label: "Prompts", score: 87 },
                { label: "Authenticity", score: 84 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{item.label}</span>
                    <span>{item.score}/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-gradient-to-r from-[#93375b] to-[#d65b9c] rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="text-sm text-green-600 pt-2">
                ✓ Higher quality photos ✓ More authentic bio ✓ Clearer prompts
              </div>
            </div>
          </div>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Timeline of Revisions</h2>

          {[
            {
              version: "Version 3",
              score: 85,
              date: "Feb 10, 2026",
              changes: [
                "Replaced 2 photos with higher quality",
                "Added specific bio details",
                "Improved prompts",
              ],
            },
            {
              version: "Version 2",
              score: 74,
              date: "Jan 28, 2026",
              changes: [
                "Updated main photo",
                "Rewrote bio",
                "Changed one prompt",
              ],
            },
            {
              version: "Version 1",
              score: 62,
              date: "Jan 15, 2026",
              changes: ["Initial submission", "Basic bio and prompts"],
            },
          ].map((v, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold">
                {v.score}
              </div>

              <div>
                <div className="font-medium">
                  {v.version}{" "}
                  <span className="text-xs text-gray-400 ml-2">{v.date}</span>
                </div>

                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  {v.changes.map((c, j) => (
                    <li key={j}>• {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-8 space-y-4  flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Continue Improving</h3>
            <p className="text-sm text-gray-500 mt-1">
              Implement remaining suggestions to push your score even higher.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white px-5 py-2 rounded-xl text-sm">
              View Full Feedback
            </button>
            <button className="border-2 border-[#8b2d52] px-5 py-2 rounded-xl text-sm hover:bg-gray-50 text-[#8b2d52]">
              Upload New Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareReview;
