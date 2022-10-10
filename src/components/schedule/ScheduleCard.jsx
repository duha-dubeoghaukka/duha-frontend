import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __getSchedules, __deleteSchedule } from "../../redux/modules/schedules";
import { useSelector } from "react-redux";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

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

  return (
    <div className="w-full h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row justify-between items-center px-4">
      <div
        onClick={() => {
          navigate(`${id}/1`);
          setItem();
        }}
      >
        <div className="flex flex-col">
          <span className="font-semibold">
            {nights + "박" + allDays + "일" + " "}
            {title}
          </span>
          <span className="mt-2 font-light text-sm">
            {startDate}~{endDate}
          </span>
        </div>
      </div>
      <div className="">
        <ModeEditOutlineOutlinedIcon className="cursor-pointer" onClick={() => onUpdate(id)} />
        <DeleteOutlineIcon className="ml-1 cursor-pointer" onClick={() => onDeleteSchedule(id)} />
      </div>
    </div>
  );
}

export default ScheduleCard;
