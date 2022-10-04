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
    <div className="relative">
      <Link
        to={`/schedule/share/detail/${id}`}
        className="group w-96 h-28 bg-white1 rounded-md shadow-lg flex flex-row hover:bg-green1 cursor-pointer mb-7"
      >
        <div className="flex space-x-20">
          <div className="flex flex-col m-6 p-3 w-48">
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
  );
}

export default TripItem;
