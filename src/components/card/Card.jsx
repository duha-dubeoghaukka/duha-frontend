import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

function Card({ title, route }) {
  return (
    <Link to={route} className="card-layout">
      <div className="font-bold text-black2 text-sm md:text-lg">{title}</div>
      <NavigateNextIcon />
    </Link>
  );
}

export default Card;
