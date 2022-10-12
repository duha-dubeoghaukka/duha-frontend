const ForecastItem = ({ day, minTemperature, maxTemperature, weatherCode }) => {
  return (
    <div>
      <div className="mb-3">
        <p className="text-white1 font-bold text-xl">{day}</p>
      </div>
      <div>
        <p className="text-red-600 font-bold text-xl">{maxTemperature}</p>
      </div>
      <div>
        <p className="text-blue-600 font-bold text-xl">{minTemperature}</p>
      </div>
    </div>
  );
};

export default ForecastItem;
