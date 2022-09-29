const updateLocalStorage = (id, isBookmarked) => {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    const parsed = JSON.parse(bookmarks);
    const foundItem = parsed.find(item => {
      return item.id === id;
    });
    if (foundItem) {
      const reflected = parsed.map(item => {
        if (item.id === id) {
          item.isBookmarked = isBookmarked;
        }
        return item;
      });
      const encoded = JSON.stringify(reflected);
      localStorage.setItem("bookmarks", encoded);
    } else {
      const newItem = {
        id,
        isBookmarked
      };
      parsed.push(newItem);
      const encoded = JSON.stringify(parsed);
      localStorage.setItem("bookmarks", encoded);
    }
  } else {
    const firstItem = {
      id,
      isBookmarked
    };
    const encoded = JSON.stringify([firstItem]);
    localStorage.setItem("bookmarks", encoded);
  }
};

export default updateLocalStorage;
