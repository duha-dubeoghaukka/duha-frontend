import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function HomeCard() {
  const title = ["관광", "맛집", "숙소", "날씨 더 알아보기", "물 때 알아보기"];
  return (
    <div className="h-screen">
      {title?.map((item, index) => {
        return <HomeCardComponent key={index} title={item} />;
      })}
    </div>
  );
}

function HomeCardComponent({ title, navigation }) {
  return (
    <div className="w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row ">
      <div className="flex space-x-20">
        <div className="flex flex-col m-6 p-3 w-48">
          <span className="mt-2	font-bold">{title}</span>
        </div>
        <div className="flex flex-row m-5 ">
          <NavigateNextIcon className="mt-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
