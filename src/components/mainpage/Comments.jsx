import CommentField from "./CommentField";
import CommentList from "./CommentList";
import { useState } from "react";

const Comments = ({ category }) => {
  const [comment, setComment] = useState("");
  return (
    <div>
      <CommentField comment={comment} setComment={setComment} />
      <CommentList />
    </div>
  );
};

export default Comments;
