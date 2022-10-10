import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __getSchedules, __deleteSchedule } from "../../redux/modules/schedules";
import { useSelector } from "react-redux";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { color } from "@mui/system";

function ScheduleCard() {
  const dispatch = useDispatch();
  const { schedules } = useSelector(state => state.schedules);

  useEffect(() => {
    dispatch(__getSchedules());
  }, [dispatch]);

  const onDeleteSchedule = tripId => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__deleteSchedule(tripId));
    }
  };

  return (
    <>
      {!schedules ? (
        <Spinner />
      ) : (
        schedules?.map(item => {
          return (
            <ScheduleCardComponent
              key={item.id}
              title={item.title}
              startDate={item.startAt}
              endDate={item.endAt}
              id={item.id}
              isPublic={item.isPublic}
              onDeleteSchedule={onDeleteSchedule}
            />
          );
        })
      )}
    </>
  );
}

function ScheduleCardComponent({ title, startDate, endDate, id, isPublic, onDeleteSchedule }) {
  const newStartDate = DateCalculation(startDate);
  const newEndDate = DateCalculation(endDate);
  const newDate = DateDiff(newStartDate, newEndDate);
  const nights = newDate[0];
  const allDays = newDate[1];

  const navigate = useNavigate();

  const setItem = () => {
    localStorage.setItem("id", id);
  };

  const onUpdate = id => {
    navigate(`/schedule/update/${id}`, { state: [title, startDate, endDate, isPublic] });
  };

  const onShareLink = () => {
    console.log("test");
  };

  return (
    <div className="w-96 h-32 bg-white1 rounded-md shadow-lg mt-5 flex flex-row">
      <div className="flex flex-col mt-5 ml-5 mb-2">
        <div
          className="pr-32 h-24"
          onClick={() => {
            navigate(`${id}/1`);
            setItem();
          }}
        >
          <div className="flex flex-col">
            <span className="mt-2	font-semibold">
              {nights + "박" + allDays + "일" + " "}
              {title}
            </span>
            <span className="mt-2 font-light text-sm">
              {startDate}~{endDate}
            </span>
          </div>
        </div>
        <div className=" cursor-pointer" onClick={() => onShareLink()}>
          <ShareIcon className="mr-1" sx={{ fontSize: 15, color: "#7FB77E" }} />
          <span className="text-xs text-green1">일정 공유</span>
        </div>
      </div>
      <div className="flex flex-row mt-5">
        <ModeEditOutlineOutlinedIcon className="mt-5 cursor-pointer" onClick={() => onUpdate(id)} />
        <DeleteOutlineIcon className="mt-5 ml-1 cursor-pointer" onClick={() => onDeleteSchedule(id)} />
      </div>
    </div>
  );
}

export default ScheduleCard;
