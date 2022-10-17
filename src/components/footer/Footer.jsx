import { Link } from "react-router-dom";

const Footer = ({ isFixed = false }) => {
  if (isFixed) {
    return (
      <div className="flex flex-col justify-center items-center fixed bottom-5 left-[50%] translate-x-[-50%]">
        <p className="text-gray-500 text-sm">Copyright 2022. 뚜벅하우까 All rights reserved.</p>
        <Link to="/credits" className="text-blue-600 text-sm hover:underline">
          출처 및 저작권자
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center my-5">
        <p className="text-gray-500 text-sm">Copyright 2022. 뚜벅하우까 All rights reserved.</p>
        <Link to="/credits" className="text-blue-600 text-sm hover:underline">
          출처 및 저작권자
        </Link>
      </div>
    );
  }
};

export default Footer;
