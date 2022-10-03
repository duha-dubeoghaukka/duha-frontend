import React from "react";
import Layout from "../../components/layout/Layout";
import ShareDetail from "../../components/schedule/ShareDetail";

function ShareDetailPage() {
  return (
    <Layout title="일정 공유" highlight={"schedule/share"}>
      <ShareDetail />
    </Layout>
  );
}

export default ShareDetailPage;
