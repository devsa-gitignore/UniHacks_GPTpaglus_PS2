import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTrendingUp } from "react-icons/fi";
import { authFetch } from "../lib/api";

const formatDate = (dateValue) => {
  if (!dateValue) return "N/A";
  return new Date(dateValue).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const metricRows = (version) => [
  { label: "Photos", score: Math.round(version?.section_scores?.photos || 0) },
  { label: "Bio", score: Math.round(version?.section_scores?.bio || 0) },
  { label: "Prompts", score: Math.round(version?.section_scores?.prompts || 0) },
  { label: "Authenticity", score: Math.round(version?.overall_score || 0) },
];

const CompareReview = () => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompareData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await authFetch("/api/profiles/compare/");
        const data = await response.json();

        if (!response.ok) {
          setError(data.detail || "Could not load comparison data.");
          setVersions([]);
          return;
        }

        setVersions(Array.isArray(data) ? data : []);
      } catch {
        setError("Server unavailable. Please try again.");
        setVersions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, []);

  const firstVersion = versions[0] || null;
  const latestVersion = versions[versions.length - 1] || null;
  const previousVersion = versions.length > 1 ? versions[versions.length - 2] : null;

  const totalGrowth = useMemo(() => {
    if (!firstVersion?.overall_score || !latestVersion?.overall_score) return 0;
    return Math.round(Number(latestVersion.overall_score) - Number(firstVersion.overall_score));
  }, [firstVersion, latestVersion]);

  const growthPct = useMemo(() => {
    if (!firstVersion?.overall_score || !latestVersion?.overall_score) return 0;
    const base = Number(firstVersion.overall_score);
    if (base <= 0) return 0;
    return Math.round(((Number(latestVersion.overall_score) - base) / base) * 100);
  }, [firstVersion, latestVersion]);

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
          <h1 className="text-3xl font-semibold text-gray-800">Version Comparison</h1>
          <p className="text-gray-600 text-sm mt-1">Track your profile improvements over time</p>
        </div>

        {loading && <p className="text-sm text-gray-500">Loading comparison data...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="rounded-3xl bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white p-8 shadow-md">
          <div className="flex items-center gap-2 mb-6 font-medium">
            <FiTrendingUp />
            Your Improvement Journey
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                value: firstVersion?.overall_score ?? "-",
                label: "Starting Score",
                sub: formatDate(firstVersion?.created_at),
              },
              {
                value: latestVersion?.overall_score ?? "-",
                label: "Current Score",
                sub: formatDate(latestVersion?.created_at),
              },
              {
                value: latestVersion && firstVersion ? `${totalGrowth >= 0 ? "+" : ""}${totalGrowth}` : "-",
                label: "Total Growth",
                sub: `${growthPct}% improvement`,
              },
              {
                value: versions.length,
                label: "Versions",
                sub: versions.length > 1 ? `${versions.length - 1} revisions` : "No revisions",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm opacity-80">{item.label}</div>
                <div className="text-xs opacity-70 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-pink-200 rounded-2xl p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Score Progression</h2>

          <div className="h-20 flex items-end justify-between px-6 text-xs text-gray-500">
            {versions.length === 0 && <span>No versions yet</span>}
            {versions.map((version) => (
              <span key={version.id}>V{version.version_number}</span>
            ))}
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            {versions.map((version) => `V${version.version_number}: ${Math.round(version.overall_score || 0)}`).join(" | ") ||
              "No scores yet"}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Compare Versions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[previousVersion, latestVersion].map((version, idx) => {
              if (!version) {
                return (
                  <div key={idx} className="bg-pink-50 border border-pink-200 rounded-2xl p-6 text-sm text-gray-600">
                    Not enough versions to compare yet.
                  </div>
                );
              }

              return (
                <div key={version.id} className="bg-pink-50 border border-pink-200 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">Version {version.version_number}</h3>
                      <p className="text-xs text-gray-400">{formatDate(version.created_at)}</p>
                    </div>
                    <div className="text-2xl font-bold text-pink-700">{Math.round(version.overall_score || 0)}</div>
                  </div>

                  {metricRows(version).map((item, i) => (
                    <div key={`${version.id}-${i}`}>
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
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Timeline of Revisions</h2>

          {versions.length === 0 && <p className="text-sm text-gray-600">No versions submitted yet.</p>}
          {[...versions].reverse().map((version) => (
            <div key={version.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold">
                {Math.round(version.overall_score || 0)}
              </div>

              <div>
                <div className="font-medium">
                  Version {version.version_number}
                  <span className="text-xs text-gray-400 ml-2">{formatDate(version.created_at)}</span>
                </div>

                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>Bio length: {version.bio?.length || 0} characters</li>
                  <li>Photos score: {Math.round(version.section_scores?.photos || 0)}/100</li>
                  <li>Prompts score: {Math.round(version.section_scores?.prompts || 0)}/100</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-8 space-y-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Continue Improving</h3>
            <p className="text-sm text-gray-500 mt-1">
              Implement remaining suggestions to push your score even higher.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/reviews">
              <button className="bg-gradient-to-r from-[#8b2d52] to-[#d65b9c] text-white px-5 py-2 rounded-xl text-sm cursor-pointer">
                View Full Feedback
              </button>
            </Link>
            <Link to="/profiles">
              <button className="border-2 border-[#8b2d52] px-5 py-2 rounded-xl text-sm hover:bg-gray-50 text-[#8b2d52] cursor-pointer">
                Upload New Version
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareReview;
