import Category from "./Category";

const Categories = ({ currentCategory }) => {
  return (
    <div className="flex justify-around my-5">
      <Category title="관광" isActive={currentCategory === "관광"} />
      <Category title="맛집" isActive={currentCategory === "맛집"} />
      <Category title="숙소" isActive={currentCategory === "숙소"} />
    </div>
  );
};

export default Categories;
