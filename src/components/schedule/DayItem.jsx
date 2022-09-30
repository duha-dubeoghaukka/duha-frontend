import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import CourseItem from "./CourseItem";
import _, { find } from "lodash";

const DayItem = () => {
  const [courses, setCourses] = useState([]);
  const [dayCourse, setDayCourse] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentCourseId, setCurrentCourseId] = useState();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const onClickDay = day => {
    const clickDay = _.find(courses, { day: day });
    setDayCourse(clickDay.courseDetails);
    setCurrentDay(clickDay.day);
    setCurrentCourseId(clickDay.courseId);
  };

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/auth/trip/${id}`);
      setCourses(data.data.courses);
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
        {courses.map(course => {
          return (
            <div
              key={course.courseId}
              className="text-green1 font-bold text-lg px-4 cursor-pointer"
              onClick={() => {
                onClickDay(course.day);
              }}
            >
              Day{course.day}
            </div>
          );
        })}
      </div>
      <div className="course-layout">
        <CourseItem dayCourse={dayCourse} currentDay={currentDay} currentCourseId={currentCourseId} />
        <button className="btn-primary py-3" onClick={() => navigate(`${currentCourseId}/addspot`)}>
          코스 추가
        </button>
        {/* <button className="btn-primary py-3 mt-4">저장 하기</button> */}
      </div>
    </div>
  );
};

export default DayItem;
