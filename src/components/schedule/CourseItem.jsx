import React, { useState } from "react";

const CourseItem = ({ dayCourse, currentDay, currentCourseId }) => {
  if (dayCourse.length === 0) return <div className="mb-6 text-center font-bold text-base">{currentDay}일차에 등록된 코스가 없습니다.</div>;
  return (
    <div>
      {dayCourse.map(course => (
        <div className="flex items-center mb-9" key={course.detailOrder}>
          <div className="bg-green1 rounded-full w-12 h-12 text-center font-bold text-lg text-white1 pt-[10px]">{course.detailOrder}</div>
          <div className="my-2 ml-9">
            <div className="font-semibold text-sm">{course.category}</div>
            <div className="font-bold text-base">{course.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseItem;
