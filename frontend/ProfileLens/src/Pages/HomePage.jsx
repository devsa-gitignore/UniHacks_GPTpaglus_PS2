import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdOutlineFileUpload, MdFeedback, MdPhoto } from "react-icons/md";
import { HiArrowUpTray } from "react-icons/hi2";
import { useEffect, useMemo, useState } from "react";
import { authFetch } from "../lib/api";


const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) return <FaStar key={i} />;
        if (rating >= i - 0.5) return <FaStarHalfAlt key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
  );
};


const ActivityItem = ({ icon: Icon, bg, color, text, time }) => (
  <div className="flex items-start gap-4">
    <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${bg} ${color}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-gray-800 text-sm">{text}</p>
      <p className="text-gray-400 text-xs mt-1">{time}</p>
    </div>
  </div>
);

const HomePage = () => {
  const [versions, setVersions] = useState([]);
  const [latestReview, setLatestReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      try {
        const [versionsRes, latestReviewRes] = await Promise.all([
          authFetch("/api/profiles/versions/"),
          authFetch("/api/reviews/latest/"),
        ]);

        if (versionsRes.ok) {
          const versionsData = await versionsRes.json();
          setVersions(Array.isArray(versionsData) ? versionsData : []);
        }

        if (latestReviewRes.ok) {
          const reviewData = await latestReviewRes.json();
          setLatestReview(reviewData);
        } else {
          setLatestReview(null);
        }
      } catch {
        setVersions([]);
        setLatestReview(null);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const username = localStorage.getItem("username") || "there";
  const latestVersion = versions[0] || null;

  const displayDate = (isoDate) => {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const versionCount = versions.length;
  const reviewScoreOutOfFive = useMemo(() => {
    if (!latestReview?.overall_score) return 0;
    return Math.min(5, Number(latestReview.overall_score));
  }, [latestReview]);

  return (
    <div className="w-[79rem] h-fit py-8 space-y-8 px-8">


      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, {username}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's how your profile is performing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <StarRating rating={reviewScoreOutOfFive || 0} />
          <p className="text-gray-500 mt-4 text-sm">Current Score</p>
          <p className="text-green-600 text-sm mt-2">
            {latestReview ? `${latestReview.overall_score}/5 from latest review` : "No reviews yet"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-800">{versionCount}</h2>
          <p className="text-gray-500 mt-2 text-sm">Profile Versions</p>
          <p className="text-gray-400 text-sm mt-2">Latest: {displayDate(latestVersion?.created_at)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-800">{latestReview ? 1 : 0}</h2>
          <p className="text-gray-500 mt-2 text-sm">Reviews Received</p>
          <p className="text-gray-400 text-sm mt-2">
            Avg rating: {latestReview?.overall_score ? `${latestReview.overall_score}/5` : "N/A"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-800">
            {latestVersion ? `${Number(latestVersion.improvement_percentage || 0).toFixed(0)}%` : "0%"}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Improvement</p>
          <p className="text-gray-400 text-sm mt-2">Since first version</p>
        </div>
      </div>
      {loading && <p className="text-sm text-gray-500">Refreshing dashboard...</p>}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Feedback Summary */}
        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Feedback Summary
          </h2>

          <div className="flex justify-center mb-8 text-center">
            <div>
              <StarRating rating={3} />
              <p className="text-sm text-gray-600 mt-2">Overall Score</p>
            </div>
          </div>

          {[
            { label: "Photos", rating: 4 },
            { label: "Bio", rating: 3 },
            { label: "Prompts", rating: 4 },
            { label: "Authenticity", rating: 3 },
          ].map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{item.label}</span>
                <StarRating rating={item.rating} />
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-[#6c0c27bc] rounded-full w-[85%]"></div>
              </div>
            </div>
          ))}

          <button className="mt-6 w-full border rounded-xl py-3 text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-3 cursor-pointer">
            <MdOutlineFileUpload size={20} />
            Upload New Version
          </button>
        </div>

        {/* Improvement Progress */}
        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Improvement Progress
          </h2>

          <div className="h-56 bg-gradient-to-t from-pink-200/70 to-transparent rounded-lg border flex items-end justify-between px-6 text-xs text-gray-400">
            <span>V1</span>
            <span>V2</span>
            <span>V3</span>
          </div>

          <div className="mt-6 bg-pink-100 rounded-2xl p-4 flex justify-between items-center text-center">
            <div>
              <StarRating rating={3} />
              <p className="text-xs text-gray-600">Starting Score</p>
            </div>

            <div className="text-xl font-semibold text-[#6c0c27bc]">+23</div>

            <div>
              <StarRating rating={4} />
              <p className="text-xs text-gray-600">Current Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Activity
        </h2>

        <div className="space-y-6">
          <ActivityItem
            icon={MdFeedback}
            bg="bg-purple-100"
            color="text-purple-600"
            text="Received feedback from Reviewer #3"
            time="2 hours ago"
          />

          <ActivityItem
            icon={HiArrowUpTray}
            bg="bg-blue-100"
            color="text-blue-600"
            text="Profile Version 3 submitted for review"
            time="3 days ago"
          />

          <ActivityItem
            icon={FiEye}
            bg="bg-green-100"
            color="text-green-600"
            text="Viewed comparison between V2 and V3"
            time="4 days ago"
          />

          <ActivityItem
            icon={MdPhoto}
            bg="bg-orange-100"
            color="text-orange-600"
            text="Updated profile photos"
            time="5 days ago"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
