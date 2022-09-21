import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./styles.css";
import moment from "moment";
import Layout from "../../components/layout/Layout";
import useInput from "../../hooks/useInput";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function ScheduleRegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <Layout isLoggedIn={false} title="일정 등록" highlight={"schedule/create"}>
      <button onClick={() => navigate(`/schedule/register`)}>클릭</button>
    </Layout>
  );
}

export default ScheduleRegisterPage;
