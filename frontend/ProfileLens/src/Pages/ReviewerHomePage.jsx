import { FaStar } from "react-icons/fa";
import { IoEyeOutline, IoDocumentTextOutline } from "react-icons/io5";
import { FiClock, FiTrendingUp } from "react-icons/fi";

const stats = [
  {
    icon: <FiClock className="text-purple-500" />,
    value: "3",
    label: "Awaiting Review",
    badge: "Pending",
    badgeColor: "bg-orange-100 text-orange-600",
  },
  {
    icon: <IoEyeOutline className="text-blue-500" />,
    value: "47",
    label: "Completed\nThis Month",
  },
  {
    icon: <FaStar className="text-green-500" />,
    value: "4.9",
    label: "Avg Quality Rating",
  },
  {
    icon: <FiTrendingUp className="text-purple-500" />,
    value: "18m",
    label: "Avg Review Time",
  },
];

const readyProfiles = [
  {
    id: "#2847",
    meta: "Woman, 28 • Long-term • 5 photos • 2 hours ago",
    urgent: true,
    payment: "$15",
  },
  {
    id: "#2853",
    meta: "Man, 32 • Serious • 6 photos • 5 hours ago",
    payment: "$15",
  },
  {
    id: "#2859",
    meta: "Non-binary, 26 • Long-term • 4 photos • 8 hours ago",
    payment: "$15",
  },
];

const completed = [
  { id: "#2841", time: "1 hour ago" },
  { id: "#2838", time: "3 hours ago" },
  { id: "#2835", time: "6 hours ago" },
  { id: "#2829", time: "1 day ago" },
];

export default function ReviewerHomePage() {
  return (
    <div className="bg-white h-fit py-8 space-y-8 px-8">

      {/* ===== Header ===== */}
      <div>
        <h1 className="text-3xl font-semibold text-[#6C0C27]">Review Queue</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a profile to start reviewing
        </p>
      </div>

      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#f1c5d8] p-6 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#f7e4ee] flex items-center justify-center text-lg">
                {s.icon}
              </div>

              {s.badge && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${s.badgeColor}`}
                >
                  {s.badge}
                </span>
              )}
            </div>

            <p className="text-2xl font-semibold text-[#6C0C27] mt-6">
              {s.value}
            </p>

            <p className="text-sm text-gray-500 whitespace-pre-line">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ===== Profiles Ready ===== */}
      <div className="rounded-2xl border border-[#f1c5d8] bg-white p-6 space-y-6">
        <h2 className="text-xl font-semibold text-[#6C0C27]">
          Profiles Ready for Review
        </h2>


        <div className="space-y-4">
          {readyProfiles.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border border-[#f1c5d8] rounded-xl p-4 hover:bg-[#fff6fa] transition cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f7e4ee] flex items-center justify-center text-[#6C0C27]">
                  <IoDocumentTextOutline />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#6C0C27]">
                      User {p.id}
                    </p>

                    {p.urgent && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">{p.meta}</p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-green-600 font-semibold">{p.payment}</p>
                <p className="text-xs text-gray-400">Payment</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Recently Completed ===== */}
      <div className="rounded-2xl border border-[#f1c5d8] bg-white p-6 space-y-6">
        <h2 className="text-xl font-semibold text-[#6C0C27]">
          Recently Completed
        </h2>

        <div className="space-y-6">
          {completed.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <IoEyeOutline />
                </div>

                <div>
                  <p className="font-medium text-[#6C0C27]">User {c.id}</p>
                  <p className="text-sm text-gray-400">{c.time}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-green-600 font-semibold text-sm">+$15</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
