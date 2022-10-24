const CommentEdit = ({ keyDownHandler, editedComment, editedCommentChangeHandler, editHandler, cancelEditHandler }) => {
  return (
    <div>
      <div className="grid grid-cols-6 gap-2" onKeyDown={keyDownHandler}>
        <input
          type="text"
          className="col-span-4 p-2 px-5 border-green1 border-2 rounded-md text-black1 focus:outline-none"
          value={editedComment}
          placeholder="댓글을 수정하세요"
          onChange={editedCommentChangeHandler}
          autoFocus
        />
        <button className="bg-green1 rounded-md text-white1 text-sm font-semibold hover:brightness-90" onClick={editHandler}>
          수정
        </button>
        <button className="bg-red-400 rounded-md text-white1 text-sm font-semibold hover:brightness-90" onClick={cancelEditHandler}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CommentEdit;
