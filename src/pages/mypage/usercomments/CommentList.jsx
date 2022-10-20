import Comment from "./Comment";

const CommentList = ({ comments, currentCategory }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center my-3">
        <p className="text-black1">작성한 댓글이 존재하지 않습니다.</p>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-200 p-3 rounded-lg">
        {comments
          .sort((a, b) => Date.parse(a.reviewedAt) - Date.parse(b.reviewedAt))
          .map(comment => {
            return <Comment key={comment.id} comment={comment} currentCategory={currentCategory} />;
          })}
      </div>
    );
  }
};

export default CommentList;
