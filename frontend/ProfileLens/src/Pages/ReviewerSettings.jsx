import { useState } from "react";
import { FaCamera, FaCreditCard } from "react-icons/fa";
import { FiSave } from "react-icons/fi";

export default function ReviewerSettings() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  const removeAvatar = () => setAvatar(null);

  return (
    <div className="bg-[#faf6f8] min-h-screen px-6 md:px-12 py-10 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-semibold text-[#6C0C27]">
          Reviewer Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your reviewer account and preferences
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-8 border-b pb-3 text-sm">
        <Tab active>Profile</Tab>
      </div>

      {/* ================= REVIEWER PROFILE ================= */}
      <Card>
        <h2 className="section-title">Reviewer Profile</h2>

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-2xl font-semibold text-[#6C0C27]">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              "JD"
            )}
          </div>

          <label className="flex items-center gap-2 border border-[#6C0C27] text-[#6C0C27] px-4 py-2 rounded-full text-sm hover:bg-pink-50 cursor-pointer">
            <FaCamera /> Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>

          {avatar && (
            <button
              onClick={removeAvatar}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          )}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="First Name" />
          <Input label="Last Name" />
          <Input label="Email" />
          <Input label="Phone Number" />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button className="px-5 py-2 rounded-full border text-sm cursor-pointer hover:bg-gray-50">
            Cancel
          </button>

          <button className="flex items-center gap-2 px-6 py-2 rounded-full text-white bg-gradient-to-r cursor-pointer from-[#7e233f] to-[#d65b9c] text-sm">
            <FiSave /> Save Changes
          </button>
        </div>
      </Card>

      {/* ================= REVIEWER STATS ================= */}
      <Card>
        <h2 className="section-title">Reviewer Stats</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <StatBox
            value="47"
            label="Total Reviews"
            gradient="from-pink-100 to-pink-50"
          />
          <StatBox
            value="4.9★"
            label="Quality Rating"
            gradient="from-green-100 to-green-50"
          />
          <StatBox
            value="Expert"
            label="Reviewer Level"
            gradient="from-blue-100 to-blue-50"
          />
        </div>
      </Card>

      {/* ================= PAYMENT INFO ================= */}
      <Card>
        <h2 className="section-title">Payment Information</h2>

        <div className="border border-pink-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-sm transition">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7e233f] to-[#d65b9c] text-white flex items-center justify-center">
            <FaCreditCard />
          </div>

          <div>
            <p className="font-medium text-gray-800">PayPal</p>
            <p className="text-sm text-gray-500">j.davis@email.com</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="mt-6 outline-btn cursor-pointer border border-pink-200 px-8 py-4 rounded-3xl justify-center items-center hover:bg-pink-50">
            Change Payment Method
          </button>
        </div>
      </Card>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Tab({ children, active }) {
  return (
    <button
      className={`pb-3 font-medium transition
        ${
          active
            ? "text-[#6C0C27] border-b-2 border-pink-500"
            : "text-gray-500 hover:text-[#6C0C27]"
        }`}
    >
      {children}
    </button>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white border border-pink-200 rounded-3xl p-8 space-y-8 shadow-sm">
      {children}
    </div>
  );
}


function StatBox({ value, label, gradient }) {
  return (
    <div className={`rounded-2xl p-6 bg-gradient-to-br ${gradient}`}>
      <p className="text-2xl font-semibold text-[#6C0C27]">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function Input({ label, value = "", type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="w-full border border-pink-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pink-200"
      />
    </div>
  );
}
