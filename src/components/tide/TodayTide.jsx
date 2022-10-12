import React from "react";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

const TodayTide = ({ tide }) => {
  return (
    <div className="flex overflow-x-scroll pb-6">
      {tide &&
        tide.map(item => {
          return (
            <div key={item.date} className="bg-white1 rounded-md shadow-md px-10 py-2 mx-2">
              <div className="flex flex-col items-center">
                <div className="font-bold my-2">{item.date}</div>
                <div className="">
                  {item.tide.map(day => {
                    return (
                      <div key={day.time} className="flex justify-between items-center py-2 first:border-t-2 border-b-2 last:border-none">
                        <div className="px-3 py-1 text-sm font-semibold">
                          {day.code === "고조" ? <div className="text-rose-600">고</div> : <div className="text-blue-600">저</div>}
                        </div>
                        <div className="px-5">
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
