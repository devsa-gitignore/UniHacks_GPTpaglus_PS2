import {
  FaRegCommentDots,
  FaArrowUp,
  FaClock,
  FaExclamationCircle,
  FaStar,
  FaCheckCircle,
  FaGift,
} from "react-icons/fa";

export default function Notifications() {
  return (
    <div className="bg-[#faf6f8] min-h-screen px-12 py-10 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-[#6C0C27]">
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">
            Stay updated on your profile reviews and feedback
          </p>
        </div>

        <button className="text-sm text-[#6C0C27] hover:underline cursor-pointer">
          Mark all as read
        </button>
      </div>

      {/* ================= FILTER TABS ================= */}
      <div className="flex gap-6 text-sm text-gray-500 items-center">
        <button className="px-4 py-1.5 rounded-full border border-pink-200 text-[#6C0C27] cursor-pointer">
          All
        </button>
      </div>

      {/* ================= NEW ================= */}
      <SectionTitle title="New" />

      <NotificationCard
        icon={<FaRegCommentDots />}
        title="New Feedback Received"
        description="Reviewer #3 has completed your Version 3 profile review with a score of 85/100"
        action="View Feedback"
        time="2 hours ago"
        highlight
      />

      <NotificationCard
        icon={<FaArrowUp />}
        title="Score Improvement!"
        description="Your profile score increased from 74 to 85. Great progress!"
        action="View Dashboard"
        time="3 hours ago"
        highlight
        green
      />

      {/* ================= EARLIER ================= */}
      <SectionTitle title="Earlier" />

      <NotificationCard
        icon={<FaClock />}
        title="Review In Progress"
        description="Your Version 3 profile is currently being reviewed by an expert"
        time="1 day ago"
      />

      <NotificationCard
        icon={<FaExclamationCircle />}
        title="Profile Tip"
        description="Did you know? Profiles with full-body photos receive 40% more engagement"
        action="Learn More"
        time="2 days ago"
      />

      <NotificationCard
        icon={<FaRegCommentDots />}
        title="Feedback Available"
        description="Reviewer #2 has provided detailed feedback on your photos and bio"
        action="View Feedback"
        time="3 days ago"
      />

      <NotificationCard
        icon={<FaStar />}
        title="Achievement Unlocked!"
        description="You have reached an 85+ profile score. Keep up the great work!"
        time="4 days ago"
      />

      <NotificationCard
        icon={<FaCheckCircle />}
        title="Review Completed"
        description="Your Version 2 profile review has been completed"
        action="View Results"
        time="5 days ago"
      />

      <NotificationCard
        icon={<FaGift />}
        title="Special Offer"
        description="Get 20% off your next profile review. Offer expires in 3 days!"
        action="Claim Offer"
        time="6 days ago"
      />
    </div>
  );
}

/* ================= Section Title ================= */
function SectionTitle({ title }) {
  return (
    <h2 className="text-lg font-semibold text-[#6C0C27]">{title}</h2>
  );
}

/* ================= Notification Card ================= */
function NotificationCard({
  icon,
  title,
  description,
  action,
  time,
  highlight = false,
  green = false,
}) {
  return (
    <div
      className={`flex justify-between gap-6 border rounded-2xl p-5 bg-white ${
        highlight ? "border-[#8b2d52] shadow-sm" : "border-gray-200"
      }`}
    >
      {/* LEFT */}
      <div className="flex gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
          ${green ? "bg-green-100 text-green-600" : "bg-pink-100 text-[#6C0C27]"}`}
        >
          {icon}
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>

          {action && (
            <button className="mt-2 px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-[#7e233f] to-[#d65b9c] text-white cursor-pointer">
              {action}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT TIME */}
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
}
