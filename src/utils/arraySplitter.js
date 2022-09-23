const ITEMS_PER_PAGE = 10;

export const arraySplitter = original => {
  const array = [...original];
  let result = [];
  for (let i = 0; i < array.length; i += ITEMS_PER_PAGE) {
    if (i + ITEMS_PER_PAGE >= array.length) {
      result.push(array.slice(i));
    } else {
      result.push(array.slice(i, i + ITEMS_PER_PAGE));
    }
  }
  return result;
};
