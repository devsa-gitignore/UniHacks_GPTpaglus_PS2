import React, { useState, useEffect, useRef } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUser, FiBell, FiLogOut } from "react-icons/fi";
import { IoEyeOutline, IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import PL from "../assets/PL Logo.png";

const Navbar = () => {
  return (
    <>
      <div className="border-r-2 border-gray-400 p-4 fixed flex flex-col items-center gap-4 h-screen px-8">
        <Link to="/home">
          <div className="flex justify-center items-center font-semibold text-2xl">
            <img src={PL} className="rounded-3xl p-2 w-16 " />
            ProfileLens
          </div>
        </Link>
        <ul className="flex flex-col font-medium">
          <Link to="/home">
            <li className="text-gray-800 hover:text-[#6C0C27] flex flex-row transition-transform cursor-pointer  hover:bg-gradient-to-l from-[#ffd7ef96] to-white rounded-xl px-8 py-4">
              <MdOutlineDashboard className="mr-2 w-6 h-6" /> Dashboard
            </li>
          </Link>
          <Link to="/profiles">
            <li className="text-gray-800 hover:text-[#6C0C27] flex flex-row transition-transform cursor-pointer hover:bg-gradient-to-l from-[#ffd7ef96] to-white rounded-xl px-8 py-4">
              <FiUser className="mr-2 w-6 h-6" /> My Profiles
            </li>
          </Link>
          <Link to="/reviews"><li className="text-gray-800 hover:text-[#6C0C27] flex flex-row transition-transform cursor-pointer hover:bg-gradient-to-l from-[#ffd7ef96] to-white rounded-xl px-8 py-4">
            <IoEyeOutline className="mr-2 w-6 h-6" /> Reviews
          </li></Link>
          <li className="text-gray-800 hover:text-[#6C0C27] flex flex-row transition-transform cursor-pointer hover:bg-gradient-to-l from-[#ffd7ef96] to-white rounded-xl px-8 py-4">
            <FiBell className="mr-2 w-6 h-6" /> Notifications
          </li>
          <li className="text-gray-800 hover:text-[#6C0C27] flex flex-row transition-transform cursor-pointer hover:bg-gradient-to-l from-[#ffd7ef96] to-white rounded-xl px-8 py-4">
            <IoSettingsOutline className="mr-2 w-6 h-6" /> Settings
          </li>
          <li className="text-gray-800 hover:text-[#6C0C27] flex flex-row transition-transform cursor-pointer hover:bg-gradient-to-l from-[#ffd7ef96] to-white rounded-xl px-8 py-4">
            <FiLogOut className="mr-2 w-6 h-6" /> Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
