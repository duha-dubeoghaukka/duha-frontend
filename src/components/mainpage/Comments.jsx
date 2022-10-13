import CommentField from "./CommentField";
import CommentList from "./CommentList";
import { useState } from "react";

const Comments = ({ category }) => {
  const [comment, setComment] = useState("");
  const commentRegisterHandler = () => {
    console.dir(comment);
  };
  return (
    <div>
      <CommentField comment={comment} setComment={setComment} commentRegisterHandler={commentRegisterHandler} />
      <CommentList />
    </div>
  );
};

export default Comments;
