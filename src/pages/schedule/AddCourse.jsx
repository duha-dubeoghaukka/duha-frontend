import React from "react";
import Layout from "../../components/layout/Layout";
import DayItem from "../../components/schedule/DayItem";

const AddCourse = () => {
  return (
    <Layout title="일정 관리" highlight={"schedule/create"}>
      <DayItem />
    </Layout>
  );
};

export default AddCourse;
