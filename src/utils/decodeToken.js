import jwt_decode from "jwt-decode";

const decodeToken = token => {
  if (token) {
    const decode_token = jwt_decode(token);
    const array = decode_token.sub.split(":");
    // const platform = array[2] === "null" ? "" : array[2] + "_";
    // return platform + nickName;
    return array[1];
  } else {
    return null;
  }
};

export default decodeToken;
