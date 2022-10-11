import React, { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ShowModal from "../modal/ShowModal";
import useChange from "../../hooks/useChange";
import { useDispatch } from "react-redux";
import { __getSchedules } from "../../redux/modules/schedules";
import { useParams } from "react-router-dom";

function ShareLink({ uri }) {
  const dispatch = useDispatch();
  const param = useParams();
  const id = Number(param.tripId);

  const [isModal, ModalHandler] = useChange();
  const [title, setTitle] = useState();

  useEffect(() => {
    dispatch(__getSchedules()).then(res => {
      const data = res.payload.filter(item => item.id === id);
      setTitle(data[0].title);
    });
  }, [dispatch]);

  return (
    <div className="grid place-content-end w-[385px] md:w-[600px] mx-auto md:px-[20px] md:py-[25px] px-[10px] py-[20px] ">
      <div className="cursor-pointer" onClick={() => ModalHandler()}>
        <ShareIcon className="mr-1" sx={{ fontSize: 17, color: "#757575" }} />
        <span className="text-sm text-grey1 font-semibold">일정 공유</span>
      </div>
      <ShowModal show={isModal} modalHandler={ModalHandler} route={uri} title={title} />
    </div>
  );
}

export default ShareLink;
