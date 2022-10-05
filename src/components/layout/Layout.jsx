import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import decodeToken from "../../utils/decodeToken";

const Layout = props => {
  const [isOpen, setIsOpen] = useState(false);
  const { children, title, highlight } = props;
  const [greaterCategory, category] = highlight.split("/");

  const navigate = useNavigate();

  // 로컬스토리지 토큰 확인
  const token = localStorage.getItem("authorization");
  const loginHandler = () => {
    if (token) {
      localStorage.removeItem("authorization");
      localStorage.removeItem("refresh-token");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const nickName = decodeToken(token);

  return (
    <div className="mb-[100px]">
      <div className="fixed w-full py-5 bg-green1 z-10 flex justify-between md:grid md:grid-cols-4 md:justify-items-center">
        <button className="mx-2 text-white1 hidden md:block" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </button>
        <p className="font-semibold text-sm md:text-base text-white1 md:hidden mx-4">
          {nickName ? `반가워요, ${nickName}뚜벅러님!` : `로그인을 해주세요!`}
        </p>
        <h1 className="text-white1 font-semibold text-base hidden md:block col-span-2">{title}</h1>
        <div className="flex">
          <button className="font-semibold text-sm md:text-base text-white1 mx-4" onClick={loginHandler}>
            {token ? "로그아웃" : "로그인"}
          </button>
          <button
            className="font-semibold text-sm md:text-base text-white1 mx-4"
            onClick={() => {
              navigate("/signup");
            }}
          >
            {!token && "회원가입"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed w-[290px] pt-20 h-full bg-white shadow-md hidden md:block">
          <div>
            <Link to="/">
              <img src="/assets/LogoV2.png" alt="뚜벅하우까 로고" className="w-[180px] mx-auto my-[43px] cursor-pointer" />
            </Link>
          </div>
          <div className="ml-[54px]">
            <div className="mb-[28px]">
              <div className={`flex items-center mb-[8px] cursor-pointer ${greaterCategory === "mainpage" && "text-green1"}`}>
                <HomeIcon fontSize="large" sx={{ width: "32px" }} />
                <h2 className="font-bold text-[20px] ml-[6px]">메인 페이지</h2>
              </div>
              <div className="text-base ml-[38px] flex flex-col">
                <Link to="/" className={`cursor-pointer ${category === "home" && "text-green1"}`}>
                  홈
                </Link>
                <Link to="/spots" className={`cursor-pointer ${category === "spots" && "text-green1"}`}>
                  관광지
                </Link>
                <Link to="/restaurants" className={`cursor-pointer ${category === "restaurants" && "text-green1"}`}>
                  맛집
                </Link>
                <Link to="/accommodations" className={`cursor-pointer ${category === "accommodations" && "text-green1"}`}>
                  숙소
                </Link>
              </div>
            </div>
            <div className="mb-[28px]">
              <div className={`flex items-center mb-[8px] cursor-pointer ${greaterCategory === "schedule" && "text-green1"}`}>
                <CalendarMonthIcon fontSize="large" sx={{ width: "32px" }} />
                <h2 className="font-bold text-[20px] ml-[6px]">일정</h2>
              </div>
              <div className="text-base ml-[38px] flex flex-col">
                <Link to="/schedule" className={`cursor-pointer ${category === "create" && "text-green1"}`}>
                  일정 등록
                </Link>
                <Link to="/schedule/share" className={`cursor-pointer ${category === "share" && "text-green1"}`}>
                  일정 공유
                </Link>
              </div>
            </div>
            <div>
              <div className={`flex items-center mb-[8px] cursor-pointer ${greaterCategory === "mypage" && "text-green1"}`}>
                <PersonIcon fontSize="large" sx={{ width: "32px" }} />
                <h2 className="font-bold text-[20px] ml-[6px]">마이 페이지</h2>
              </div>
              <div className="text-base ml-[38px] flex flex-col">
                <Link to="/" className={`cursor-pointer ${category === "myschedule" && "text-green1"}`}>
                  내 일정
                </Link>
                <Link to="/mypage/favorites/list" className={`cursor-pointer ${category === "favorites" && "text-green1"}`}>
                  즐겨찾기한 목록
                </Link>
                <Link to="/mypage/user/edit" className={`cursor-pointer ${category === "edit" && "text-green1"}`}>
                  회원 정보 변경
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 md:invisible h-[83px] bg-white1 w-full flex justify-around items-center">
        <Link to="/">
          <HomeIcon fontSize="large" className="cursor-pointer" />
        </Link>
        <Link to="/schedule">
          <CalendarMonthIcon fontSize="large" className="cursor-pointer" />
        </Link>
        <Link to="/mypage/favorites/list">
          <PersonIcon fontSize="large" className="cursor-pointer" />
        </Link>
      </div>
      <div className="md:w-[600px] mx-auto pt-20 px-[24px] md:px-0 md:mb-10">{children}</div>
    </div>
  );
};

export default Layout;
