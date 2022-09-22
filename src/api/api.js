import axios from "axios";

const api = axios.create({
  // baseURL: "  http://localhost:3001/",
  baseURL: "http://43.201.5.53:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,"
  },
  withCredentials: true
});

export const scheduleAPIs = {
  register: data => {
    return api.post("/auth/trip", data);
  },
  getRegisterInfo: () => {
    return api.get("/auth/trip");
  }
};
