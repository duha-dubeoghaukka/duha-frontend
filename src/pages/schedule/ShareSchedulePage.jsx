import React from "react";
import Layout from "../../components/layout/Layout";
import ShareCard from "../../components/schedule/ShareCard";

function ShareSchedulePage() {
  return (
    <Layout isLoggedIn={false} title="일정 공유" highlight={"schedule/share"}>
      <ShareCard />
    </Layout>
  );
}

export default ShareSchedulePage;
