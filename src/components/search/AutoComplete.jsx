const AutoComplete = ({ data }) => {
  const { name } = data;
  return (
    <div className="py-0.5 cursor-pointer hover:bg-green1 p-5 py-[8px]">
      <p className="text-black1">{name}</p>
    </div>
  );
};

export default AutoComplete;
