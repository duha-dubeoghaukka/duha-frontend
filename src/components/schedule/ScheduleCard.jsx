import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DateCalculation, DateDiff } from "../../utils/dateCalculation";
import NonLayoutSpinner from "../Spinner/NonLayoutSpinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __getSchedules, __deleteSchedule } from "../../redux/modules/schedules";
import { useSelector } from "react-redux";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import useChange from "../../hooks/useChange";
import ShowModal from "../modal/ShowModal";
import IosShareIcon from "@mui/icons-material/IosShare";

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
        <NonLayoutSpinner />
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
    sessionStorage.setItem("id", id);
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
    <div>
      <div
        className="card"
        onClick={() => {
          navigate(`${id}/1`);
          setItem();
        }}
      >
        <div className="flex items-center">
          <div>
            <p className="mt-2	font-semibold">
              {nights + "박" + allDays + "일" + " "}
              {title}
            </p>
            <p className="font-light text-sm">
              {startDate}~{endDate}
            </p>
          </div>
        </div>
        <div>
          <IosShareIcon
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              ModalHandler();
            }}
          />
          <ModeEditOutlineOutlinedIcon
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onUpdate(id);
            }}
          />
          <DeleteOutlineIcon
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onDeleteSchedule(id);
            }}
          />
        </div>
      </div>
      <ShowModal show={isModal} modalHandler={ModalHandler} route={routeUrl} title={title} />
    </div>
  );
}

export default ScheduleCard;
