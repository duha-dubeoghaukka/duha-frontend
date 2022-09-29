const useCounter = () => {
  let counter = 0;
  const increaseCount = () => {
    counter += 1;
  };
  return [counter, increaseCount];
};

export default useCounter;
