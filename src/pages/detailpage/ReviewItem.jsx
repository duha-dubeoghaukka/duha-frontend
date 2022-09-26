import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ReviewItem = ({ data }) => {
  const { review, reviewedAt, reviewer } = data;
  return (
    <div>
      <div className="flex items-center mb-[24px]">
        <div className="mr-[16px]">
          <AccountCircleIcon fontSize="large" />
        </div>
        <div>
          <p className="text-[16px]">{reviewer}</p>
        </div>
      </div>
      <div>
        <p className="text-[16px]">{review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
