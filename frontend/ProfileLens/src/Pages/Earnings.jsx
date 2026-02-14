import {
  FiTrendingUp,
  FiDownload,
  FiArrowUpRight,
  FiArrowDownLeft,
} from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

export default function Earnings() {
  const transactions = [
    { title: "Review - User #2841", date: "Feb 14, 2026", amount: "+$15" },
    { title: "Review - User #2838", date: "Feb 14, 2026", amount: "+$15" },
    { title: "Review - User #2835", date: "Feb 13, 2026", amount: "+$15" },
    { title: "Review - User #2829", date: "Feb 13, 2026", amount: "+$15" },
    { title: "Review - User #2824", date: "Feb 12, 2026", amount: "+$15" },
    { title: "Cash Out", date: "Feb 10, 2026", amount: "-$150", danger: true },
    { title: "Review - User #2819", date: "Feb 9, 2026", amount: "+$15" },
    { title: "Review - User #2814", date: "Feb 8, 2026", amount: "+$15" },
  ];

  const payouts = [
    { method: "PayPal", date: "Feb 10, 2026", amount: "$150" },
    { method: "Bank Transfer", date: "Jan 25, 2026", amount: "$225" },
    { method: "PayPal", date: "Jan 10, 2026", amount: "$180" },
  ];

  return (
    <div className="bg-[#faf6f8] min-h-screen px-10 py-10 space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-semibold text-[#6C0C27]">Earnings</h1>
        <p className="text-gray-500 mt-1">
          Track your income and manage payouts
        </p>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Current Balance */}
        <div className="rounded-3xl p-6 bg-white border border-gray-400">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center text-green-700">
              <FaDollarSign />
            </div>

            <span className="text-green-600 text-sm flex items-center gap-1">
              <FiTrendingUp /> +12%
            </span>
          </div>

          <h2 className="text-3xl font-semibold mt-6 text-[#6C0C27]">$285</h2>
          <p className="text-gray-600 mt-1">Current Balance</p>

          <button className="mt-6 w-full bg-[#6C0C27] hover:bg-[#873650] text-white py-2.5 rounded-full text-sm cursor-pointer">
            Request Payout
          </button>
        </div>

        {/* This Month */}
        <div className="rounded-3xl p-6 bg-white border border-gray-400">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <IoCalendarOutline />
          </div>

          <h2 className="text-3xl font-semibold mt-6 text-[#6C0C27]">$285</h2>
          <p className="text-gray-600">This Month</p>
          <p className="text-xs text-gray-400 mt-2">19 reviews completed</p>
        </div>

        {/* All Time */}
        <div className="rounded-3xl p-6 bg-white border border-gray-400">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <FiTrendingUp />
          </div>

          <h2 className="text-3xl font-semibold mt-6 text-[#6C0C27]">
            $1,725
          </h2>
          <p className="text-gray-600">All Time</p>
          <p className="text-xs text-gray-400 mt-2">115 total reviews</p>
        </div>
      </div>

      {/* ================= OVERVIEW + PAYMENT ================= */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Earnings Overview */}
        <div className="lg:col-span-2 bg-white border border-gray-400 rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[#6C0C27]">Earnings Overview</h2>

            <button className="flex items-center gap-2 border border-gray-400 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">
              <FiDownload /> Export
            </button>
          </div>

          {/* Fake chart */}
          <div className="h-60 rounded-xl bg-gradient-to-t from-emerald-200/60 to-transparent border border-gray-400 flex items-end justify-between px-6 pb-3 text-xs text-gray-400">
            {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center pt-2">
            <div>
              <p className="text-[#6C0C27] font-semibold">$180</p>
              <p className="text-xs text-gray-500">Lowest Month</p>
            </div>
            <div>
              <p className="text-[#6C0C27] font-semibold">$244</p>
              <p className="text-xs text-gray-500">Avg per Month</p>
            </div>
            <div>
              <p className="text-green-600 font-semibold">$315</p>
              <p className="text-xs text-gray-500">Highest Month</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white border border-gray-400 rounded-3xl p-6 space-y-6">
          <h2 className="font-semibold text-[#6C0C27]">Payment Method</h2>

          <div className="border border-gray-400 rounded-2xl p-4 bg-purple-50 space-y-1">
            <p className="font-medium">PayPal</p>
            <p className="text-xs text-gray-500">j.davis@email.com</p>
            <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full inline-block mt-1">
              Default
            </span>
          </div>

          <button className="w-full border border-gray-400 rounded-full py-2 text-sm hover:bg-gray-50 cursor-pointer">
            Change Payment Method
          </button>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Minimum Payout</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Time</span>
              <span>2–3 days</span>
            </div>
            <div className="flex justify-between">
              <span>Fee</span>
              <span>Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <div className="bg-white border border-gray-400 rounded-3xl p-6 space-y-6">
        <h2 className="font-semibold text-[#6C0C27]">Recent Transactions</h2>

        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${t.danger ? "bg-orange-100 text-orange-500" : "bg-green-100 text-green-600"}`}
              >
                {t.danger ? <FiArrowDownLeft /> : <FiArrowUpRight />}
              </div>

              <div>
                <p className="text-gray-800">{t.title}</p>
                <p className="text-xs text-gray-400">{t.date}</p>
              </div>
            </div>

            <span
              className={`font-semibold ${
                t.danger ? "text-orange-500" : "text-green-600"
              }`}
            >
              {t.amount}
            </span>
          </div>
        ))}

        <button className="w-full border border-gray-400 rounded-full py-2 text-sm hover:bg-gray-50 cursor-pointer">
          View All Transactions
        </button>
      </div>

      {/* ================= PAYOUT HISTORY ================= */}
      <div className="bg-white border border-gray-400 rounded-3xl p-6 space-y-6">
        <h2 className="font-semibold text-[#6C0C27]">Payout History</h2>

        {payouts.map((p, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-gray-800">{p.method}</p>
              <p className="text-xs text-gray-400">{p.date}</p>
            </div>

            <div className="text-right">
              <p className="text-[#6C0C27] font-semibold">{p.amount}</p>
              <p className="text-xs text-green-600">Completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
