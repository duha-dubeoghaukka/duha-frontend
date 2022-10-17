import { useQuery } from "react-query";
import { api } from "../../../api/api";
import Spinner from "../../../components/Spinner/Spinner";
import CallTaxiItem from "./CallTaxiItem";

const CallTaxi = () => {
  const { isLoading, data, error } = useQuery("callTaxis", () => {
    return api.get("/information", {
      params: {
        category: "콜택시"
      }
    });
  });
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
        {callTaxis.map(taxi => {
          return <CallTaxiItem key={taxi.name} data={taxi} />;
        })}
      </div>
    );
  }
};

export default CallTaxi;
