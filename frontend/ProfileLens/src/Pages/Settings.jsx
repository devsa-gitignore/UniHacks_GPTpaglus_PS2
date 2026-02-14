import { FaCamera } from "react-icons/fa";
import { FiSave } from "react-icons/fi";

export default function Settings() {
  return (
    <div className="bg-[#faf6f8] min-h-screen px-12 py-10 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-semibold text-[#6C0C27]">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-8 border-b pb-3 text-sm text-gray-500">
        <button className="text-[#6C0C27] border-b-2 border-purple-500 pb-3 font-medium">
          Profile
        </button>
        <button className="hover:text-[#6C0C27]">Notifications</button>
        <button className="hover:text-[#6C0C27]">Privacy</button>
        <button className="hover:text-[#6C0C27]">Billing</button>
      </div>

      {/* ================= PROFILE INFO ================= */}
      <div className="bg-white border rounded-3xl p-8 space-y-8">
        <h2 className="text-lg font-semibold text-[#6C0C27]">
          Profile Information
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-2xl font-semibold text-[#6C0C27]">
            AK
          </div>

          <button className="flex items-center gap-2 border border-[#6C0C27] text-[#6C0C27] px-4 py-2 rounded-full text-sm hover:bg-pink-50">
            <FaCamera /> Upload Photo
          </button>

          <button className="text-red-500 text-sm hover:underline">
            Remove
          </button>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="First Name" value="Alex" />
          <Input label="Last Name" value="Kim" />
          <Input label="Email" value="alex.kim@example.com" />
          <Input label="Phone Number" value="+1 (555) 123-4567" />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button className="px-5 py-2 rounded-full border text-sm hover:bg-gray-50">
            Cancel
          </button>

          <button className="flex items-center gap-2 px-6 py-2 rounded-full text-white bg-gradient-to-r from-[#7e233f] to-[#d65b9c] text-sm">
            <FiSave /> Save Changes
          </button>
        </div>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="bg-white border rounded-3xl p-8 space-y-6">
        <h2 className="text-lg font-semibold text-[#6C0C27]">
          Change Password
        </h2>

        <div className="max-w-xl space-y-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-[#7e233f] to-[#d65b9c] text-sm">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= Reusable Input ================= */
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
