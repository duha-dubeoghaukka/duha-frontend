import { useNavigate } from "react-router-dom";

const Comment = ({ comment, currentCategory }) => {
  const navigator = useNavigate();
  let category;
  switch (currentCategory) {
    case "관광":
      category = "spots";
      break;
    case "맛집":
      category = "restaurants";
      break;
    case "숙소":
      category = "accommodations";
      break;
  }
  const clickHandler = () => {
    navigator(`/${category}/${itemId}`);
  };
  const { reviewName, reviewedAt, review, itemId } = comment;
  return (
    <div className="my-3 cursor-pointer group" onClick={clickHandler}>
      <div className="flex justify-between items-center mb-1">
        <p className="text-black1 group-hover:underline group-hover:text-blue-500">{reviewName}</p>
        <p className="text-black1 text-xs">{reviewedAt}</p>
      </div>
      <div className="bg-white1 p-2 shadow-md rounded-lg inline-block">
        <p className="text-black1">{review}</p>
      </div>
    </div>
  );
};

export default Comment;
