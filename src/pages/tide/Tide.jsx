import React, { useState } from "react";
import Region from "../../components/tide/Region";
import WeeklyTide from "../../components/tide/WeeklyTide";
import Layout from "../../components/layout/Layout";

const Tide = () => {
  const [tide, setTide] = useState(null);

  return (
    <Layout title="물때 정보" highlight={"mainpage/info"} isFooterFixed={true}>
      <Region tide={tide} setTide={setTide} />
      <WeeklyTide tide={tide} setTide={setTide} />
    </Layout>
  );
};

export default Tide;
