import checkIsLoggedIn from "../../utils/checkIsLoggedIn";

const CommentField = ({ comment, setComment, commentRegisterHandler, enterHandler }) => {
  const keyDownHandler = event => {
    if (event.keyCode === 13) {
      commentRegisterHandler();
    }
  };
  const commentChangeHandler = event => {
    setComment(event.target.value);
  };
  return (
    <div className="grid grid-cols-[1fr_80px] gap-3" onKeyDown={keyDownHandler}>
      <input
        type="text"
        className="border-green1 border-2 rounded-md p-2 pl-5 text-black1 disabled:border-gray-200 disabled:bg-gray-200 placeholder:text-green1 disabled:placeholder:text-black1 disabled:cursor-not-allowed focus:outline-none"
        value={comment}
        placeholder={checkIsLoggedIn() ? "댓글을 입력해주세요" : "로그인 후에 댓글 입력이 가능합니다."}
        onChange={commentChangeHandler}
        disabled={!checkIsLoggedIn()}
      />
      <button
        className="bg-green1 rounded-md text-white1 font-bold p-2 cursor-pointer hover:brightness-90 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:brightness-100"
        onClick={commentRegisterHandler}
        disabled={!checkIsLoggedIn()}
      >
        작성
      </button>
    </div>
  );
};

export default CommentField;
