import React, { useState } from "react";
import { api } from "../../api/api";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import sortBy from "lodash/sortBy";

const CourseItem = ({ dayCourse, setDayCourse, currentDay }) => {
  const deleteCourse = async (detailId, category) => {
    if (confirm("코스를 삭제할까요?")) {
      try {
        const { data } = await api.delete(`/auth/course/details`, {
          data: {
            category,
            detailId
          }
        });
        const newDayCourse = dayCourse.filter(dayCourse => dayCourse.detailId !== detailId);
        if (data.isSuccess) {
          setDayCourse(newDayCourse);
        } else {
          alert(data.message);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    return;
  };

  if (dayCourse.length === 0) return <div className="mb-6 text-center font-bold text-base">{currentDay}일차에 등록된 코스가 없습니다.</div>;
  return (
    <div>
      {sortBy(dayCourse, ["detailOrder"]).map(course => (
        <div key={course.detailOrder}>
          <div className="flex items-center flex justify-between md:mb-3 mb-1">
            <div className="flex items-center">
              <div className="bg-green1 rounded-full w-12 h-12 text-center font-bold text-lg text-white1 pt-[10px]">
                {course.detailOrder}
              </div>
              <div className="my-2 ml-9">
                <div className="font-semibold text-sm">{course.category}</div>
                <div className="font-bold md:text-base text-sm">{course.name}</div>
              </div>
            </div>
            <DeleteOutlineIcon
              className="cursor-pointer"
              onClick={() => {
                deleteCourse(course.detailId, course.category);
              }}
            />
          </div>
          {course.detailOrder !== dayCourse.length && <KeyboardDoubleArrowDownIcon className="md:mb-3 mb-1 ml-3 text-green1" />}
        </div>
      ))}
    </div>
  );
};

export default CourseItem;
