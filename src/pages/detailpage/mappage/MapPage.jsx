import Layout from "../../../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { instance } from "../../../api/api";
import Spinner from "../../../components/Spinner/Spinner";
import Map from "./Map";
import WestIcon from "@mui/icons-material/West";

const MapPage = () => {
  const { category, id } = useParams();
  const { isLoading, error, data } = useQuery(["map"], () => {
    switch (category) {
      case "spots":
        return instance.get("/touristspot/" + id);
        break;
      case "restaurants":
        return instance.get("/restaurant/" + id);
        break;
    }
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const { address, id } = data.data.data;
    return (
      <Layout isLoggedIn={false} title="지도 상세 보기" highlight="mainpage/spots">
        <Link to={`/spots/${id}`} className="flex items-center mb-3">
          <WestIcon className="mr-3" />
          <p className="text-[16px] text-black1">뒤로 가기</p>
        </Link>
        <p className="text-black1 text-[16px] mb-3">{address}</p>
        <Map address={address} />
      </Layout>
    );
  }
};

export default MapPage;
