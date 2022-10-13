export const getCode = () => {
  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  return code;
};
