const googleApiKey = process.env.REACT_APP_API_GOOGLE_KEY;
const redirectUri = "https://dduha.site/auth/google/callback";
export const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleApiKey}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
