import React from "react";
import MainCategoryCard from "../card/MainCategoryCard";
import { Grid } from "@material-ui/core";

function HomeCard() {
  const informationCategory = [
    {
      title: "관광",
      route: `/spots`,
      description: "제주 관광지를",
      background: "bg-main-spot bg-cover bg-center bg-opacity-100 rounded-lg w-full h-full ",
      none: false
    },
    {
      title: "맛집",
      route: `/restaurants`,
      description: "제주 맛집을",
      background: "bg-main-restaurant bg-cover bg-center bg-opacity-100 rounded-lg",
      none: false
    },
    {
      title: "숙소",
      route: `/accommodations`,
      description: "제주 숙소를",
      background: "bg-main-accommodation bg-cover bg-center bg-opacity-100 rounded-lg",
      none: false
    },
    {
      title: "뚜벅이 서비스",
      route: "/information",
      description: "이동수단, 콜택시, 짐배달을",
      background: "bg-main-service bg-cover bg-center bg-opacity-100 rounded-lg",
      none: false
    },
    {
      title: "날씨 더 보기",
      route: "/weather",
      description: "제주 날씨를",
      background: "bg-main-weather bg-cover bg-center bg-opacity-100 rounded-lg"
    },
    {
      title: "물때 더 보기",
      route: "/tide",
      description: "제주 물때를",
      background: "bg-main-sea bg-cover bg-center bg-opacity-100 rounded-lg",
      none: false
    },
    {
      title: "일출, 일몰",
      route: "/suntime",
      description: "제주 일출,일몰을",
      background: "bg-main-suntime bg-cover bg-center bg-opacity-100 rounded-lg",
      none: false
    },
    {
      title: "",
      route: "",
      description: "",
      background: "",
      none: true
    }
  ];

  const scheduleCategory = [
    {
      title: "일정 관리",
      route: `/schedule`,
      description: "새 일정을 등록하고",
      background: "bg-main-schedule bg-cover bg-center bg-opacity-100 rounded-lg w-full h-full "
    },
    {
      title: "일정 공유",
      route: `/schedule/share`,
      description: "다른 사용자의 일정을",
      background: "bg-main-share-schedule bg-cover bg-center bg-opacity-100 rounded-lg"
    }
  ];

  return (
    <div className="h-full">
      <div className="w-full flex flex-col">
        <p className="ml-8 mb-5 mt-5 md:ml-[55px] text-[18px] text-black2">뚜벅하우까 정보</p>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
          {informationCategory.map((item, index) => {
            return <MainCategoryCard key={index} item={item} />;
          })}
        </Grid>
        <p className="ml-8 mb-5 mt-5 md:ml-[55px] text-[18px] text-black2">일정</p>
        <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
          {scheduleCategory.map((item, index) => {
            return <MainCategoryCard key={index} item={item} />;
          })}
        </Grid>
      </div>
    </div>
  );
}

export default HomeCard;
