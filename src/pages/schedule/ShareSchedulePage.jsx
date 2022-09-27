import React from "react";
import Layout from "../../components/layout/Layout";

function ShareSchedulePage() {
  return (
    <Layout isLoggedIn={false} title="일정 공유" highlight={"schedule/share"}>
      <div>일정 공유 페이지 입니다</div>
    </Layout>
  );
}

export default ShareSchedulePage;
