import Router from "./shared/Router";
import GlobalState from "./shared/GlobalState";
import { useState } from "react";

function App() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const globalStates = {
    selectedRegion: {
      selectedRegion,
      setSelectedRegion
    }
  };
  return (
    <GlobalState.Provider value={globalStates}>
      <Router />
    </GlobalState.Provider>
  );
}

export default App;
