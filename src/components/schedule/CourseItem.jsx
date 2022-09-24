import React from "react";

const CourseItem = () => {
  return (
    <div className="flex items-center mb-9">
      <div className="bg-green1 rounded-full w-12 h-12 text-center font-bold text-lg text-white1 pt-[10px]">1</div>
      <div className="my-2 ml-9">
        <div className="font-bold text-base">관광</div>
        <div className="font-bold text-base">관광지 이름</div>
      </div>
    </div>
  );
};

export default CourseItem;
