import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function Card({ title, route }) {
  return (
    <Link to={route} className="group card-layout">
      <div className="flex space-x-24">
        <div className="w-40 flex flex-col m-6 p-3">
          <span className="mt-2	font-bold text-black2 group-hover:text-white1">{title}</span>
        </div>
        <div className="mt-10 pr-3">
          <NavigateNextIcon className="mcursor-pointer group-hover:fill-white1" />
        </div>
      </div>
    </Link>
  );
}

export default Card;
