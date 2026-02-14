import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function PagesWithNavbar() {
  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
        <div className="ml-64 outlet">
          <Outlet />
        </div>
    </div>
  );
}
