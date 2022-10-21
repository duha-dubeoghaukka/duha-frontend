import { useQuery } from "react-query";
import { api } from "../../../api/api";
import TransportationItem from "./TransportationItem";
import transportations from "../../../utils/transportations";
import NonLayoutSpinner from "../../../components/Spinner/NonLayoutSpinner";

const Transportation = () => {
  const { isLoading, data, error } = useQuery("transportations", () => {
    return api.get("/information", {
      params: {
        category: "대중교통"
      }
    });
  });
  if (isLoading) {
    return <NonLayoutSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    // const transportations = data.data.data[0].info;
    return (
      <div>
        {transportations.map(transportation => {
          return <TransportationItem key={transportation.title} transportation={transportation} />;
        })}
      </div>
    );
  }
};

export default Transportation;
