export const routingLoginPage = navigate => {
  const token = sessionStorage.getItem("authorization");

  if (!token) {
    alert("로그인이 필요한 서비스입니다!");
    return navigate(`/login`);
  }
};
