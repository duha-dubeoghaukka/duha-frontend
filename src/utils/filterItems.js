export const filterItems = (array, region) => {
  return array.filter(item => {
    switch (region) {
      case "제주시내":
        return item.region === "제주시내";
        break;
      case "애월":
        return item.region === "애월";
        break;
      case "중문":
        return item.region === "중문";
        break;
      case "서귀포":
        return item.region === "서귀포시내";
        break;
      case "우도&성산":
        return item.region === "우도" || item.region === "성산";
        break;
      case "구좌&조천":
        return item.region === "구좌" || item.region === "조천";
        break;
      case "전체":
        return ["제주시내", "애월", "중문", "서귀포시내", "우도", "성산", "구좌", "조천"].includes(item.region);
        break;
      default:
        return false;
        break;
    }
  });
};
