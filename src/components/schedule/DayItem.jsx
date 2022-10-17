import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import CourseItem from "./CourseItem";
import _ from "lodash";
import Spinner from "../Spinner/Spinner";
import MapContainer from "../../components/map/MapContainer";
import { DragDropContext } from "react-beautiful-dnd";

const DayItem = () => {
  const { tripId, day } = useParams();
  const [courses, setCourses] = useState(null);
  const [dayCourse, setDayCourse] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentCourseId, setCurrentCourseId] = useState();
  const navigate = useNavigate();
  // const id = localStorage.getItem("id");
  const lastCourse = dayCourse.at(-1);
  const id = tripId;

  if (lastCourse) {
    const [name, latitude, longitude] = [lastCourse.name, lastCourse.latitude, lastCourse.longitude];
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("latitude", latitude);
    sessionStorage.setItem("longitude", longitude);
  }

  const onClickDay = day => {
    const clickDay = _.find(courses, { day: day });
    setDayCourse(clickDay.courseDetails);
    setCurrentDay(clickDay.day);
    setCurrentCourseId(clickDay.courseId);
    navigate(`/schedule/${id}/${day}`);
  };

  const fetchData = async () => {
    try {
      const {
        data: { data }
      } = await api.get(`/auth/trip/${id}`);
      setCourses(data.courses);
    } catch (error) {
      throw new Error(error);
    }
  };

  const addCourseHandler = () => {
    if (dayCourse.length >= 10) {
      alert("코스등록은 하루에 10개까지 가능합니다.");
    } else navigate(`/schedule/${id}/${currentDay}/${currentCourseId}/addspot`);
  };

  const addBookMarkCourseHandler = () => {
    if (dayCourse.length >= 10) {
      alert("코스등록은 하루에 10개까지 가능합니다.");
    } else navigate(`/schedule/${id}/${currentDay}/${currentCourseId}/addbookmarkspot`);
  };

  const addNearByCourseHandler = () => {
    if (dayCourse.length >= 10) {
      alert("코스등록은 하루에 10개까지 가능합니다.");
    } else navigate(`/schedule/${id}/${currentDay}/${currentCourseId}/addnearbyspot`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (courses?.length > 1) onClickDay(Number(day));
  }, [courses]);

  if (!courses) return <Spinner />;

  const handleOnDragEnd = result => {
    // 리스트 밖으로 드랍한 경우
    if (!result.destination) return;

    const changeDayCourse = [...dayCourse];
    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;
    const removeCourse = changeDayCourse.splice(draggingItemIndex, 1);
    changeDayCourse.splice(afterDragItemIndex, 0, removeCourse[0]);
    changeCourse(changeDayCourse);
  };

  const changeCourse = async changeDayCourse => {
    setDayCourse(changeDayCourse);
    const editData = changeDayCourse.map((item, index) => {
      return {
        detailOrder: index + 1,
        category: item.category,
        detailId: item.detailId,
        name: item.name
      };
    });
    try {
      const { data } = await api.post(`/auth/trip/course`, {
        courseId: currentCourseId,
        courseDetails: [...editData]
      });
      if (!data.isSuccess) alert(data.message);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div>
        <div className="flex justify-center">
          <div className="my-2 flex justify-start overflow-x-scroll pb-4 pt-2">
            {courses.map(course => {
              return (
                <div
                  key={course.courseId}
                  className="font-bold text-lg px-4 cursor-pointer"
                  onClick={() => {
                    onClickDay(course.day);
                  }}
                >
                  {day == course.day ? (
                    <div className="border-b-2 pb-1 border-green1 text-green1 transition ease-in-out">Day{course.day}</div>
                  ) : (
                    <div className="border-b-2 pb-1 border-white text-gray-400 hover:border-gray-400 transition ease-in-out">
                      Day{course.day}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="course-layout">
          {dayCourse.length > 0 && (
            <div className="bg-gray-200 md:h-[350px] h-[250px] mb-4 md:mb-6 shadow-md rounded-lg">
              <MapContainer dayCourse={dayCourse} />
            </div>
          )}
          <CourseItem dayCourse={dayCourse} setDayCourse={setDayCourse} currentDay={currentDay} />
          <div className="text-xs text-gray-400 text-center">
            <p>코스를 추가해 보세요.</p>
            <p>하루에 10개까지 추가할 수 있어요!</p>
          </div>
          <div>
            {dayCourse.length > 0 && (
              <button className="btn-primary-sm py-3 mt-4 w-full text-sm" onClick={addNearByCourseHandler}>
                {lastCourse && lastCourse.name}부터 가까운 여행지 확인
              </button>
            )}
            <div className="flex">
              <button className="btn-primary-sm py-3 mt-4 w-1/2 text-sm mr-1" onClick={addCourseHandler}>
                코스 검색
              </button>
              <button className="btn-primary-sm py-3 mt-4 w-1/2 text-sm ml-1" onClick={addBookMarkCourseHandler}>
                즐겨찾기 목록
              </button>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default DayItem;
