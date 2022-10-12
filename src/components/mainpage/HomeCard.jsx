import React from "react";
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
      title: "날씨 더 알아보기",
      route: ""
    },
    {
      title: "물 때 알아보기",
      route: "/tide"
    }
  ];

  return (
    <div className="h-screen">
      {data.map((item, index) => {
        return <Card key={index} title={item.title} route={item.route} />;
      })}
    </div>
  );
}

export default HomeCard;
