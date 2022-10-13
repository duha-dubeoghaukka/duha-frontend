import ReviewItem from "./ReviewItem";

const CommentList = ({ comments, commentDeleteHandler }) => {
  return (
    <div>
      <div className="mt-3">
        <div className="bg-white1 rounded-md px-5 md:px-10 py-3 md:py-5">
          <p className="text-base md:text-lg font-semibold mb-3">댓글</p>
          <div className="grid gap-[44px]">
            {comments.map(comment => {
              return <ReviewItem key={comment.id} data={comment} commentDeleteHandler={commentDeleteHandler} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
