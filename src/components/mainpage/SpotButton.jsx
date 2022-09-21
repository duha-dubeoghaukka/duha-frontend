const SpotButton = ({ name, romanization }) => {
  return (
    <div className="w-[70px] h-[43px] text-[16px] flex justify-center items-center bg-white1 rounded-lg font-bold shadow-md cursor-pointer">
      <p className="text-black1">{name}</p>
    </div>
  );
};

export default SpotButton;
