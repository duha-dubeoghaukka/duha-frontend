import { Link } from "react-router-dom";

const Footer = ({ isFixed = false }) => {
  if (isFixed) {
    return (
      <div className="fixed bottom-[80px] md:bottom-5 left-[50%] translate-x-[-50%] w-full">
        <FooterContent />
      </div>
    );
  } else {
    return (
      <div className="mt-5 mb-[80px] md:mb-[20px]">
        <FooterContent />
      </div>
    );
  }
};

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

export default Footer;
