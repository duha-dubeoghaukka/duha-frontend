const kakaoApiKey = process.env.REACT_APP_API_KAKAO_KEY;
const redirectUri = "https://dduha.site/auth/kakao/callback";
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code`;
