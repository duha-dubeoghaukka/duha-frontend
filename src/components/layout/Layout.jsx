import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

const Layout = props => {
  const { children, isLoggedIn, title, highlight } = props;
  const [greaterCategory, category] = highlight.split("/");
  return (
    <div>
      <div className="fixed w-full py-5 bg-green1 z-10">
        <h1 className="text-white1 font-semibold text-[16px] text-center invisible md:visible">{title}</h1>
        <p className="absolute font-semibold text-[16px] right-10 top-5 text-white1 cursor-pointer">{isLoggedIn ? "로그아웃" : "로그인"}</p>
        <p className="absolute font-semibold text-[16px] left-10 top-5 text-white1 md:invisible">반가워요, 익명의 뚜벅러님!</p>
      </div>
      <div className="fixed w-[290px] pt-20 h-full bg-white shadow-md invisible md:visible">
        <div>
          <img src="/assets/LogoV2.png" alt="뚜벅하우까 로고" className="w-[180px] mx-auto my-[43px] cursor-pointer" />
        </div>
        <div className="ml-[54px]">
          <div className="mb-[28px]">
            <div className={`flex items-center mb-[8px] cursor-pointer ${greaterCategory === "mainpage" && "text-green1"}`}>
              <HomeIcon fontSize="large" sx={{ width: "32px" }} />
              <h2 className="font-bold text-[20px] ml-[6px]">메인 페이지</h2>
            </div>
            <ul className="text-[16px] ml-[38px]">
              <li className={`cursor-pointer ${category === "home" && "text-green1"}`}>홈</li>
              <li className={`cursor-pointer ${category === "spots" && "text-green1"}`}>관광지</li>
              <li className={`cursor-pointer ${category === "restaurants" && "text-green1"}`}>맛집</li>
              <li className={`cursor-pointer ${category === "accommodations" && "text-green1"}`}>숙소</li>
            </ul>
          </div>
          <div className="mb-[28px]">
            <div className={`flex items-center mb-[8px] cursor-pointer ${greaterCategory === "schedule" && "text-green1"}`}>
              <CalendarMonthIcon fontSize="large" sx={{ width: "32px" }} />
              <h2 className="font-bold text-[20px] ml-[6px]">일정</h2>
            </div>
            <ul className="text-[16px] ml-[38px]">
              <li className={`cursor-pointer ${category === "create" && "text-green1"}`}>일정 등록</li>
              <li className={`cursor-pointer ${category === "share" && "text-green1"}`}>일정 공유</li>
            </ul>
          </div>
          <div>
            <div className={`flex items-center mb-[8px] cursor-pointer ${greaterCategory === "mypage" && "text-green1"}`}>
              <PersonIcon fontSize="large" sx={{ width: "32px" }} />
              <h2 className="font-bold text-[20px] ml-[6px]">마이 페이지</h2>
            </div>
            <ul className="text-[16px] ml-[38px]">
              <li className={`cursor-pointer ${category === "favorites" && "text-green1"}`}>즐겨찾기한 목록</li>
              <li className={`cursor-pointer ${category === "edit" && "text-green1"}`}>회원 정보 변경</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 md:invisible h-[83px] bg-white1 w-full flex justify-around items-center">
        <div>
          <HomeIcon fontSize="large" className="cursor-pointer" />
        </div>
        <div>
          <CalendarMonthIcon fontSize="large" className="cursor-pointer" />
        </div>
        <div>
          <PersonIcon fontSize="large" className="cursor-pointer" />
        </div>
      </div>
      <div className="md:w-[600px] mx-auto pt-20 px-[24px] md:px-0 mb-10">{children}</div>
    </div>
  );
};

export default Layout;
