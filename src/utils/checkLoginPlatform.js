import jwt_decode from "jwt-decode";

const checkLoginPlatform = token => {
  if (token) {
    const decode_token = jwt_decode(token);
    const array = decode_token.sub.split(":");
    return array[2];
  } else {
    return null;
  }
};

export default checkLoginPlatform;
