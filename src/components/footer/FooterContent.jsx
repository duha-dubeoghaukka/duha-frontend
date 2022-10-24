import { Link } from "react-router-dom";

const FooterContent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-gray-500 text-xs md:text-sm">Copyright 2022. 뚜벅하우까 All rights reserved.</p>
      <Link to="/credits" className="text-blue-600 text-xs md:text-sm hover:underline">
        출처 및 저작권자
      </Link>
    </div>
  );
};

export default FooterContent;
