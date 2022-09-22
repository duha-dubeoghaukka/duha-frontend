import axios from "axios";

const api = axios.create({
  baseURL: "  http://localhost:3001/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,"
  },
  withCredentials: true
});

export const scheduleAPIs = {
  register: data => {
    return api.post("schedule", data);
  }
};
