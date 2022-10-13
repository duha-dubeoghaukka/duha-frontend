import CommentField from "./CommentField";
import CommentList from "./CommentList";
import { useState } from "react";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { api } from "../../api/api";

const Comments = ({ category, id, refetchComments }) => {
  const [comment, setComment] = useState("");
  const commentRegisterHandler = () => {
    setComment("");
    const whitespaceRegex = new RegExp(/^\s*$/);
    const isOnlyWhitespace = whitespaceRegex.test(comment);
    const isEmpty = comment.length === 0;
    if (!isOnlyWhitespace && !isEmpty && checkIsLoggedIn()) {
      api
        .post(`/auth/${category}/review/${id}`, {
          review: comment
        })
        .then(response => {
          refetchComments();
        })
        .catch(error => {
          alert(error);
        });
    }
  };
  return (
    <div>
      <CommentField comment={comment} setComment={setComment} commentRegisterHandler={commentRegisterHandler} />
      <CommentList />
    </div>
  );
};

export default Comments;
