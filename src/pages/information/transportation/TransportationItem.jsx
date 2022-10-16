const TransportationItem = ({ transportation }) => {
  const { title, address, description, imageURL } = transportation;
  // --- Front-End의 CORS 에러의 이유로 Hard-Coding ---
  // const { isLoading, error, data } = useQuery(name, () => {
  //   return axios.get(`https://cors-anywhere.herokuapp.com/${address}`);
  // });
  // if (isLoading) {
  //   return <Spinner />;
  // }
  // if (error) {
  //   return <div>{error}</div>;
  // }
  // if (data) {
  // const stringHTML = data.data;
  // const html = parser(stringHTML);
  // const tags = html.props.children[0].props.children;
  // const metaTags = tags.filter(tag => {
  //   return tag.props?.property?.includes("og") || tag.props?.property === "description";
  // });
  // let metaData;
  // if (metaTags.length === 0) {
  // } else {
  //   metaData = metaTags.map(tag => {
  //     const property = tag.props.property;
  //     let title;
  //     if (property.includes(":")) {
  //       title = tag.props.property.split(":")[1];
  //     } else {
  //       title = tag.props.property;
  //     }
  //     const content = tag.props.content;
  //     return { title, content };
  //   });
  // }
  return (
    <div
      className="border-2 border-green1 rounded-lg mb-3 p-3 grid md:grid-cols-[1fr_160px] cursor-pointer hover:brightness-75"
      onClick={() => {
        window.location.href = address;
      }}
    >
      <div className="grid gap-1">
        <p className="text-black1 font-bold text-lg">{title}</p>
        <p className="text-black1 text-sm">{description}</p>
        <p className="text-gray-500 text-sm">{address}</p>
      </div>
      <div className="ml-3 hidden md:block">
        <img src={imageURL} alt={title} className="rounded-lg h-full object-cover" />
      </div>
    </div>
  );
};

export default TransportationItem;
