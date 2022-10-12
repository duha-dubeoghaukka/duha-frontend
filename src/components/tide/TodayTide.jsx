import React from "react";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

const TodayTide = ({ tide }) => {
  return (
    <div className="flex overflow-x-scroll pb-6">
      {tide &&
        tide.map(item => {
          return (
            <div key={item.date} className="bg-white1 rounded-md shadow-md p-2 mx-4">
              <div className="">
                <div>{item.date}</div>
                <div className="">
                  {item.tide.map(day => {
                    return (
                      <div key={day.time} className="flex items-center">
                        <div>{day.code == "고조" ? <TrendingUpOutlinedIcon /> : <TrendingDownOutlinedIcon />}</div>
                        <div>
                          <div>{day.time.substring(0, 5)}</div>
                          <div>{day.level}m</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TodayTide;
