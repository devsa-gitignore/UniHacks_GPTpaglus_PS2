import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Landup from "./Pages/Landup";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import Reviews from "./Pages/Reviews";
import Compare from "./Pages/CompareReview";
import ReviewerSelection from "./Pages/ReviewerSelection";
import Payment from "./Pages/Payment";
import PagesWithNavbar from "./Components/PagesWithNavbar";
import ReviewerHomePage from "./Pages/ReviewerHomePage";
import ReviewUser from "./Pages/ReviewUser";

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
            <Route path="/reviewer" element={<ReviewerSelection />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/reviewees" element={<ReviewerHomePage />} />
            <Route path="/reviewuser" element={<ReviewUser />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
