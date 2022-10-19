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
    <div className="flex justify-center items-center">
      {!isFirstPage && (
        <div className="cursor-pointer" onClick={goFirstPage}>
          <KeyboardDoubleArrowLeftIcon />
        </div>
      )}
      {!isFirstPage && (
        <div onClick={goPreviousPage} className="cursor-pointer">
          <ChevronLeftIcon />
        </div>
      )}
      <div className="mx-3">
        <p className="font-bold">
          {currentPage + 1} / {numberOfPages}
        </p>
      </div>
      {!isLastPage && (
        <div onClick={goNextPage} className="cursor-pointer">
          <ChevronRightIcon />
        </div>
      )}
      {!isLastPage && (
        <div className="cursor-pointer" onClick={goLastPage}>
          <KeyboardDoubleArrowRightIcon />
        </div>
      )}
    </div>
  );
};

export default Pagination;
