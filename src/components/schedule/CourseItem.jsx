import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { api } from "../../api/api";
import { useParams } from "react-router-dom";

const CourseItem = ({ dayCourse, currentDay, currentCourseId }) => {
  const { tripId } = useParams();

  const deleteCourse = async id => {
    try {
      const { data } = await api.delete(`/auth/course/details`, {
        category: "관광지",
        detailId: id
      });
      console.log(data);
      if (data.isSuccess) {
        alert("코스가 삭제되었습니다.");
        navigate(`/schedule/${tripId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  if (dayCourse.length === 0) return <div className="mb-6 text-center font-bold text-base">{currentDay}일차에 등록된 코스가 없습니다.</div>;

  return (
    <div>
      {dayCourse.map(course => (
        <div className="flex items-center mb-9 flex justify-between" key={course.detailOrder}>
          <div className="flex items-center">
            <div className="bg-green1 rounded-full w-12 h-12 text-center font-bold text-lg text-white1 pt-[10px]">{course.detailOrder}</div>
            <div className="my-2 ml-9">
              <div className="font-semibold text-sm">{course.category}</div>
              <div className="font-bold md:text-base text-sm">{course.name}</div>
            </div>
          </div>
          <RemoveCircleOutlineIcon
            className="cursor-pointer"
            onClick={() => {
              deleteCourse(course.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseItem;
