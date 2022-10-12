import React, { useState } from "react";
import Region from "../../components/tide/Region";
import WeeklyTide from "../../components/tide/WeeklyTide";
import Layout from "../../components/layout/Layout";

const Tide = () => {
  const [tide, setTide] = useState(null);

  return (
    <Layout title="물 때 예보" highlight={"schedule/create"}>
      <Region tide={tide} setTide={setTide} />
      <WeeklyTide tide={tide} setTide={setTide} />
    </Layout>
  );
};

export default Tide;
