import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({ currentPage, numberOfPages, setCurrentPage }) => {
  const pages = [...Array.from({ length: numberOfPages }).keys()];
  return (
    <div className="flex justify-center">
      <div>
        <ChevronLeftIcon fontSize="large" />
        <p>이전</p>
      </div>
      <div>
        <p>{currentPage}</p>
      </div>
      <div>
        <ChevronRightIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Pagination;
