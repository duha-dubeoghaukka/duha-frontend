const processInfo = info => {
  const splitter = (string, title) => {
    if (string.includes(title)) {
      const content = string.split(title)[1];
      return content.split("=====")[0];
    } else {
      return null;
    }
  };
  const detailInfo = splitter(info, "=====상세 정보===");
  const openingHours = splitter(info, "=====이용 시간===");
  const admissionFee = splitter(info, "=====요금 정보===");
  const averageTime = splitter(info, "=====평균 소요 시간===");
  const amenities = splitter(info, "=====편의시설===");
  return {
    detailInfo,
    openingHours,
    admissionFee,
    averageTime,
    amenities
  };
};

export default processInfo;
