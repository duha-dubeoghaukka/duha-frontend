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
    <Layout isLoggedIn={false} title="일정 관리" highlight={"schedule/create"}>
      <div className="flex justify-center my-5" onClick={() => navigate(`/schedule/register`)}>
        <span className="mr-3 font-medium text-lg text-black2">새 일정 만들기</span>
        <AddCircleIcon className="cursor-pointer drop-shadow-md text-black2" sx={{ fontSize: 30 }} />
      </div>
      <ScheduleCard />
    </Layout>
  );
}

export default ScheduleRegisterPage;
