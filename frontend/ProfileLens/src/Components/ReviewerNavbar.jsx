import { Link } from "react-router-dom";
import {
  IoDocumentTextOutline,
  IoEyeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FiDollarSign, FiLogOut } from "react-icons/fi";
import PL from "../assets/PL Logo.png";

const ReviewerNavbar = () => {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen border-r-2 border-gray-200 bg-white flex flex-col px-8 py-6">
      {/* ===== TOP ===== */}
      <div>
        {/* Logo — SAME STYLE AS USER NAVBAR */}
        <Link to="/reviewees">
          <div className="flex items-center gap-3 font-semibold text-2xl mb-8">
            <img src={PL} className="rounded-3xl p-2 w-14" />
            ProfileLens
          </div>
        </Link>

        {/* Reviewer Info */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Reviewer Mode
          </p>

          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 rounded-full hover:bg-[#ffd7ef96] flex items-center justify-center text-[#6C0C27] font-semibold">
              JD
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">Jordan Davis</p>
              <p className="text-xs text-gray-400">Expert Reviewer</p>
            </div>
          </div>
        </div>

        {/* Navigation — MATCHED HOVER + SPACING */}
        <ul className="flex flex-col font-medium space-y-1">
          <Link to="/reviewees">
            <li className="flex items-center gap-2 px-6 py-3 rounded-xl hover:text-[#6C0C27] hover:bg-gradient-to-l from-[#ffd7ef96] to-white transition">
              <IoDocumentTextOutline className="w-5 h-5" />
              Review Queue
            </li>
          </Link>

          <Link to="/earnings">
            <li className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-800 hover:text-[#6C0C27] hover:bg-gradient-to-l from-[#ffd7ef96] to-white transition">
              <FiDollarSign className="w-5 h-5" />
              Earnings
            </li>
          </Link>

          <Link to="/reviewersettings">
            <li className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-800 hover:text-[#6C0C27] hover:bg-gradient-to-l from-[#ffd7ef96] to-white transition">
              <IoSettingsOutline className="w-5 h-5" />
              Settings
            </li>
          </Link>
        </ul>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="mt-auto space-y-6">
        {/* Earnings Card — SOFT THEME MATCH */}
        <div className="bg-[#ffd7ef4d] rounded-xl p-4">
          <p className="text-xl font-semibold text-[#6C0C27]">$285</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>

          <button className="mt-3 w-full border border-[#6C0C27] text-[#6C0C27] text-sm py-1.5 rounded-lg hover:bg-[#ffd7ef96] transition">
            Cash Out
          </button>
        </div>

        {/* Logout — MATCH USER NAVBAR STYLE */}
        <button className="flex items-center gap-2 text-gray-800 hover:text-[#6C0C27] transition">
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ReviewerNavbar;
