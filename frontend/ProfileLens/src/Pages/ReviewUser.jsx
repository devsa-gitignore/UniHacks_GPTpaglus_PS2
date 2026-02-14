import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaCamera, FaRegCommentDots, FaShieldAlt } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { useState } from "react";
import PL from "../assets/PL Logo.png";
import Img1 from "../assets/Profile1.png";
import Img2 from "../assets/Profile2.png";
import Img3 from "../assets/Profile3.png";
import Img4 from "../assets/Profile4.png";

/* ---------- Reusable Score Section ---------- */
const ScoreSection = ({ icon, title, subtitle, score, setScore, children }) => {
  return (
    <div className="border border-pink-800 rounded-2xl p-6 bg-white shadow-sm space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#8b2d52]">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-[#6C0C27]">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-semibold text-[#6C0C27]">{score}</p>
          <p className="text-xs text-gray-400">Score</p>
        </div>
      </div>

      {/* Slider */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Score (0–100)</p>
        <input
          type="range"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full accent-[#8b2d52]"
        />
      </div>

      {children}
    </div>
  );
};

export default function ReviewUser() {
  const [photoScore, setPhotoScore] = useState(88);
  const [bioScore, setBioScore] = useState(82);
  const [promptScore, setPromptScore] = useState(87);
  const [authScore, setAuthScore] = useState(84);

  const overall = Math.round(
    (photoScore + bioScore + promptScore + authScore) / 4,
  );

  return (
    <div className="min-h-screen bg-white px-8 space-y-8">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-between items-center border-b  py-4 px-8 bg-white">
        <Link
          to="/home"
          className="flex justify-center items-center gap-4 text-lg text-gray-500 hover:text-gray-700"
        >
          <FiArrowLeft /> Back to Queue
        </Link>

        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <img src={PL}></img>
          ProfileLens
        </div>
      </div>

      {/* ===== Header ===== */}
      <div>
        <h1 className="text-2xl font-semibold text-[#6C0C27]">
          Review Profile – User #2847
        </h1>
        <p className="text-sm text-gray-500">
          Woman, 28 • Looking for: Long-term • Payment: $15
        </p>
      </div>

      {/* ===== Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== LEFT PREVIEW ===== */}
        <div className="border border-pink-100 rounded-2xl p-6 bg-white shadow-sm space-y-6">
          <h2 className="font-semibold text-[#6C0C27]">Profile Preview</h2>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-3">
            {[Img1, Img2, Img3, Img4].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="profile"
                className="h-28 w-full object-cover rounded-xl"
              />
            ))}
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Bio</p>
            <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-600">
              Software engineer by day, amateur chef by night. Love hiking,
              trying new restaurants, and bad puns.
            </div>
          </div>

          {/* Prompts */}
          <div className="space-y-3">
            {[
              "Suggest a new restaurant or coffee shop...",
              "Someone who’s up for spontaneous weekend trips...",
              "Morning hike, farmers market run...",
            ].map((p, i) => (
              <div
                key={i}
                className="bg-gray-50 border rounded-xl p-3 text-sm text-gray-600"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT FEEDBACK ===== */}
        <div className="lg:col-span-2 space-y-8">
          <ScoreSection
            icon={<FaCamera />}
            title="Photos Feedback"
            subtitle="Evaluate photo quality, variety, and authenticity"
            score={photoScore}
            setScore={setPhotoScore}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <textarea
                className="border rounded-xl p-3 h-28 bg-pink-50"
                placeholder="Strengths..."
              />
              <textarea
                className="border rounded-xl p-3 h-28 bg-pink-50"
                placeholder="Areas to improve..."
              />
            </div>
          </ScoreSection>

          <ScoreSection
            icon={<FaRegCommentDots />}
            title="Bio Feedback"
            subtitle="Evaluate clarity, personality, and engagement"
            score={bioScore}
            setScore={setBioScore}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <textarea
                className="border rounded-xl p-3 h-28 bg-pink-50"
                placeholder="What works..."
              />
              <textarea
                className="border rounded-xl p-3 h-28 bg-pink-50"
                placeholder="Suggestions..."
              />
            </div>
          </ScoreSection>

          <ScoreSection
            icon={<IoChatboxOutline />}
            title="Prompt Responses"
            subtitle="Evaluate creativity and conversation potential"
            score={promptScore}
            setScore={setPromptScore}
          >
            <textarea
              className="border rounded-xl p-3 h-32 w-full bg-pink-50"
              placeholder="Overall feedback..."
            />
          </ScoreSection>

          <ScoreSection
            icon={<FaShieldAlt />}
            title="Authenticity Rating"
            subtitle="Does the profile feel genuine and trustworthy?"
            score={authScore}
            setScore={setAuthScore}
          >
            <textarea
              className="border rounded-xl p-3 h-32 w-full bg-pink-50"
              placeholder="Overall impression..."
            />
          </ScoreSection>

          {/* ===== Action Items ===== */}
          <div className="border border-pink-800 rounded-2xl p-6 bg-pink-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-[#6C0C27]">Top 5 Action Items</h3>

            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-[#8b2d52] text-white text-xs flex items-center justify-center mt-1">
                  {n}
                </div>
                <input
                  placeholder={`Action item #${n}`}
                  className="flex-1 border rounded-xl p-2 text-sm bg-white"
                />
              </div>
            ))}
          </div>
          {/* ===== Ready to Submit Card ===== */}
          <div className="border border-pink-200 rounded-2xl px-6 py-4 bg-[#fdf7fa] flex items-center justify-between">
            {/* Left text */}
            <div>
              <p className="text-sm font-semibold text-[#6C0C27]">
                Ready to submit?
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Make sure all feedback is constructive and specific.
              </p>
            </div>

            {/* Right buttons */}
            <div className="flex items-center gap-3 my-4">
              {/* Save Draft */}
              <button className="px-4 py-2 text-sm border border-pink-200 rounded-full text-gray-600 hover:bg-pink-50 transition cursor-pointer">
                Save Draft
              </button>

              {/* Submit Review */}
              <button className="px-5 py-2 text-sm rounded-full text-white bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] hover:opacity-90 transition cursor-pointer">
                Submit Review & Earn $15
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
