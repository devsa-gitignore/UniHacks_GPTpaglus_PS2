import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUpload, FiArrowLeft } from "react-icons/fi";
import PL from "../assets/PL Logo.png";
import { authFetch } from "../lib/api";

const Profile = () => {
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [promptAnswers, setPromptAnswers] = useState(["", "", ""]);
  const [customPromptQuestion, setCustomPromptQuestion] = useState("");
  const [customPromptAnswer, setCustomPromptAnswer] = useState("");
  const [datingIntent, setDatingIntent] = useState("go_with_the_flow");
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const promptLabels = [
    "The best way to ask me out is...",
    "I'm looking for...",
    "A perfect Sunday looks like...",
  ];

  const handlePromptChange = (index, value) => {
    const next = [...promptAnswers];
    next[index] = value;
    setPromptAnswers(next);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 6) {
      setError("You can upload a maximum of 6 photos.");
      return;
    }

    setError("");
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!bio.trim()) {
      setError("Profile bio is required.");
      return;
    }

    if (images.length < 3 || images.length > 6) {
      setError("Upload between 3 and 6 photos before submitting.");
      return;
    }

    const prompts = promptAnswers
      .map((answer, index) => ({
        question: promptLabels[index],
        answer: answer.trim(),
        is_custom: false,
      }))
      .filter((prompt) => prompt.answer.length > 0);

    if (customPromptQuestion.trim() && customPromptAnswer.trim()) {
      prompts.push({
        question: customPromptQuestion.trim(),
        answer: customPromptAnswer.trim(),
        is_custom: true,
      });
    }

    if (prompts.length < 2) {
      setError("Add at least 2 prompt responses before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await authFetch("/api/profiles/versions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio: bio.trim(),
          dating_intent: datingIntent,
          prompts,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || "Could not submit profile.");
        return;
      }

      localStorage.setItem("currentProfileVersionId", String(data.id));
      navigate("/reviewer");
    } catch {
      setError("Server unavailable. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Submit Your Profile for Review</h1>
            <p className="text-gray-500 mt-2">
              Upload your dating profile and select reviewers to get honest, actionable feedback
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            {["Profile", "Reviewers", "Payment"].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i === 0 ? "bg-pink-800 text-white" : "border text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-gray-600">{step}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-semibold text-gray-800">Profile Photos</h2>
            <p className="text-sm text-gray-500 mt-1">Upload 3-6 photos from your dating profile</p>

            <div className="mt-4 space-y-4">
              {images.length < 6 && (
                <label className="border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-pink-400 transition">
                  <FiUpload className="text-2xl" />
                  <span className="text-sm mt-2">Click to upload photos</span>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt="preview"
                        className="h-24 w-full object-cover rounded-lg border"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-400">Upload between 3 and 6 photos</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-semibold text-gray-800">Profile Bio</h2>
            <p className="text-sm text-gray-500 mt-1">Copy and paste your dating profile bio</p>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-4 w-full border rounded-xl p-4 h-28 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="e.g., Software engineer by day, amateur chef by night..."
            />
          </div>

          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Prompt Responses</h2>
            <p className="text-sm text-gray-500">Add 2-3 of your profile prompt responses</p>

            {promptLabels.map((label, i) => (
              <div key={i}>
                <p className="text-sm text-gray-600 mb-1">{label}</p>
                <input
                  value={promptAnswers[i]}
                  onChange={(e) => handlePromptChange(i, e.target.value)}
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Your response..."
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Personal Prompt</h2>
            <p className="text-sm text-gray-500">
              Add a unique personal question and your answer to showcase your personality
            </p>

            <div>
              <p className="text-sm text-gray-600 mb-1">Your Prompt</p>
              <input
                value={customPromptQuestion}
                onChange={(e) => setCustomPromptQuestion(e.target.value)}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="e.g., Two truths and a lie about me..."
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Your Answer</p>
              <textarea
                value={customPromptAnswer}
                onChange={(e) => setCustomPromptAnswer(e.target.value)}
                className="w-full border rounded-xl p-3 h-24 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Write your answer here..."
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-semibold text-gray-800">Dating Intent</h2>
            <p className="text-sm text-gray-500 mt-1">What are you looking for?</p>

            <div className="flex gap-4 mt-4">
              {["Casual", "Serious", "Go with the Flow"].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setDatingIntent(
                      item === "Casual" ? "casual" : item === "Serious" ? "serious" : "go_with_the_flow"
                    )
                  }
                  className="flex-1 border rounded-xl py-4 hover:border-pink-500 hover:text-pink-600 transition cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-b from-[#8b2d52] to-[#d65b9c] text-white p-6">
            <p className="text-sm opacity-80">Standard Review</p>
            <h2 className="text-4xl font-bold mt-2">$49</h2>
            <p className="text-sm mt-1">One-time payment</p>

            <ul className="mt-4 space-y-2 text-sm">
              <li>3-5 detailed reviews</li>
              <li>48-hour turnaround</li>
              <li>Structured feedback</li>
              <li>Actionable suggestions</li>
              <li>Version comparison</li>
            </ul>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 w-full bg-white text-pink-700 rounded-xl py-3 font-medium hover:opacity-90 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit for Review"}
            </button>
          </div>

          <div className="bg-white rounded-2xl border p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-2">What You'll Get</h3>
            <ul className="space-y-2">
              <li>Photos analysis</li>
              <li>Bio and prompt feedback</li>
              <li>Authenticity rating</li>
              <li>Overall impression score</li>
              <li>Specific action items</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-2">100% Confidential</h3>
            <p>
              Your profile is never shared publicly. Only selected reviewers see it, and all feedback is anonymous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
