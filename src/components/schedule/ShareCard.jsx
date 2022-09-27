import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useNavigate } from "react-router-dom";
import { scheduleAPIs } from "../../api/api";

function ShareCard() {
  const [shareData, setShareData] = useState();
  const location = useLocation();

  useEffect(() => {
    scheduleAPIs.getShareSchedule().then(res => setShareData(res.data.data));
  }, [location.key]);

  return (
    <div className="grid place-items-center h-screen">
      <span className="m-3 font-bold">다른 뚜벅이들의 일정을 참고해보세요!</span>
      {shareData?.map(item => {
        return <ShareCardComponent key={item.id} item={item} />;
      })}
    </div>
  );
}

function ShareCardComponent({ item }) {
  const { title, startAt, endAt } = item;
  const navigate = useNavigate();

  return (
    <div className="group w-96 h-28 bg-white1 rounded-md shadow-lg mt-5 flex flex-row hover:bg-green1">
      <div className="flex space-x-20">
        <div className="flex flex-col m-6 p-3 w-48">
          <span className="mt-2	font-bold group-hover:text-white1">{title}</span>
          <span className="mt-2	font-base text-xs group-hover:text-white1">
            {startAt}-{endAt}
          </span>
        </div>
        <div className="flex flex-row m-5 ">
          <NavigateNextIcon className="mt-5 cursor-pointer group-hover:fill-white1" onClick={() => navigate(`${route}`)} />
        </div>
      </div>
    </div>
  );
}

export default ShareCard;
