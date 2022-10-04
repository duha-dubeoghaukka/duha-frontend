import React from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import ShareCardBookmark from "./ShareCardBookmark";
import { useQuery } from "react-query";
import Spinner from "../Spinner/Spinner";

function ShareCard() {
  const { error, isLoading, data, refetch } = useQuery("shareCards", () => {
    return api.get("/trip");
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const schedules = data.data.data;
    return (
      <div className="grid place-items-center h-screen">
        <span className="m-5 font-normal text-lg">다른 뚜벅이들의 제주 일정을 참고해보세요!</span>
        {schedules?.map(item => {
          return <ShareCardComponent key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

function ShareCardComponent({ item }) {
  const { id, title, startAt, endAt, bookmarked } = item;
  const bookmarkHandler = event => {};

  return (
    <div className="relative">
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
        <ShareCardBookmark bookmarked={bookmarked} bookmarkHandler={bookmarkHandler} />
      </div>
    </div>
  );
}

export default ShareCard;
