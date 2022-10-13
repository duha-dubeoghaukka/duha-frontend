export const logout = () => {
  localStorage.removeItem("authorization");
  localStorage.removeItem("refresh-token");
};
