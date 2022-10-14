import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useNavigate } from "react-router-dom";
import Card from "../card/Card";

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
      title: "정보",
      route: "/info"
    }
  ];

  return (
    <div className="h-full">
      {data.map((item, index) => {
        return <Card key={index} title={item.title} route={item.route} />;
      })}
    </div>
  );
}

export default HomeCard;
