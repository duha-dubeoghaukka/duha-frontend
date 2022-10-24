export const getCode = () => {
  let params = new URL(document.URL).searchParams;
  return params.get("code");
};
