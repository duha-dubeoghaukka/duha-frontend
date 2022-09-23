export const removeDuplicates = array => {
  let duplicates = [];
  return array.filter(item => {
    const name = item.name;
    if (duplicates.includes(name)) {
      return false;
    } else {
      duplicates.push(name);
      return true;
    }
  });
};
