import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ShareCard from "../../components/schedule/ShareCard";
import { routingLoginPage } from "../../utils/routingLoginPage";

function ShareSchedulePage() {
  const navigate = useNavigate();

  useEffect(() => {
    routingLoginPage(navigate);
  }, []);

  return (
    <Layout isLoggedIn={false} title="일정 공유" highlight={"schedule/share"}>
      <ShareCard />
    </Layout>
  );
}

export default ShareSchedulePage;
