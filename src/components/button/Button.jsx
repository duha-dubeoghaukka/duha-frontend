import React from "react";

const Button = ({ buttonStyle, type, text, onClick }) => {
  const roundedButtonClassNames = "bg-green1 hover:bg-grey text-white font-bold py-2 px-10 h-11 w-72 rounded";
  const disabledButtonClassNames = "bg-#ddd hover:bg-black2 text-white font-bold py-2 px-10 h-11 w-72 rounded";

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
