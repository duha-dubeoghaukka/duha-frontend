import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/404/NotFound";
import TouristSpotsPage from "../pages/mainpage/TouristSpotsPage";
import SignUp from "../pages/user/SignUp";
import ScheduleRegisterPage from "../pages/schedule/ScheduleRegisterPage";
import RestaurantsPage from "../pages/mainpage/RestaurantsPage";
import LogIn from "../pages/user/LogIn";
import Registration from "../components/schedule/Registration";
import AddCourse from "../pages/schedule/AddCourse";
import Weather from "../pages/weather/Weather";
import FavoritesListPage from "../pages/mypage/FavoritesListPage";
import TouristSpotDetailPage from "../pages/detailpage/TouristSpotDetailPage";
import RestaurantDetailPage from "../pages/detailpage/RestaurantDetailPage";
import AddSpot from "../pages/schedule/AddSpot";
import AddRestaurant from "../pages/schedule/AddRestaurant";
import KakaoLogin from "../components/socialLogin/KakaoLogin";
import GoogleLogin from "../components/socialLogin/GoogleLogin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpotsPage />} />
        <Route path="/spots/:spotID" element={<TouristSpotDetailPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantID" element={<RestaurantDetailPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/schedule" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/register" element={<Registration />} />
        <Route path="/schedule/course" element={<AddCourse />} />
        <Route path="/schedule/course/addspot" element={<AddSpot />} />
        <Route path="/schedule/course/addrestaurant" element={<AddRestaurant />} />
        <Route path="/favorites/list" element={<FavoritesListPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/auth/google/callback" element={<GoogleLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
