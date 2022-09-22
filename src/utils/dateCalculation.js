export const DateCalculation = date => {
  let arrayToDate = date.split("/").map(Number);
  let year = arrayToDate[0];
  let month = arrayToDate[1];
  let day = arrayToDate[2];
  let newDate = new Date(year, month, day);
  return newDate;
};

export const DateDiff = (startDate, endDate) => {
  let getDateTime = endDate.getTime() - startDate.getTime();
  let getDiffDay = getDateTime / (1000 * 60 * 60 * 24);
  let getAddDay = getDiffDay + 1;
  return [getDiffDay, getAddDay];
};
