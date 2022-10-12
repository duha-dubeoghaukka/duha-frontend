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
import useChange from "../../hooks/useChange";
import ShowModal from "../modal/ShowModal";

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
  const [isModal, ModalHandler] = useChange();
  const [routeUrl, setRouteUrl] = useState();

  const setItem = () => {
    localStorage.setItem("id", id);
  };

  const onUpdate = id => {
    navigate(`/schedule/update/${id}`, { state: [title, startDate, endDate, isPublic] });
  };

  const url = process.env.REACT_APP_URL;
  const uri = `${url}/schedule/${id}/1`;

  useEffect(() => {
    isModal === true ? setRouteUrl(uri) : null;
  }, [isModal]);

  return (
    <div className="register-card-layout">
      <div className="flex flex-col mt-2 ml-3 mb-2">
        <div
          className="h-20 w-72 bg-white1"
          onClick={() => {
            navigate(`${id}/1`);
            setItem();
          }}
        >
          <div className="flex flex-col mt-3">
            <span className="mt-2	font-semibold">
              {nights + "박" + allDays + "일" + " "}
              {title}
            </span>
            <span className="mt-2 font-light text-sm">
              {startDate}~{endDate}
            </span>
          </div>
        </div>
        <div
          className="cursor-pointer w-2/5"
          onClick={e => {
            e.stopPropagation();
            ModalHandler();
          }}
        >
          <ShareIcon className="mr-1" sx={{ fontSize: 15, color: "#7FB77E" }} />
          <span className="text-xs text-green1">일정 공유</span>
        </div>
        <ShowModal show={isModal} modalHandler={ModalHandler} route={routeUrl} title={title} />
      </div>
      <div className="w-16">
        <ModeEditOutlineOutlinedIcon
          className="cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            onUpdate(id);
          }}
        />
        <DeleteOutlineIcon
          className="ml-1 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            onDeleteSchedule(id);
          }}
        />
      </div>
    </div>
  );
}

export default ScheduleCard;
