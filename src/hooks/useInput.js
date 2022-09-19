import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return [value, setValue, changeHandler];
};

export default useInput;
