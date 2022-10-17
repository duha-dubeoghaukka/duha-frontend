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
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const callTaxis = data.data.data[0].info;
    const filteredTaxis = callTaxis.filter(callTaxi => {
      if (currentRegion === "전체") {
        return true;
      } else {
        return currentRegion.includes(callTaxi.region);
      }
    });
    return (
      <div>
        <div className="flex justify-around mb-5">
          {regionNames.map(region => {
            return (
              <CallTaxiRegionButton
                key={region.name}
                regionName={region.name}
                isActive={currentRegion === region.name}
                setCurrentRegion={setCurrentRegion}
              />
            );
          })}
        </div>
        <div className="mb-3">
          <p className="text-black1 font-bold">총 {filteredTaxis.length} 건이 검색되었습니다.</p>
        </div>
        <div>
          {filteredTaxis.map(taxi => {
            return <CallTaxiItem key={taxi.name} data={taxi} />;
          })}
        </div>
      </div>
    );
  }
};

export default CallTaxi;
