import { Outlet } from "react-router-dom";
import UserNavbar from "./Navbar";
import ReviewerNavbar from "./ReviewerNavbar";

export default function PagesWithNavbar() {
  const role = localStorage.getItem("role");

  const Navbar = role === "reviewer" ? ReviewerNavbar : ReviewerNavbar;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Dynamic Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
}
