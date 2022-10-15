import { useQuery } from "react-query";
import { api } from "../../../api/api";
import Spinner from "../../../components/Spinner/Spinner";
import TransportationItem from "./TransportationItem";

const Transportation = () => {
  const { isLoading, data, error } = useQuery("transportations", () => {
    return api.get("/information", {
      params: {
        category: "대중교통"
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
    const transportations = data.data.data[0].info;
    return (
      <div>
        {transportations.map(transportation => {
          return <TransportationItem key={transportation.name} data={transportation} />;
        })}
      </div>
    );
  }
};

export default Transportation;
