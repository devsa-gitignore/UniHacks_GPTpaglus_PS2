import React from "react";
import PL from "../assets/PL.png";
import PLLogo from "../assets/PL Logo.png";
import SC from "../assets/SC.png";
import ER from "../assets/ER.png";
import MJ from "../assets/MJ.png";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { BsGraphUpArrow } from "react-icons/bs";

const Landup = () => {
  return (
    <div className="overflow-x-hidden">
      {/* 1. FIXED NAVBAR: Using Flexbox instead of left-[52rem] */}
      <nav className="bg-white sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-sm">
        <img src={PL} alt="ProfileLens" className="h-12 object-contain" />
        <div className="flex items-center gap-10">
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-[#6C0C27] transition">Features</li>
            <li className="cursor-pointer hover:text-[#6C0C27] transition">How it Works</li>
            <li className="cursor-pointer hover:text-[#6C0C27] transition">Reviews</li>
          </ul>
          <Link to="/login">
            <button className="rounded-full bg-gradient-to-r from-[#6C0C27] to-[#EC38A4] py-2 px-6 text-white font-semibold hover:opacity-90 transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-l from-[#f99fd6] to-[#FFF2FA] py-20 flex flex-col items-center text-center px-4">
        <div className="rounded-full bg-white py-2 px-6 w-fit flex justify-center items-center gap-3 shadow-md mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="font-medium text-gray-700">Trusted by 10,000+ users</div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-[#6C0C27] max-w-4xl leading-tight">
          Helping You Get Matches... not Ghosted
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mt-6 text-[#6C0C27]">
          Because "I love Travelling and Food" isn't groundbreaking!
        </h2>
        
        <p className="max-w-3xl text-xl mt-8 text-gray-600">
          Get private, structured feedback from real people who match your
          dating goals. Improve your profile with actionable insights and
          track your progress over time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <Link to="/login">
            <button className="rounded-full bg-gradient-to-r from-[#6C0C27] to-[#EC38A4] py-4 px-8 text-xl text-white font-semibold shadow-lg hover:scale-105 transition transform">
              Get My Profile Reviewed
            </button>
          </Link>
          <button className="rounded-full bg-white py-4 px-8 text-xl font-semibold text-[#6C0C27] shadow-lg border border-gray-100 hover:bg-gray-50 transition">
            See Example Feedback
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 text-gray-600 font-medium">
          <div className="flex items-center gap-2">
            <FaCheck className="text-green-600 text-xl" /> 100% Private
          </div>
          <div className="flex items-center gap-2">
            <FaCheck className="text-green-600 text-xl" /> Real Reviewers
          </div>
          <div className="flex items-center gap-2">
            <FaCheck className="text-green-600 text-xl" /> 48hr Turnaround
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#6C0C27]">Everything You Need to Stand Out</h2>
          <p className="text-xl mt-4 text-[#8c5968] max-w-2xl mx-auto">
            ProfileLens provides a safe, structured way to improve your dating profile with real human feedback.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="w-72 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg hover:-translate-y-2 transition transform">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-pink-400 text-[#6C0C27]">
              <MdOutlinePrivacyTip className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Private & Confidential</h3>
            <p className="text-gray-500 leading-relaxed">Your profile stays secure. Only selected reviewers see your submissions.</p>
          </div>

          {/* Card 2 */}
          <div className="w-72 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg hover:-translate-y-2 transition transform">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-pink-400 text-[#6C0C27]">
              <SlPeople className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Reviewers</h3>
            <p className="text-gray-500 leading-relaxed">Select 3-5 reviewers based on gender, age, and dating intent.</p>
          </div>

          {/* Card 3 */}
          <div className="w-72 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg hover:-translate-y-2 transition transform">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-pink-400 text-[#6C0C27]">
              <FaRegHeart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Structured Feedback</h3>
            <p className="text-gray-500 leading-relaxed">Get honest insights on photos, bio, prompts, and overall authenticity.</p>
          </div>

          {/* Card 4 */}
          <div className="w-72 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg hover:-translate-y-2 transition transform">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 to-pink-400 text-[#6C0C27]">
              <BsGraphUpArrow className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Track Improvements</h3>
            <p className="text-gray-500 leading-relaxed">Upload multiple versions and visualize your progress over time.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-[#FFF2FA] py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#6C0C27]">How it Works?</h2>
          <p className="text-xl mt-4 text-[#8c5968]">Get feedback in 3 simple steps</p>
        </div>

        <div className="flex flex-wrap justify-center gap-16 max-w-6xl mx-auto text-center">
          <div className="w-72">
            <div className="text-6xl font-bold text-[#6C0C27] opacity-50 mb-4">01</div>
            <h3 className="text-2xl font-semibold text-[#6C0C27] mb-4">Submit Your Profile</h3>
            <p className="text-[#6C0C27] text-lg">Upload photos, bio, and prompts. Choose your dating intent and preference.</p>
          </div>
          <div className="w-72">
            <div className="text-6xl font-bold text-[#6C0C27] opacity-50 mb-4">02</div>
            <h3 className="text-2xl font-semibold text-[#6C0C27] mb-4">Select Reviewers</h3>
            <p className="text-[#6C0C27] text-lg">Pick 3-5 reviewers based on gender, age, and relationship goals.</p>
          </div>
          <div className="w-72">
            <div className="text-6xl font-bold text-[#6C0C27] opacity-50 mb-4">03</div>
            <h3 className="text-2xl font-semibold text-[#6C0C27] mb-4">Get Feedback</h3>
            <p className="text-[#6C0C27] text-lg">Receive structured, honest reviews within 48 hours. Track improvements.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#6C0C27]">Loved by People Like You</h2>
          <p className="text-xl mt-4 text-[#8c5968]">Real feedback from real users who improved their profiles</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {/* Review 1 */}
          <div className="w-80 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex text-yellow-400 text-xl mb-4"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
              <p className="text-gray-600 italic mb-6">"The feedback was eye-opening. I changed 3 photos and rewrote my bio. Got 4x more matches within a week!"</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={SC} alt="Sarah" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-800">Sarah Chen</h3>
                <p className="text-sm text-gray-500">Product Designer, 28</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="w-80 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex text-yellow-400 text-xl mb-4"><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/></div>
              <p className="text-gray-600 italic mb-6">"I was skeptical at first, but the structured feedback made it so clear what to improve. Highly recommend!"</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={ER} alt="Emma" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-800">Emma Rodriguez</h3>
                <p className="text-sm text-gray-500">HR Manager, 26</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="w-80 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex text-yellow-400 text-xl mb-4"><FaStar/><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/></div>
              <p className="text-gray-600 italic mb-6">"ProfileLens helped me see what I was missing. The reviewers were kind but honest. Best $49 I've spent."</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={MJ} alt="Marcus" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-800">Marcus Johnson</h3>
                <p className="text-sm text-gray-500">Software Engineer, 32</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FFF2FA] py-24 px-4 flex justify-center">
        <div className="rounded-3xl text-center py-16 px-8 md:px-20 max-w-5xl bg-gradient-to-br from-[#6C0C27] to-[#F77CC8] shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your dating profile?</h2>
          <p className="text-white text-xl md:text-2xl font-light mb-10 opacity-90">
            Join thousands of users who've improved their profiles and found better matches.
          </p>
          <Link to="/login">
            <button className="rounded-full bg-white text-[#6C0C27] py-4 px-10 text-xl font-bold hover:scale-105 transition transform shadow-lg">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white px-8 md:px-20 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 font-bold text-[#6C0C27] text-2xl mb-4">
              <img src={PLLogo} alt="Logo" className="h-8" />
              ProfileLens
            </div>
            <p className="text-gray-500 leading-relaxed max-w-xs">
              Private, honest feedback to help you shine in the dating world.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Product</h4>
            <ul className="space-y-3 text-gray-500">
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Features</li>
              <li className="hover:text-[#6C0C27] transition cursor-pointer">How It Works</li>
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-gray-500">
              <li className="hover:text-[#6C0C27] transition cursor-pointer">About</li>
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Blog</li>
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Legal</h4>
            <ul className="space-y-3 text-gray-500">
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Privacy</li>
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Terms</li>
              <li className="hover:text-[#6C0C27] transition cursor-pointer">Security</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-400 font-medium">
          &#169; 2026 ProfileLens. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landup;