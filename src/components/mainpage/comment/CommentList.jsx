import CommentItem from "./CommentItem";

const CommentList = ({ comments, commentDeleteHandler, category, refetchComments }) => {
  const isCommentsEmpty = comments.length === 0;
  return (
    <div>
      <div className="mt-3">
        <div className="bg-white1 rounded-md px-5 md:px-10 py-3 md:py-5">
          <p className="text-base md:text-lg font-semibold mb-3">댓글</p>
          {isCommentsEmpty ? (
            <div>
              <p className="text-center text-black1">아직 댓글이 존재하지 않습니다.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {comments.map(comment => {
                return (
                  <CommentItem
                    key={comment.id}
                    data={comment}
                    commentDeleteHandler={commentDeleteHandler}
                    category={category}
                    refetchComments={refetchComments}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
