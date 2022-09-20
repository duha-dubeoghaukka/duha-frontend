import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

const Layout = props => {
  const { children, isLoggedIn, title, highlight } = props;
  const [greaterCategory, category] = highlight.split("/");
  return (
    <div>
      <div className="fixed w-full py-[31px] bg-[#7FB77E] z-10">
        <div className="max-w-[1200px]">
          <h1 className="text-[#F6F6F6] font-bold text-[26px] text-center">
            {title}
          </h1>
          <p className="absolute font-bold text-[26px] right-10 top-[31px] text-[#F6F6F6] cursor-pointer">
            {isLoggedIn ? "로그아웃" : "로그인"}
          </p>
        </div>
      </div>
      <div className="fixed w-[290px] mt-[100px] border-r-2 h-full">
        <div>
          <img
            src="/assets/LogoV2.png"
            alt="뚜벅하우까 로고"
            className="w-[180px] mx-auto my-[43px] cursor-pointer"
          />
        </div>
        <div className="ml-[54px]">
          <div className="mb-[28px]">
            <div
              className={`flex items-center mb-[8px] cursor-pointer ${
                greaterCategory === "mainpage" && "text-[#7FB77E]"
              }`}
            >
              <HomeIcon sx={{ width: "32px" }} />
              <h2 className="font-bold text-[20px] ml-[6px]">메인 페이지</h2>
            </div>
            <ul className="text-[16px] ml-[38px]">
              <li
                className={`cursor-pointer ${
                  category === "spots" && "text-[#7FB77E]"
                }`}
              >
                관광지
              </li>
              <li
                className={`cursor-pointer ${
                  category === "restaurants" && "text-[#7FB77E]"
                }`}
              >
                맛집
              </li>
              <li
                className={`cursor-pointer ${
                  category === "accommodations" && "text-[#7FB77E]"
                }`}
              >
                숙소
              </li>
            </ul>
          </div>
          <div className="mb-[28px]">
            <div
              className={`flex items-center mb-[8px] cursor-pointer ${
                greaterCategory === "schedule" && "text-[#7FB77E]"
              }`}
            >
              <CalendarMonthIcon sx={{ width: "32px" }} />
              <h2 className="font-bold text-[20px] ml-[6px]">일정</h2>
            </div>
            <ul className="text-[16px] ml-[38px]">
              <li
                className={`cursor-pointer ${
                  category === "create" && "text-[#7FB77E]"
                }`}
              >
                일정 등록
              </li>
              <li
                className={`cursor-pointer ${
                  category === "share" && "text-[#7FB77E]"
                }`}
              >
                일정 공유
              </li>
            </ul>
          </div>
          <div>
            <div
              className={`flex items-center mb-[8px] cursor-pointer ${
                greaterCategory === "mypage" && "text-[#7FB77E]"
              }`}
            >
              <PersonIcon sx={{ width: "32px" }} />
              <h2 className="font-bold text-[20px] ml-[6px]">마이 페이지</h2>
            </div>
            <ul className="text-[16px] ml-[38px]">
              <li
                className={`cursor-pointer ${
                  category === "favorites" && "text-[#7FB77E]"
                }`}
              >
                즐겨찾기한 목록
              </li>
              <li
                className={`cursor-pointer ${
                  category === "edit" && "text-[#7FB77E]"
                }`}
              >
                회원 정보 변경
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[600px] mx-auto pt-[130px] border-l-2 border-r-2 px-[24px]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
