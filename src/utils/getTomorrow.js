const getTomorrow = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.getDate();
};

export default getTomorrow;
