import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/NotFound";
import Places from "../pages/mainpage/Places";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
          <Route path="/place" element={<Places/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
