import { useQuery } from "react-query";
import { api } from "../../../api/api";
import PorterItem from "./PorterItem";
import NonLayoutSpinner from "../../../components/Spinner/NonLayoutSpinner";

const Porter = () => {
  const { isLoading, data, error } = useQuery("porters", () => {
    return api.get("/information", {
      params: {
        category: "짐배달"
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
    const porters = data.data.data[0].info;
    return (
      <div>
        {porters.map(porter => {
          return <PorterItem key={porter.name} data={porter} />;
        })}
      </div>
    );
  }
};

export default Porter;
