import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import ShareCardBookmark from "./ShareCardBookmark";
import { useInfiniteQuery } from "react-query";
import checkIsLoggedIn from "../../utils/checkIsLoggedIn";
import { useInView } from "react-intersection-observer";
import useChange from "../../hooks/useChange";
import ShareIcon from "@mui/icons-material/Share";
import ShowModal from "../modal/ShowModal";

const fetchList = async pageParam => {
  const res = await api.get(`/trip?page=${pageParam}`);
  const { list, nextPage, totalPages } = res.data.data;
  return { list, nextPage, totalPages };
};

function ShareCard() {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery("list", ({ pageParam = 0 }) => fetchList(pageParam), {
    getNextPageParam: lastPage => (lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined)
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center mt-5">
        <img src="https://i.ibb.co/yyxq0XX/001.png" alt="하르방사진" className="w-10 mr-2 animate-bounce" />
      </div>
    );
  if (status === "error") return <div>error</div>;

  return (
    <div className="h-full">
      <span className="mt-5 md:mt-10 md:mb-5 md:text-lg text-black2 font-semibold flex justify-center">
        다른 뚜벅이들의 제주 일정을 참고해보세요!
      </span>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.list.map(item => (
            <ShareCardComponent key={item.id} item={item} />
          ))}
        </div>
      ))}
      {isFetchingNextPage ? (
        <div className="flex flex-col items-center justify-center mt-5">
          <img src="https://i.ibb.co/yyxq0XX/001.png" alt="하르방사진" className="w-10 mr-2 animate-bounce" />
        </div>
      ) : (
        <div ref={ref}></div>
      )}
    </div>
  );
}

function ShareCardComponent({ item }) {
  const { id, title, startAt, endAt, bookmarked } = item;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const [isModal, ModalHandler] = useChange();
  const [routeUrl, setRouteUrl] = useState();

  const url = process.env.REACT_APP_URL;
  const uri = `${url}/schedule/share/detail/${id}`;

  useEffect(() => {
    isModal === true ? setRouteUrl(uri) : null;
  }, [isModal]);

  const bookmarkHandler = () => {
    const isLoggedIn = checkIsLoggedIn();
    if (isLoggedIn) {
      api
        .get("/auth/trip/bookmark/" + id)
        .then(() => {
          setIsBookmarked(!isBookmarked);
        })
        .catch(error => {
          alert(error);
        });
    } else {
      alert("먼저 로그인을 해주세요");
    }
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
          <ShareIcon
            className="absolute top-6 right-14 cursor-pointer hover:scale-125 cursor-pointer"
            sx={{ fontSize: "20px", color: "#757575" }}
            onClick={e => {
              e.stopPropagation();
              ModalHandler();
            }}
          />
        </div>
        <ShowModal show={isModal} modalHandler={ModalHandler} route={routeUrl} title={title} />

        <div>
          <ShareCardBookmark bookmarked={isBookmarked} bookmarkHandler={bookmarkHandler} />
        </div>
      </div>
    </div>
  );
}

export default ShareCard;
