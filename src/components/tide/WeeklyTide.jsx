import React from "react";
import TodayTide from "./TodayTide";

const WeeklyTide = ({ tide }) => {
  return (
    <div>
      {tide && (
        <p className="font-bold text-sm text-center py-2 md:py-4 my-2 md:my-4 border-2 border-green1 rounded-md shadow-md">
          주간 물 때 예보
        </p>
      )}
      <TodayTide tide={tide} />
    </div>
  );
};

export default WeeklyTide;
