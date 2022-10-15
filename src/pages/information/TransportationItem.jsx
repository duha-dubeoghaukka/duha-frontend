const TransportationItem = ({ data }) => {
  const { name, address } = data;
  return <div>{name}</div>;
};

export default TransportationItem;
