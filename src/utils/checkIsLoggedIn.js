import { getCookie } from "../shared/Cookie";

const checkIsLoggedIn = () => {
  const auth = getCookie("authorization");
  return !!auth;
};

export default checkIsLoggedIn;
