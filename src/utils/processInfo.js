const processInfo = info => {
  let information = info;
  const result = [];
  while (information.includes("=====")) {
    const segment = information.split("=====")[1];
    const title = segment.split("===")[0];
    const fraction = information.split("===")[2];
    const content = fraction.split("=====")[0];
    result.push({
      title,
      content
    });
    const splitPoint = information.indexOf(content);
    information = information.slice(splitPoint);
  }
  return result;
};

export default processInfo;
