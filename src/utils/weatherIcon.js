import React from "react";
import { TiAdjustBrightness, TiWeatherStormy, TiWeatherShower, TiWeatherDownpour, TiWeatherSnow, TiWeatherCloudy } from "react-icons/ti";
import { BsCloudFog } from "react-icons/bs";

export const weatherIcon = weatherId => {
  let iconId = weatherId === 800 ? "0" : (parseInt(weatherId) / 100).toFixed(0);
  switch (iconId) {
    case "0":
      return <TiAdjustBrightness size="3rem" color="orange" />;
    case "2":
      return <TiWeatherStormy size="3rem" color="black" />;
    case "3":
      return <TiWeatherShower size="3rem" color="blue" />;
    case "5":
      return <TiWeatherDownpour size="3rem" color="navy" />;
    case "6":
      return <TiWeatherSnow size="3rem" color="skyblue" />;
    case "7":
      return <BsCloudFog size="3rem" color="grey" />;
    case "8":
      return <TiWeatherCloudy size="3rem" color="skyblue" />;
  }
};
