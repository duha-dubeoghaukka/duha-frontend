import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/NotFound";
import TouristSpotsPage from "../pages/mainpage/TouristSpotsPage";
import SignUp from "../pages/user/SignUp";
import ScheduleRegisterPage from "../pages/schedule/SceduleRegisterPage";
import RestaurantsPage from "../pages/mainpage/RestaurantsPage";
import AccommodationsPage from "../pages/mainpage/AccommodationsPage";
import Registration from "../components/schedule/Resitration";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpotsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/schedule" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
