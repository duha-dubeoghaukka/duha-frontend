const CommentContent = ({ review }) => {
  return (
    <div className="bg-white shadow-md p-2 rounded-md">
      <p className="text-sm md:text-base">{review}</p>
    </div>
  );
};

export default CommentContent;
