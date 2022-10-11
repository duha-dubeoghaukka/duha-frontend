import { useState } from "react";

const useChange = () => {
  const [isChange, setIsChange] = useState(false);
  const handler = () => {
    setIsChange(!isChange);
  };
  return [isChange, handler];
};

export default useChange;
