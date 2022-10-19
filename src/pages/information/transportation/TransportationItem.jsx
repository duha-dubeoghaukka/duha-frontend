const TransportationItem = ({ transportation }) => {
  const { title, address, description, imageURL } = transportation;
  return (
    <a
      className="border-2 border-green1 rounded-lg mb-3 p-3 grid md:grid-cols-[1fr_160px] cursor-pointer hover:brightness-75"
      href={address}
      target="_blank"
    >
      <div className="grid gap-1">
        <p className="text-black1 font-bold text-lg">{title}</p>
        <p className="text-black1 text-sm">{description}</p>
        <p className="text-gray-500 text-sm">{address}</p>
      </div>
      <div className="ml-3 hidden md:block">
        <img src={imageURL} alt={title} className="rounded-lg h-full object-cover" />
      </div>
    </a>
  );
};

export default TransportationItem;
