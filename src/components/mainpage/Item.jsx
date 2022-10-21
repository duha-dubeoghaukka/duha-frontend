import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import Map from "../../pages/detailpage/mappage/Map";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import Bookmark from "./Bookmark";

const Item = ({ data, category }) => {
  const navigator = useNavigate();
  console.dir(data);
  const { id, name, description, region, thumbnailUrl, bookmarked, hasNearStation, latitude, longitude, bookmarkNum } = data;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const itemClickHandler = () => {
    switch (category) {
      case "touristspot":
        return navigator("/spots/" + id);
        break;
      case "restaurant":
        return navigator("/restaurants/" + id);
        break;
      case "accommodation":
        return navigator("/accommodations/" + id);
        break;
    }
  };
  const bookmarkHandler = event => {
    event.stopPropagation();
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      api
        .get(`/auth/${category}/bookmark/` + id)
        .then(response => {
          if (response.data.isSuccess) {
            const nextBookmarked = response.data.data.bookmarked;
            setIsBookmarked(nextBookmarked);
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("로그인이 필요한 서비스입니다");
      navigator("/login");
    }
  };
  const mapClickHandler = event => {
    event.stopPropagation();
    setIsMapModalOpen(true);
  };
  const backdropClickHandler = () => {
    setIsMapModalOpen(false);
  };
  return (
    <div>
      <div
        onClick={itemClickHandler}
        className="p-2 md:p-4 group bg-white1 rounded-md mb-4 shadow-md cursor-pointer flex justify-start items-start hover:brightness-95 transition-all"
      >
        <div className="w-[150px] h-[120px] md:w-[220px] md:h-[150px] flex-shrink-0 relative mr-2">
          <img loading="lazy" className="w-full h-full object-cover object-center rounded-md" src={thumbnailUrl} alt={name} />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-start">
            <p className="font-bold text-sm md:text-lg">{name}</p>
            {hasNearStation && (
              <DirectionsBusFilledOutlinedIcon
                fontSize="medium"
                sx={{
                  color: "#ECB390"
                }}
              />
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-xs">{region}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs">{description}</p>
          </div>
          <div className="flex items-center">
            <Bookmark bookmarked={bookmarked} bookmarkHandler={bookmarkHandler} numberOfBookmarks={bookmarkNum} />
          </div>
          <div onClick={mapClickHandler}>
            <MapIcon className="cursor-pointer" fontSize="medium" />
          </div>
        </div>
      </div>
      {isMapModalOpen && (
        <div>
          <div className="fixed top-0 left-0 z-20 w-[100vw] h-[100vh] bg-black1 opacity-50" onClick={backdropClickHandler}></div>
          <div className="fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
            <Map latitude={latitude} longitude={longitude} name={name} setIsMapModalOpen={setIsMapModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
