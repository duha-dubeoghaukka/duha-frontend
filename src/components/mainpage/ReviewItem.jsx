import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import decodeToken from "../../utils/decodeToken";
import { useState } from "react";

const ReviewItem = ({ data, commentDeleteHandler }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { review, reviewer, id } = data;
  let isAuthor = false;
  if (checkIsLoggedIn()) {
    const token = localStorage.getItem("authorization");
    const currentUser = decodeToken(token);
    if (currentUser === reviewer) {
      isAuthor = true;
    }
  }
  const deleteClickHandler = () => {
    commentDeleteHandler(id);
  };
  const editClickHandler = () => {
    setIsEditMode(true);
  };
  return (
    <div>
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
          {isEditMode || (
            <div>
              <p className="text-[16px]">{review}</p>
            </div>
          )}
        </div>
        {isAuthor && (
          <div className="flex">
            <div className="cursor-pointer" onClick={editClickHandler}>
              <EditIcon fontSize="large" />
            </div>
            <div className="cursor-pointer" onClick={deleteClickHandler}>
              <DeleteIcon fontSize="large" />
            </div>
          </div>
        )}
      </div>
      {isEditMode && (
        <div>
          <div className="grid grid-cols-[1fr_80px] gap-3">
            <input type="text" className="p-2 px-5 border-green1 border-2 rounded-lg text-black1" />
            <button className="bg-green1 rounded-lg text-white1 font-bold cursor-pointer hover:brightness-90">수정</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
