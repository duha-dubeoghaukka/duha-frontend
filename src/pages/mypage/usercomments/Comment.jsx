import { Link } from "react-router-dom";

const Comment = ({ comment, currentCategory }) => {
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
    default:
      break;
  }
  const { reviewName, reviewedAt, review, itemId } = comment;
  return (
    <div className="my-3">
      <div className="flex justify-between items-center mb-1">
        <Link to={`/${category}/${itemId}`} className="text-black1" className="hover:underline hover:text-blue-500">
          {reviewName}
        </Link>
        <p className="text-black1 text-xs">{reviewedAt}</p>
      </div>
      <div className="bg-white1 p-2 shadow-md rounded-lg inline-block">
        <p className="text-black1">{review}</p>
      </div>
    </div>
  );
};

export default Comment;
