import { deleteCookie } from "../shared/Cookie";

export const logout = () => {
  deleteCookie("authorization");
  deleteCookie("refresh-token");
};
