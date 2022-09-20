import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/NotFound";
import TouristSpots from "../pages/mainpage/TouristSpots";
import SignUp from '../pages/user/SignUp';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
          <Route path="/place" element={<TouristSpots/>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
