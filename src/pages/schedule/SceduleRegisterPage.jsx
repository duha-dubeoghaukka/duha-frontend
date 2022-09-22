import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ScheduleCard from "../../components/schedule/ScheduleCard";

function ScheduleRegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <Layout isLoggedIn={false} title="일정 등록" highlight={"schedule/create"}>
      <div className="grid place-items-center h-screen">
        <div className="flex flex-row">
          <span className="mr-3">새 일정 만들기</span>
          <AddCircleIcon className="cursor-pointer" onClick={() => navigate(`/schedule/register`)}></AddCircleIcon>
        </div>
        <ScheduleCard />
      </div>
    </Layout>
  );
}

export default ScheduleRegisterPage;
