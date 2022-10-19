import { Cookies } from "react-cookie";

const cookies = new Cookies();

/*---쿠키 설정(하루)--- */
export const setCookie = (name, value) => {
  return cookies.set(name, value, {
    path: "/",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
};

export const getCookie = name => {
  return cookies.get(name);
};

export const deleteCookie = name => {
  return cookies.remove(name, { path: "/" });
};
