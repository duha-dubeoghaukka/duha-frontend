const CommentField = ({ comment, setComment }) => {
  const commentChangeHandler = event => {
    setComment(event.target.value);
  };
  return (
    <div className="grid grid-cols-[1fr_80px] gap-3">
      <input
        type="text"
        className="border-green1 border-2 rounded-lg p-2 pl-5 text-black1"
        value={comment}
        onChange={commentChangeHandler}
      />
      <button className="bg-green1 rounded-lg text-white1 font-bold p-2 cursor-pointer hover:brightness-90">작성</button>
    </div>
  );
};

export default CommentField;
