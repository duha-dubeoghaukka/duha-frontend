import Router from "./shared/Router";
import GlobalState from "./shared/GlobalState";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const globalStates = {
    regionSelection: {
      selectedRegion,
      setSelectedRegion
    },
    pageSelection: {
      currentPage,
      setCurrentPage
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
