const SunriseTime = ({ sunriseHour, sunriseMinute }) => {
  return (
    <div className="relative">
      <img src="/assets/suntimeImages/Sunrise.jpg" alt="Sunrise" className="w-full h-[40vh] object-cover" />
      <div className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <p className="text-white1 font-bold text-3xl">일출</p>
        <p className="text-white1 font-bold text-5xl">
          {sunriseHour} : {sunriseMinute}
        </p>
      </div>
    </div>
  );
};

export default SunriseTime;
