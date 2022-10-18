import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Pagination = ({ currentPage, numberOfPages, setCurrentPage }) => {
  const goFirstPage = () => {
    setCurrentPage(0);
  };
  const goLastPage = () => {
    setCurrentPage(numberOfPages - 1);
  };
  const goPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const goNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === numberOfPages - 1;
  return (
    <div className="flex justify-center">
      {!isFirstPage && (
        <div className="cursor-pointer" onClick={goFirstPage}>
          <KeyboardDoubleArrowLeftIcon fontSize="large" />
        </div>
      )}
      {!isFirstPage && (
        <div onClick={goPreviousPage} className="flex cursor-pointer">
          <ChevronLeftIcon fontSize="large" />
          <p>이전</p>
        </div>
      )}
      <div>
        <p>
          {currentPage + 1} / {numberOfPages}
        </p>
      </div>
      {!isLastPage && (
        <div onClick={goNextPage} className="flex cursor-pointer">
          <p>다음</p>
          <ChevronRightIcon fontSize="large" />
        </div>
      )}
      {!isLastPage && (
        <div className="cursor-pointer" onClick={goLastPage}>
          <KeyboardDoubleArrowRightIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
