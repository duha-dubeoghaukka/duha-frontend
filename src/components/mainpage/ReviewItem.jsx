import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import decodeToken from "../../utils/decodeToken";
import { useState } from "react";
import { api } from "../../api/api";
import { getCookie } from "../../shared/Cookie";

const ReviewItem = ({ data, commentDeleteHandler, category, refetchComments }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { review, reviewer, id } = data;
  let isAuthor = false;
  const [editedComment, setEditedComment] = useState(review);
  if (checkIsLoggedIn()) {
    const token = getCookie("authorization");
    const currentUser = decodeToken(token);
    if (currentUser === reviewer) {
      isAuthor = true;
    }
  }
  const deleteClickHandler = () => {
    commentDeleteHandler(id);
  };
  const editClickHandler = () => {
    setIsEditMode(true);
  };
  const editedCommentChangeHandler = event => {
    setEditedComment(event.target.value);
  };
  const editHandler = () => {
    const whitespaceRegex = new RegExp(/^\s*$/);
    const isOnlyWhitespace = whitespaceRegex.test(editedComment);
    const isEmpty = editedComment.length === 0;
    if (!isOnlyWhitespace && !isEmpty) {
      api
        .put(`/auth/${category}/review/${id}`, {
          review: editedComment
        })
        .then(response => {
          refetchComments();
          setIsEditMode(false);
        })
        .catch(error => {
          alert(error);
        });
    } else {
      setEditedComment("");
    }
  };
  const cancelEditHandler = () => {
    setIsEditMode(false);
    setEditedComment(review);
  };
  const keyDownHandler = event => {
    if (event.keyCode === 13) {
      editHandler();
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center mb-2 md:mb-4">
          <img src="https://i.ibb.co/yyxq0XX/001.png" alt="하르방사진" className="w-10 mr-2" />
          <div>
            <p className="text-xs md:text-sm font-semibold mb-1">{reviewer}</p>
            {isEditMode || (
              <div className="bg-white shadow-md p-2 rounded-md">
                <p className="text-sm md:text-base">{review}</p>
              </div>
            )}
          </div>
        </div>
        {isAuthor && (
          <div className="flex">
            <div className="cursor-pointer" onClick={editClickHandler}>
              <ModeEditOutlineOutlinedIcon fontSize="medium" />
            </div>
            <div className="cursor-pointer" onClick={deleteClickHandler}>
              <DeleteOutlineIcon fontSize="medium" />
            </div>
          </div>
        )}
      </div>
      {isEditMode && (
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
      )}
    </div>
  );
};

export default ReviewItem;
