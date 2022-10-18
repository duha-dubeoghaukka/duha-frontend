import Page from "./Page";

const Pagination = ({ currentPage, numberOfPages, setCurrentPage }) => {
  const pages = [...Array.from({ length: numberOfPages }).keys()];
  return (
    <div className="flex justify-center">
      {pages.map(page => {
        return <Page key={page} pageNumber={page} isActive={currentPage === page} setCurrentPage={setCurrentPage} />;
      })}
    </div>
  );
};

export default Pagination;
