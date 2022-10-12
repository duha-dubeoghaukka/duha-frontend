import ForecastItemIcon from "./ForecastItemIcon";

const ForecastItem = ({ day, minTemperature, maxTemperature, weatherCode }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3">
        <p className="text-white1 font-bold text-xl">{day}</p>
      </div>
      <ForecastItemIcon code={weatherCode} />
      <div>
        <p className="text-red-600 font-black text-xl">{maxTemperature}</p>
      </div>
      <div>
        <p className="text-blue-600 font-black text-xl">{minTemperature}</p>
      </div>
    </div>
  );
};

export default ForecastItem;
