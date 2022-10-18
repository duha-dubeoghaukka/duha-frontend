import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({ currentPage, numberOfPages, setCurrentPage }) => {
  const goPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const goNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="flex justify-center">
      <div onClick={goPreviousPage}>
        <ChevronLeftIcon fontSize="large" />
        <p>이전</p>
      </div>
      <div>
        <p>
          {currentPage} / {numberOfPages}
        </p>
      </div>
      <div onClick={goNextPage}>
        <ChevronRightIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Pagination;
