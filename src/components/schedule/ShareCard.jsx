import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import ShareCardBookmark from "./ShareCardBookmark";
import { useQuery } from "react-query";
import Spinner from "../Spinner/Spinner";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";

function ShareCard() {
  const { error, isLoading, data, refetch, status, isFetching } = useQuery("shareCards", () => {
    return api.get("/trip");
  });
  const refetchQuery = () => {
    refetch();
  };
  if (isLoading || status === "loading") {
    return <Spinner />;
  }
  if (error || status === "error") {
    return <div>{error}</div>;
  }
  if (data && status === "success") {
    const schedules = data.data.data;
    return (
      <div className="grid place-items-center h-screen">
        <span className="m-5 font-normal text-lg">다른 뚜벅이들의 제주 일정을 참고해보세요!</span>
        {schedules?.map(item => {
          return <ShareCardComponent key={item.id} item={item} refetchQuery={refetchQuery} />;
        })}
      </div>
    );
  }
}

function ShareCardComponent({ item, refetchQuery }) {
  const { id, title, startAt, endAt, bookmarked } = item;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  useEffect(() => {
    refetchQuery();
  }, [isBookmarked]);
  const bookmarkHandler = () => {
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      api
        .get("/auth/trip/bookmark/" + id)
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
      alert("먼저 로그인을 해주세요");
    }
  };
  return (
    <div className="relative mt-5 ">
      <Link
        to={`/schedule/share/detail/${id}`}
        className="group w-96 h-28 bg-white1 rounded-md shadow-lg flex flex-row hover:bg-green1 cursor-pointer"
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

export default ShareCard;
