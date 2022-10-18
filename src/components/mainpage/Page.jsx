const Page = ({ pageNumber, isActive, setCurrentPage }) => {
  const pageClickHandler = () => {
    setCurrentPage(pageNumber);
  };
  if (isActive) {
    return (
      <div className="mr-1">
        <p className="font-bold">{pageNumber + 1}</p>
      </div>
    );
  } else {
    return (
      <div className="mr-1 cursor-pointer" onClick={pageClickHandler}>
        <p>{pageNumber + 1}</p>
      </div>
    );
  }
};

export default Page;
