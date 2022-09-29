import TouristSpotsPage from "./TouristSpotsPage";
import { useEffect, useState } from "react";

const TouristSpotsPageContainer = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.dir("Counter increased to " + counter);
  }, [counter]);
  return (
    <div>
      <TouristSpotsPage counter={counter} setCounter={setCounter} />
    </div>
  );
};

export default TouristSpotsPageContainer;
