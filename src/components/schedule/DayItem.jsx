import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import CourseItem from "./CourseItem";

const DayItem = () => {
  const navigate = useNavigate();

  const day = localStorage.getItem("day");
  const id = localStorage.getItem("id");

  const dayArr = Array(parseInt(day))
    .fill()
    .map((_, i) => i + 1);

  const fetchData = async () => {
    try {
      await api.get(`/auth/trip/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-4 mb-6 flex justify-center">
        {dayArr.map(day => {
          return (
            <div key={day} className="text-green1 font-bold text-lg px-4">
              Day{day}
            </div>
          );
        })}
      </div>
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
