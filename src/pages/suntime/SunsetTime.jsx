const SunsetTime = ({ sunsetHour, sunsetMinute }) => {
  return (
    <div className="relative">
      <img src="/assets/suntimeImages/Sunset.jpg" alt="Sunset" className="w-full h-[40vh] object-cover" />
      <div className="text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <p className="text-white1 font-bold text-3xl">일몰</p>
        <p className="text-white1 font-bold text-5xl">
          {sunsetHour} : {sunsetMinute}
        </p>
      </div>
    </div>
  );
};

export default SunsetTime;
