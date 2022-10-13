import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function Card({ title, route }) {
  return (
    <Link to={route} className="group card-layout">
      <div className="font-bold text-black2 text-sm md:text-lg group-hover:text-white1">{title}</div>
      <NavigateNextIcon className="group-hover:fill-white1" />
    </Link>
  );
}

export default Card;
