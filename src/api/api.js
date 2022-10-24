import axios from "axios";
import { getCookie } from "../shared/Cookie";

export const api = axios.create({
  baseURL: "http://13.125.222.172/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,"
  },
  withCredentials: true
});
// 배포 서버 주소 https://dduha.shop

api.interceptors.request.use(function (config) {
  const accessToken = getCookie("authorization");
  config.headers.common["authorization"] = `${accessToken}`;
  return config;
});

export const scheduleAPIs = {
  register: data => {
    return api.post("/auth/trip", data);
  },
  getShareSchedule: () => {
    return api.get("/trip");
  },
  getShareDetailCourse: tripId => {
    return api.get(`/trip/${tripId}`);
  }
};

export const socialLoginAPIs = {
  kakaoLogin: code => {
    return api.get(`/oauth/kakao?code=${code}`);
  },
  googleLogin: code => {
    return api.get(`/oauth/google?code=${code}`);
  }
};

export const mypageAPIs = {
  getFavoritesNum: () => {
    return api.get("/auth/mypage");
  },
  getFavoriteLists: pathVariable => {
    return api.get(`auth/mypage/${pathVariable}/bookmark`);
  },
  postBookMark: id => {
    return api.get("/auth/trip/bookmark/" + id);
  }
};

export const userInfoAPIs = {
  editUserInfo: data => {
    return api.put(`/auth/member/modify`, data);
  },
  deleteUser: data => {
    return api.delete(`/auth/member/delete`, { data: data });
  },
  emailLink: data => {
    return api.post(`/member/emailConfirm`, data);
  },
  findPassword: data => {
    return api.post(`/member/findPassword`, data);
  },
  getUserEmail: data => {
    return api.get(`/member/email?code=${data}`);
  },
  resetPassword: data => {
    return api.post(`/member/resetPassword`, data);
  }
};
