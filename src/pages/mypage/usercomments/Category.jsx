const Category = ({ title, isActive }) => {
  if (isActive) {
    return (
      <div className="font-bold text-green1">
        <p>{title}</p>
      </div>
    );
  } else {
    return (
      <div className="font-bold text-black1 cursor-pointer hover:brightness-[3]">
        <p>{title}</p>
      </div>
    );
  }
};

export default Category;
