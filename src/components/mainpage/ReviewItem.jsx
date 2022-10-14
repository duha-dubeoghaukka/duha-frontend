import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import decodeToken from "../../utils/decodeToken";
import { useState } from "react";
import { api } from "../../api/api";

const ReviewItem = ({ data, commentDeleteHandler, category, refetchComments }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { review, reviewer, id } = data;
  let isAuthor = false;
  const [editedComment, setEditedComment] = useState(review);
  if (checkIsLoggedIn()) {
    const token = localStorage.getItem("authorization");
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
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center mb-[24px]">
            <div className="mr-[16px]">
              <AccountCircleIcon fontSize="large" />
            </div>
            <div>
              <p className="text-[16px]">{reviewer}</p>
            </div>
          </div>
          {isEditMode || (
            <div>
              <p className="text-[16px]">{review}</p>
            </div>
          )}
        </div>
        {isAuthor && (
          <div className="flex">
            <div className="cursor-pointer" onClick={editClickHandler}>
              <EditIcon fontSize="large" />
            </div>
            <div className="cursor-pointer" onClick={deleteClickHandler}>
              <DeleteIcon fontSize="large" />
            </div>
          </div>
        )}
      </div>
      {isEditMode && (
        <div>
          <div className="grid grid-cols-[1fr_80px_80px] gap-2">
            <input
              type="text"
              className="p-2 px-5 border-green1 border-2 rounded-lg text-black1"
              value={editedComment}
              placeholder="댓글을 수정하세요"
              onChange={editedCommentChangeHandler}
            />
            <button className="bg-green1 rounded-lg text-white1 font-bold cursor-pointer hover:brightness-90" onClick={editHandler}>
              수정
            </button>
            <button className="bg-red-400 rounded-lg text-white1 font-bold cursor-pointer hover:brightness-90" onClick={cancelEditHandler}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
