const checkIsLoggedIn = () => {
  const auth = sessionStorage.getItem("authorization");
  return !!auth;
};

export default checkIsLoggedIn;
