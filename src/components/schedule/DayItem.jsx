import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import CourseItem from "./CourseItem";

const DayItem = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-green1 font-bold text-lg text-center mt-4 mb-6">Day1</div>
      <div className="course-layout">
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <button className="btn-primary py-3" onClick={() => navigate("addspot")}>
          장소 추가
        </button>
        <button className="btn-primary py-3 mt-4">저장 하기</button>
      </div>
    </div>
  );
};

export default DayItem;
