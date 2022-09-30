import jwt_decode from "jwt-decode";

const decodeToken = token => {
  if (token) {
    const decode_token = jwt_decode(token);
    const email = decode_token.sub;
    const nickName = email.split("@")[0];
    return nickName;
  } else {
    return null;
  }
};

export default decodeToken;
