export const logout = () => {
  sessionStorage.removeItem("authorization");
  sessionStorage.removeItem("refresh-token");
};
