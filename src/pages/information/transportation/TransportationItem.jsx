import { useQuery } from "react-query";
import axios from "axios";
import Spinner from "../../../components/Spinner/Spinner";
import parser from "html-react-parser";

const TransportationItem = ({ transportation }) => {
  const { name, address } = transportation;
  const { isLoading, error, data } = useQuery(name, () => {
    return axios.get(`https://cors-anywhere.herokuapp.com/${address}`);
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    const stringHTML = data.data;
    const html = parser(stringHTML);
    const tags = html.props.children[0].props.children;
    const metaTags = tags.filter(tag => {
      return tag.props?.property?.includes("og") || tag.props?.property === "description";
    });
    let metaData;
    if (metaTags.length === 0) {
    } else {
      metaData = metaTags.map(tag => {
        const property = tag.props.property;
        let title;
        if (property.includes(":")) {
          title = tag.props.property.split(":")[1];
        } else {
          title = tag.props.property;
        }
        const content = tag.props.content;
        return { title, content };
      });
    }
    console.dir(metaData);
    return (
      <div>
        <p>{name}</p>
        <p>{address}</p>
      </div>
    );
  }
};

export default TransportationItem;
