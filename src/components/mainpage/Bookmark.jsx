import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

const Bookmark = ({ bookmarked, numberOfBookmarks, category, id, refetchList }) => {
  const navigator = useNavigate();
  const bookmarkHandler = event => {
    event.stopPropagation();
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      api
        .get(`/auth/${category}/bookmark/${id}`)
        .then(response => {
          refetchList();
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("로그인이 필요한 서비스입니다");
      navigator("/login");
    }
  };
  return (
    <div className="flex items-center">
      {bookmarked ? (
        <StarRoundedIcon sx={{ color: "#ffd740" }} onClick={bookmarkHandler} />
      ) : (
        <StarOutlineRoundedIcon sx={{ color: "#ffd740" }} onClick={bookmarkHandler} />
      )}
      <p className="text-black1 font-bold text-sm ml-1">{numberOfBookmarks}</p>
    </div>
  );
};

export default Bookmark;
