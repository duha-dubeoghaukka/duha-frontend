import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function HomeCard() {
  const data = [
    {
      title: "관광",
      route: `/spots`
    },
    {
      title: "맛집",
      route: `/restaurants`
    },
    {
      title: "숙소",
      route: `/accommodations`
    },
    {
      title: "날씨 더 알아보기",
      route: ""
    },
    {
      title: "물 때 알아보기",
      route: ""
    }
  ];

  return (
    <div className="h-screen">
      {data.map((item, index) => {
        return <HomeCardComponent key={index} title={item.title} route={item.route} />;
      })}
    </div>
  );
}

function HomeCardComponent({ title, route }) {
  const navigate = useNavigate();

  return (
    <Link to={route} className="group w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row hover:bg-green1">
      <div className="flex space-x-20">
        <div className="flex flex-col m-6 p-3 w-48">
          <span className="mt-2	font-bold group-hover:text-white1">{title}</span>
        </div>
        <div className="flex flex-row m-5 ">
          <NavigateNextIcon className="mt-5 cursor-pointer group-hover:fill-white1" />
        </div>
      </div>
    </Link>
  );
}

export default HomeCard;
