import { useQuery } from "react-query";
import { api } from "../../../api/api";
import Spinner from "../../../components/Spinner/Spinner";
import CallTaxiItem from "./CallTaxiItem";
import regionNames from "../../../utils/regionNames";
import CallTaxiRegionButton from "../../../components/information/CallTaxiRegionButton";
import { useState } from "react";

const CallTaxi = () => {
  const { isLoading, data, error } = useQuery("callTaxis", () => {
    return api.get("/information", {
      params: {
        category: "콜택시"
      }
    });
  });
  const [currentRegion, setCurrentRegion] = useState("전체");
  const regionClickHandler = () => {};
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const callTaxis = data.data.data[0].info;
    return (
      <div>
        <div className="flex justify-around mb-5">
          {regionNames.map(region => {
            return (
              <CallTaxiRegionButton regionName={region.name} isActive={region.name === currentRegion} setCurrentRegion={setCurrentRegion} />
            );
          })}
        </div>
        <div>
          {callTaxis.map(taxi => {
            return <CallTaxiItem key={taxi.name} data={taxi} />;
          })}
        </div>
      </div>
    );
  }
};

export default CallTaxi;
