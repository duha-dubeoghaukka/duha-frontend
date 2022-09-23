import React from "react";
import Layout from "../../components/layout/Layout";
import HomeCard from "../../components/mainpage/HomeCard";

function MainPage() {
  return (
    <Layout isLoggedIn={false} title="메인 페이지" highlight={"mainpage/home"}>
      <div className="grid place-items-center h-screen">
        <span className="font-bold">오늘 제주 날씨는 </span>
        <HomeCard />
      </div>
    </Layout>
  );
}

export default MainPage;
