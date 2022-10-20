import Category from "./Category";

const Categories = ({ currentCategory, setCurrentCategory }) => {
  return (
    <div className="flex justify-around my-5">
      <Category title="관광" isActive={currentCategory === "관광"} setCurrentCategory={setCurrentCategory} />
      <Category title="맛집" isActive={currentCategory === "맛집"} setCurrentCategory={setCurrentCategory} />
      <Category title="숙소" isActive={currentCategory === "숙소"} setCurrentCategory={setCurrentCategory} />
    </div>
  );
};

export default Categories;
