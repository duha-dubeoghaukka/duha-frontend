import Router from "./shared/Router";
import GlobalState from "./shared/GlobalState";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useCounter from "./hooks/useCounter";

const queryClient = new QueryClient();

function App() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [currentSpotPage, setCurrentSpotPage] = useState(1);
  const [currentRestaurantPage, setCurrentRestaurantPage] = useState(1);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [counter, increaseCounter] = useCounter();
  const globalStates = {
    regionSelection: {
      selectedRegion,
      setSelectedRegion
    },
    spotPageSelection: {
      currentSpotPage,
      setCurrentSpotPage
    },
    restaurantPageSelection: {
      currentRestaurantPage,
      setCurrentRestaurantPage
    },
    mapModal: {
      isMapModalOpen,
      setIsMapModalOpen
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalState.Provider value={globalStates}>
        <Router />
      </GlobalState.Provider>
    </QueryClientProvider>
  );
}

export default App;
