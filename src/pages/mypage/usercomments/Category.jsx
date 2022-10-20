const Category = ({ title, isActive, setCurrentCategory }) => {
  const categoryClickHandler = () => {
    setCurrentCategory(title);
  };
  if (isActive) {
    return (
      <div className="font-bold text-green1 text-lg">
        <p>{title}</p>
      </div>
    );
  } else {
    return (
      <div className="font-bold text-black1 cursor-pointer hover:brightness-[3] text-lg" onClick={categoryClickHandler}>
        <p>{title}</p>
      </div>
    );
  }
};

export default Category;
