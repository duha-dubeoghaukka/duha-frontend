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

  const onDeleteSchedule = tripId => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      scheduleAPIs
        .deleteSchedule(tripId)
        .then(res => {
          if (res.data.isSuccess) {
            alert("삭제가 완료되었습니다!");
            window.location.reload();
          } else {
            alert("삭제가 취소되었습니다!");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  const navigate = useNavigate();

  const setItem = () => {
    localStorage.setItem("day", allDays);
    localStorage.setItem("id", id);
  };

  return (
    <div className="w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row">
      <div
        className="pr-36"
        onClick={() => {
          navigate("course");
          setItem();
        }}
      >
        <div className="flex flex-col m-5 ">
          <span className="mt-2	font-semibold">
            {nights + "박" + allDays + "일" + " "}
            {title}
          </span>
          <span className="mt-2 font-light text-sm">
            {startDate}~{endDate}
          </span>
        </div>
      </div>
      <div className="flex flex-row mt-5 ">
        <DeleteOutlineIcon className="mt-5 cursor-pointer" onClick={() => onDeleteSchedule(id)} />
      </div>
    </div>
  );
}

export default ScheduleCard;
