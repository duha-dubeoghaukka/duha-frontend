import porterMapper from "../../../utils/porterMapper";

const PorterItem = ({ data }) => {
  const { name, address } = data;
  return (
    <a
      className="border-green1 border-2 rounded-lg mb-3 p-3 py-5 cursor-pointer hover:brightness-75 flex justify-between items-center"
      href={address}
      target="_blank"
    >
      <div className="flex-shrink-0">
        <p className="text-black1 font-bold">{name}</p>
        <p className="text-gray-500 text-sm">{address}</p>
      </div>
      <img src={porterMapper(name)} alt={name} className="h-[50px] object-contain overflow-hidden" />
    </a>
  );
};

export default PorterItem;
