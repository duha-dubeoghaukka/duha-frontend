import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";

function ScheduleCard() {
  let startDate = "2022 / 09 / 05";
  let endDate = "2022 / 09 / 10";
  const newStartDate = DateCalculation(startDate);
  const newEndDate = DateCalculation(endDate);
  const newDate = DateDiff(newStartDate, newEndDate);
  const nights = newDate[0];
  const AllDays = newDate[1];

  console.log("new", nights, AllDays);

  return (
    <>
      <div className="w-3/4 h-28 bg-white1 rounded-md drop-shadow-md">
        <div className="flex flex-row space-x-52">
          <div className="flex flex-col m-5 ">
            <span className="mt-2	font-semibold">0박0일 먹방여행</span>
            <span className="mt-2 font-light text-sm">여행기간</span>
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
