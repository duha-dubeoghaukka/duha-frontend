import React from "react";
import Layout from "../../components/layout/Layout";
import DayItem from "../../components/schedule/DayItem";

const AddCourse = () => {
  return (
    <Layout isLoggedIn={true} title="일정 등록" highlight={"schedule/create"}>
      <DayItem />
    </Layout>
  );
};

export default AddCourse;
