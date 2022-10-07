import React from "react";

const Button = ({ buttonStyle, type, text, onClick, width, margin, height }) => {
  const roundedButtonClassNames = "bg-green1 hover:bg-[#B1D7B4] text-white font-bold py-2 px-10 h-11 w-72 rounded";
  const disabledButtonClassNames = `${width} ${margin} ${height} bg-[#B1D7B4] hover:bg-green1 text-white font-bold py-2 px-10 w-72 rounded-lg shadow-md`;

  return (
    <div className="p-1">
      <button
        className={buttonStyle === "rounded" ? roundedButtonClassNames : buttonStyle === "disabled" ? disabledButtonClassNames : null}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
