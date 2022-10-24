import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CommentUtilities = ({ editClickHandler, deleteClickHandler }) => {
  return (
    <div className="flex">
      <div className="cursor-pointer" onClick={editClickHandler}>
        <ModeEditOutlineOutlinedIcon fontSize="medium" />
      </div>
      <div className="cursor-pointer" onClick={deleteClickHandler}>
        <DeleteOutlineIcon fontSize="medium" />
      </div>
    </div>
  );
};

export default CommentUtilities;
