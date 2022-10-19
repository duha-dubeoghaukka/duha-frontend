import { getCookie } from "../shared/Cookie";

export const routingLoginPage = navigate => {
  const token = getCookie("authorization");

  if (!token) {
    alert("로그인이 필요한 서비스입니다!");
    return navigate(`/login`);
  }
};
