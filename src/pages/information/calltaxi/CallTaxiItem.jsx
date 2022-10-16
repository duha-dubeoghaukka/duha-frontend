import PhoneIcon from "@mui/icons-material/Phone";

const CallTaxiItem = ({ data }) => {
  const { name, address } = data;
  const makePhoneCall = () => {
    window.location.href = "tel:" + address;
  };
  return (
    <div className="border-green1 border-2 rounded-lg mb-3 p-3 flex justify-between items-center">
      <div>
        <p className="text-black1 font-bold">{name}</p>
        <p className="text-black1 text-sm">{address}</p>
      </div>
      <div className="cursor-pointer">
        <PhoneIcon fontSize="large" sx={{ color: "rgb(116, 174, 115)" }} className="hover:brightness-90" onClick={makePhoneCall} />
      </div>
    </div>
  );
};

export default CallTaxiItem;
