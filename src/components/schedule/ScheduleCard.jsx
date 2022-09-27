import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";
import { scheduleAPIs } from "../../api/api";
import Spinner from "../Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";

function ScheduleCard() {
  const location = useLocation();
  const [registerData, setRegisterData] = useState();

  useEffect(() => {
    scheduleAPIs.getRegisterInfo().then(res => setRegisterData(res.data.data));
  }, [location.key]);

  return (
    <div className="h-screen">
      {!registerData ? (
        <Spinner />
      ) : (
        registerData?.map(item => {
          return <ScheduleCardComponent key={item.id} title={item.title} startDate={item.startAt} endDate={item.endAt} id={item.id} />;
        })
      )}
    </div>
  );
}

function ScheduleCardComponent({ title, startDate, endDate, id }) {
  const newStartDate = DateCalculation(startDate);
  const newEndDate = DateCalculation(endDate);
  const newDate = DateDiff(newStartDate, newEndDate);
  const nights = newDate[0];
  const allDays = newDate[1];

  const navigate = useNavigate();

  const setItem = () => {
    localStorage.setItem("allDays", allDays);
    localStorage.setItem("id", id);
  };

  return (
    <div
      className="w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row"
      onClick={() => {
        navigate("course");
        setItem();
      }}
    >
      <div className="flex space-x-28">
        <div className="flex flex-col m-5 ">
          <span className="mt-2	font-semibold">
            {nights + "박" + allDays + "일" + " "}
            {title}
          </span>
          <span className="mt-2 font-light text-sm">
            {startDate}~{endDate}
          </span>
        </div>
        <div className="flex flex-row m-5 ">
          <DeleteOutlineIcon className="mt-5 cursor-pointer" />
          <span className="mt-6 ml-1 font-normal text-sm ">삭제</span>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
