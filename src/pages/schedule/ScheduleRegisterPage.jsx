import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ScheduleCard from "../../components/schedule/ScheduleCard";
import { routingLoginPage } from "../../utils/routingLoginPage";

function ScheduleRegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    routingLoginPage(navigate);
  }, []);

  return (
    <Layout isLoggedIn={false} title="일정 등록" highlight={"schedule/create"}>
      <div className="w-full h-full">
        <div className="flex justify-center">
          <span className="mr-3 font-semibold">새 일정 만들기</span>
          <AddCircleIcon className="cursor-pointer drop-shadow-md" onClick={() => navigate(`/schedule/register`)}></AddCircleIcon>
        </div>
        <ScheduleCard />
      </div>
    </Layout>
  );
}

export default ScheduleRegisterPage;
