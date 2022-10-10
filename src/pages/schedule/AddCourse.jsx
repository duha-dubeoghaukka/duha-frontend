import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import ShowModal from "../../components/modal/ShowModal";
import DayItem from "../../components/schedule/DayItem";
import { useLocation } from "react-router";
import ShareLink from "../../components/shareLink/ShareLink";

const AddCourse = () => {
  const uri = window.location.href;

  return (
    <Layout title="일정 등록" highlight={"schedule/create"}>
      <ShareLink uri={uri} />
      <DayItem />
    </Layout>
  );
};

export default AddCourse;
