import { Link } from "react-router-dom";

const Comment = ({ comment, currentCategory }) => {
  let category;
  switch (currentCategory) {
    case "관광":
      category = "touristspots";
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
  const { reviewName, reviewedAt, review, id } = comment;
  return (
    <div className="my-3">
      <div className="flex justify-between items-center">
        <div className="bg-white shadow-md p-2 rounded-md inline-block">
          <p className="text-sm text-black1 md:text-base">{review}</p>
        </div>
        <div className="flex flex-col items-end">
          <Link to={`/${category}/${id}`} className="text-black1" className="hover:underline hover:text-blue-500">
            {reviewName}
          </Link>
          <p className="text-black1 text-xs">{reviewedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;