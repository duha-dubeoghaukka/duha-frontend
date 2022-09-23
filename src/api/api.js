import axios from "axios";

export const api = axios.create({
  // baseURL: "  http://localhost:3001/",
  baseURL: "http://43.201.5.53:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,"
  },
  withCredentials: true
});

// 매 실행 시 토큰값 넣기, 없으면 null값이 들어간다
api.interceptors.request.use(function (config) {
  const refreshToken = localStorage.getItem("refresh-Token");
  const accessToken = localStorage.getItem("authorization");
  config.headers.common["authorization"] = `${accessToken}`;
  config.headers.common["refresh-token"] = `${refreshToken}`;
  return config;
});

export const scheduleAPIs = {
  register: data => {
    return api.post("/auth/trip", data);
  },
  getRegisterInfo: () => {
    return api.get("/auth/trip");
  }
};

export const instance = axios.create({
  baseURL: "http://43.201.5.53:8080/",
  headers: {
    "Content-Type": "application/json"
  }
});
