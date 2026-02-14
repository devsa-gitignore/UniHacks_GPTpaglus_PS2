import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Landup from "./Pages/Landup";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import Reviews from "./Pages/Reviews";
import Compare from "./Pages/CompareReview";
import PagesWithNavbar from "./Components/PagesWithNavbar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<PagesWithNavbar />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profiles" element={<Profile />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/compare" element={<Compare />} />
            
          </Route>
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
