import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";
import { scheduleAPIs } from "../../api/api";

function ScheduleCard() {
  const [registerData, setRegisterData] = useState();
  useEffect(() => {
    scheduleAPIs.getRegisterInfo().then(res => setRegisterData(res.data));
  }, []);

  return (
    <>
      {registerData?.map(item => {
        return <ScheduleCardComponent key={item.id} title={item.title} startDate={item.startAt} endDate={item.endAt} />;
      })}
    </>
  );
}

function ScheduleCardComponent({ title, startDate, endDate }) {
  const newStartDate = DateCalculation(startDate);
  const newEndDate = DateCalculation(endDate);
  const newDate = DateDiff(newStartDate, newEndDate);
  const nights = newDate[0];
  const AllDays = newDate[1];
  return (
    <>
      <div className="w-3/4 h-28 bg-white1 rounded-md drop-shadow-md">
        <div className="flex flex-row space-x-36">
          <div className="flex flex-col m-5 ">
            <span className="mt-2	font-semibold">
              {nights + "박" + AllDays + "일" + " "}
              {title}
            </span>
            <span className="mt-2 font-light text-sm">
              {startDate}~{endDate}
            </span>
          </div>
          <div className="flex flex-row m-5">
            <DeleteOutlineIcon className="mt-5 cursor-pointer" />
            <span className="mt-6 ml-1 font-normal text-sm">삭제</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleCard;
