import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewItem = ({ data }) => {
  const { review, reviewer } = data;
  return (
    <div className="flex justify-between">
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
      <div>
        <div className="cursor-pointer">
          <DeleteIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
