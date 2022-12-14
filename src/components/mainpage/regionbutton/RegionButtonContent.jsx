const RegionButtonContent = ({ name }) => {
  return (
    <p className="border-2 border-green1 cursor-pointer px-3 py-1 rounded-full font-semibold text-sm hover:bg-green1 hover:text-white transition-all ease-in-out">
      {name}
    </p>
  );
};

export default RegionButtonContent;
