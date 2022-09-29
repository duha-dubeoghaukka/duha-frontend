import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/404/NotFound";
import SignUp from "../pages/user/SignUp";
import ScheduleRegisterPage from "../pages/schedule/ScheduleRegisterPage";
import LogIn from "../pages/user/LogIn";
import Registration from "../components/schedule/Registration";
import AddCourse from "../pages/schedule/AddCourse";
import Weather from "../pages/weather/Weather";
import FavoritesListPage from "../pages/mypage/FavoritesListPage";
import TouristSpotDetailPage from "../pages/detailpage/TouristSpotDetailPage";
import AddSpot from "../pages/schedule/AddSpot";
import AddRestaurant from "../pages/schedule/AddRestaurant";
import KakaoLogin from "../components/socialLogin/KakaoLogin";
import GoogleLogin from "../components/socialLogin/GoogleLogin";
import ShareSchedulePage from "../pages/schedule/ShareSchedulePage";
import TouristSpotsPageContainer from "../pages/mainpage/TouristSpotsPageContainer";
import FavoriteCoursePage from "../pages/mypage/FavoriteCoursePage";
import FavoriteSpotsPage from "../pages/mypage/FavoriteSpotsPage";
import FavoriteRestaurantsPage from "../pages/mypage/FavoriteRestaurantsPage";
import FavoriteAccommodationPage from "../pages/mypage/FavoriteAccommodationPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpotsPageContainer />} />
        <Route path="/spots/:spotID" element={<TouristSpotDetailPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/schedule" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/register" element={<Registration />} />
        <Route path="/schedule/course" element={<AddCourse />} />
        <Route path="/schedule/course/addspot" element={<AddSpot />} />
        <Route path="/schedule/course/addrestaurant" element={<AddRestaurant />} />
        <Route path="/mypage/favorites/list" element={<FavoritesListPage />} />
        <Route path="/mypage/favorites/course" element={<FavoriteCoursePage />} />
        <Route path="/mypage/favorites/spots" element={<FavoriteSpotsPage />} />
        <Route path="/mypage/favorites/restaurant" element={<FavoriteRestaurantsPage />} />
        <Route path="/mypage/favorites/accommodation" element={<FavoriteAccommodationPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/auth/google/callback" element={<GoogleLogin />} />
        <Route path="/schedule/share" element={<ShareSchedulePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
