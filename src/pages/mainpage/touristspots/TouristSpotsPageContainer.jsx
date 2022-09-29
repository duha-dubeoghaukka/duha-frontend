import TouristSpotsPage from "./TouristSpotsPage";
import { useState } from "react";

const TouristSpotsPageContainer = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <TouristSpotsPage counter={counter} setCounter={setCounter} />
    </div>
  );
};

export default TouristSpotsPageContainer;
