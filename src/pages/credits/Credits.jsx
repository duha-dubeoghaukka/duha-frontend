import Layout from "../../components/layout/Layout";
import Member from "./Member";

const Credits = () => {
  return (
    <Layout title={"출처 및 저작권자 정보"} highlight={""} isLoggedIn={false}>
      <div className="my-10">
        <img src="/assets/Logo.png" alt="Logo" className="w-full" />
      </div>
      <div className="mb-3 text-center">
        <p className="text-black1 text-lg font-bold mb-1">이용 약관</p>
        <p className="text-sm text-black1">
          본 서비스는 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하고 존중하기 위해 노력합니다. 본 서비스에서 제공하고 있는 컨텐츠는
          제주관광공사에서 2021년 작성하여 개방한 제주관광공사_비짓제주 관광정보 오픈 (API)을 이용하였으며, 관련 권한은 모두 제주관광공사에
          귀속됩니다.제공하는 자료나 컨텐츠에 대한 무단복제 및 배포를 원칙적으로 금합니다.
        </p>
      </div>
      <div className="mb-3 text-center">
        <p className="text-black1 text-lg font-bold mb-1">출처</p>
        <ul>
          <li className="text-sm text-black1">제주도 관광지, 맛집, 숙소 정보: 제주관광공사_비짓제주 관광정보 오픈 API</li>
          <li className="text-sm text-black1">버스 정류장 정보: 제주데이터허브 - [교통, 안전] 버스 정류소 기본 정보 API</li>
          <li className="text-sm text-black1">지도: Naver Maps & Kakao Maps</li>
          <li className="text-sm text-black1">물때: 바다누리 해양 정보 서비스</li>
          <li className="text-sm text-black1">날씨: OpenWeather API</li>
        </ul>
      </div>
      <div className="text-center mt-5">
        <p className="text-black1 text-xl font-bold mb-2">😍 만든 사람들 😍</p>
        <ul>
          <li>
            <Member content={"이다정(프로젝트 리더/총괄) - 백엔드 파트 담당"} githubURL={"https://github.com/dajeong09"} />
            <Member content={"박세은(프로젝트 부리더) - 프론트엔드 파트 담당"} githubURL={"https://github.com/marksenee"} />
            <Member content={"이수민 - 백엔드 파트 담당"} githubURL={"https://github.com/sooominnn"} />
            <Member content={"임연주 - 프론트엔드 파트 담당"} githubURL={"https://github.com/yeondooo"} />
            <Member content={"김진욱 - 프론트엔드 파트 담당"} githubURL={"https://github.com/sparklaunch"} />
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Credits;
