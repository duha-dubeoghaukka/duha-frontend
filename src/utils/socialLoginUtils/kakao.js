const kakaoApiKey = process.env.REACT_APP_API_KAKAO_KEY;
const redirectUri = "http://43.201.5.53:8080/oauth/kakao";
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code&prompt=login`;
