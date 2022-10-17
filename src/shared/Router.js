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
import TouristSpotDetailPage from "../pages/detailpage/touristspot/TouristSpotDetailPage";
import AddSpot from "../pages/schedule/AddSpot";
import KakaoLogin from "../components/socialLogin/KakaoLogin";
import GoogleLogin from "../components/socialLogin/GoogleLogin";
import ShareSchedulePage from "../pages/schedule/ShareSchedulePage";
import ShareDetailPage from "../pages/schedule/ShareDetailPage";
import TouristSpotsPageContainer from "../pages/mainpage/touristspots/TouristSpotsPageContainer";
import FavoriteCoursePage from "../pages/mypage/FavoriteCoursePage";
import FavoriteSpotsPage from "../pages/mypage/FavoriteSpotsPage";
import FavoriteRestaurantsPage from "../pages/mypage/FavoriteRestaurantsPage";
import FavoriteAccommodationPage from "../pages/mypage/FavoriteAccommodationPage";
import RestaurantsPage from "../pages/mainpage/restaurants/RestaurantsPage";
import RestaurantDetailPage from "../pages/detailpage/restaurant/RestaurantDetailPage";
import AccommodationsPage from "../pages/mainpage/Accommodations/AccommodationsPage";
import AccommodationDetailPage from "../pages/detailpage/accommodation/AccommodationDetailPage";
import AddRestaurant from "../pages/schedule/AddRestaurant";
import AddAccommodation from "../pages/schedule/AddAccommodation";
import EditUserInfoPage from "../pages/user/EditUserInfoPage";
import AddNearBySpot from "../pages/schedule/AddNearBySpot";
import AddBookMarkSpot from "../pages/schedule/AddBookMarkSpot";
import Tide from "../pages/tide/Tide";
import ResetPasswordPage from "../pages/user/ResetPasswordPage";
import Info from "../pages/menu/Info";
import ScheduleInfo from "../pages/menu/ScheduleInfo";
import MypageInfo from "../pages/menu/MypageInfo";
import Information from "../pages/information/Information";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpotsPageContainer />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/spots/:spotID" element={<TouristSpotDetailPage />} />
        <Route path="/restaurants/:restaurantID" element={<RestaurantDetailPage />} />
        <Route path="/accommodations/:accommodationID" element={<AccommodationDetailPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/information" element={<Information />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/schedule" element={<ScheduleRegisterPage />} />
        <Route path="/schedule/register" element={<Registration />} />
        <Route path="/schedule/update/:id" element={<Registration />} />
        <Route path="/schedule/:tripId/:day" element={<AddCourse />} />
        <Route path="/schedule/:tripId/:day/:currentCourseId/addspot" element={<AddSpot />} />
        <Route path="/schedule/:tripId/:day/:currentCourseId/addrestaurant" element={<AddRestaurant />} />
        <Route path="/schedule/:tripId/:day/:currentCourseId/addaccommodation" element={<AddAccommodation />} />
        <Route path="/schedule/:tripId/:day/:currentCourseId/addnearbyspot" element={<AddNearBySpot />} />
        <Route path="/schedule/:tripId/:day/:currentCourseId/addbookmarkspot" element={<AddBookMarkSpot />} />
        <Route path="/mypage/favorites/list" element={<FavoritesListPage />} />
        <Route path="/mypage/favorites/course" element={<FavoriteCoursePage />} />
        <Route path="/mypage/favorites/spots" element={<FavoriteSpotsPage />} />
        <Route path="/mypage/favorites/restaurant" element={<FavoriteRestaurantsPage />} />
        <Route path="/mypage/favorites/accommodation" element={<FavoriteAccommodationPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/auth/google/callback" element={<GoogleLogin />} />
        <Route path="/schedule/share" element={<ShareSchedulePage />} />
        <Route path="/schedule/share/detail/:id" element={<ShareDetailPage />} />
        <Route path="/mypage/user/edit" element={<EditUserInfoPage />} />
        <Route path="/tide" element={<Tide />} />
        <Route path="/reset/password" element={<ResetPasswordPage />} />
        <Route path="/info" element={<Info />} />
        <Route path="/scheduleinfo" element={<ScheduleInfo />} />
        <Route path="/mypage" element={<MypageInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
