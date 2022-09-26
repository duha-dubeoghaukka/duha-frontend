import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ReviewItem = () => {
  return (
    <div>
      <div className="flex items-center mb-[28px]">
        <div className="mr-[16px]">
          <AccountCircleIcon fontSize="large" />
        </div>
        <div>
          <p className="text-[16px]">닉네임</p>
          <p className="text-[16px]">리뷰 등록일</p>
        </div>
      </div>
      <div>
        <p className="text-[16px]">설명란</p>
      </div>
    </div>
  );
};

export default ReviewItem;
