import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import DayItem from "../../components/schedule/DayItem";

const AddCourse = () => {
  return (
    <Layout title="일정 등록" highlight={"schedule/create"}>
      <DayItem />
    </Layout>
  );
};

export default AddCourse;
