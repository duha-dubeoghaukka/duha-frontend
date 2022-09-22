import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/NotFound";
import TouristSpotsPage from "../pages/mainpage/TouristSpotsPage";
import SignUp from "../pages/user/SignUp";
import ScheduleRegisterPage from "../pages/schedule/ScheduleRegisterPage";
import RestaurantsPage from "../pages/mainpage/RestaurantsPage";
import LogIn from "../pages/user/LogIn";
import AccommodationsPage from "../pages/mainpage/AccommodationsPage";
import Registration from "../components/schedule/Registration";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpotsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/schedule" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
