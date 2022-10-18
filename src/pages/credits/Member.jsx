const Member = ({ content, githubURL }) => {
  return (
    <div className="mb-3">
      <p className="font-bold text-black1">{content}</p>
      <a href={githubURL} target="_blank" className="text-sm text-blue-600 hover:underline">
        {githubURL}
      </a>
    </div>
  );
};

export default Member;
