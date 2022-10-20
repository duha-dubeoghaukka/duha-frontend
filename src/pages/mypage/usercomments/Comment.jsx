const Comment = ({ comment }) => {
  const { reviewName, reviewedAt, review } = comment;
  return (
    <div className="my-3">
      <div className="flex justify-between items-center">
        <div className="bg-white shadow-md p-2 rounded-md inline-block">
          <p className="text-sm text-black1 md:text-base">{review}</p>
        </div>
        <div>
          <p className="text-black1">
            {reviewName} - {reviewedAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
