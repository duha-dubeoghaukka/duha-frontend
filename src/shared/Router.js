import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/mainpage/MainPage';
import NotFound from '../pages/NotFound';
import TouristSpots from '../pages/mainpage/TouristSpots';
import SignUp from '../pages/user/SignUp';
import ScheduleRegisterPage from '../pages/schedule/SceduleRegisterPage';
import LogIn from '../pages/user/LogIn';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpots />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/schedule/register" element={<ScheduleRegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
