import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mypageAPIs } from "../../api/api";
import ShareCardBookmark from "../schedule/ShareCardBookmark";

function TripItem({ item }) {
  const { id, title, startAt, endAt, bookmarked } = item;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  useEffect(() => {}, [isBookmarked]);

  const bookmarkHandler = () => {
    mypageAPIs
      .postBookMark(id)
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
  };

  return (
    <div className="grid place-content-center">
      <div className="relative mt-5">
        <Link to={`/schedule/share/detail/${id}`} className="group share-card-layout">
          <div className="flex justify-center">
            <div className="flex justify-center flex-col ml-5">
              <span className="font-bold group-hover:text-white1">{title}</span>
              <span className="mt-2	font-base text-xs group-hover:text-white1">
                {startAt}-{endAt}
              </span>
            </div>
          </div>
        </Link>
        <div>
          <ShareCardBookmark bookmarked={isBookmarked} bookmarkHandler={bookmarkHandler} />
        </div>
      </div>
    </div>
  );
}

export default TripItem;
