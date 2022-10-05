const AutoComplete = ({ data, selectAutoComplete }) => {
  const { name } = data;
  const autoCompleteClickHandler = () => {
    selectAutoComplete(name);
  };
  return (
    <div className="py-0.5 cursor-pointer hover:bg-green1 p-5 py-[8px]" onClick={autoCompleteClickHandler}>
      <p className="text-black1">{name}</p>
    </div>
  );
};

export default AutoComplete;
