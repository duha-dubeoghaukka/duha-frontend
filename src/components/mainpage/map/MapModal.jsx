import Map from "../../../pages/detailpage/mappage/Map";

const MapModal = ({ backdropClickHandler, latitude, longitude, name, setIsMapModalOpen }) => {
  return (
    <div>
      <div className="fixed top-0 left-0 z-20 w-[100vw] h-[100vh] bg-black1 opacity-50" onClick={backdropClickHandler}></div>
      <div className="fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-lg">
        <Map latitude={latitude} longitude={longitude} name={name} setIsMapModalOpen={setIsMapModalOpen} />
      </div>
    </div>
  );
};

export default MapModal;
