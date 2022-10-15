const CallTaxiItem = ({ data }) => {
  const { name, address } = data;
  return <div>{address}</div>;
};

export default CallTaxiItem;
