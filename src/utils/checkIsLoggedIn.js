const checkIsLoggedIn = () => {
  const auth = localStorage.getItem("authorization");
  return !!auth;
};

export default checkIsLoggedIn;
