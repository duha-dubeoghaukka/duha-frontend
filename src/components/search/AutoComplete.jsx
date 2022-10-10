const AutoComplete = ({ data, selectAutoComplete, isSelected }) => {
  const { name } = data;
  const autoCompleteClickHandler = () => {
    selectAutoComplete(name);
  };
  if (isSelected) {
    console.dir(`${isSelected} for ${data.name}`);
    return (
      <div className="py-0.5 cursor-pointer hover:bg-green1 bg-blue-900 p-5 py-[8px]" onClick={autoCompleteClickHandler}>
        <p className="text-white1">{name}</p>
      </div>
    );
  } else {
    return (
      <div className="py-0.5 cursor-pointer hover:bg-green1 p-5 py-[8px]" onClick={autoCompleteClickHandler}>
        <p className="text-black1">{name}</p>
      </div>
    );
  }
};

export default AutoComplete;
