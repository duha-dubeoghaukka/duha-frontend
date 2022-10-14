import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Spinner;
