import checkIsLoggedIn from "../../../utils/checkIsLoggedIn";
import decodeToken from "../../../utils/decodeToken";
import { useState } from "react";
import { api } from "../../../api/api";
import { getCookie } from "../../../shared/Cookie";
import CommentContent from "./CommentContent";
import CommentUtilities from "./CommentUtilities";
import CommentEdit from "./CommentEdit";

const CommentItem = ({ data, commentDeleteHandler, category, refetchComments }) => {
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
        .then(() => {
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
            {isEditMode || <CommentContent review={review} />}
          </div>
        </div>
        {isAuthor && <CommentUtilities editClickHandler={editClickHandler} deleteClickHandler={deleteClickHandler} />}
      </div>
      {isEditMode && (
        <CommentEdit
          editHandler={editHandler}
          keyDownHandler={keyDownHandler}
          cancelEditHandler={cancelEditHandler}
          editedCommentChangeHandler={editedCommentChangeHandler}
          editedComment={editedComment}
        />
      )}
    </div>
  );
};

export default CommentItem;
