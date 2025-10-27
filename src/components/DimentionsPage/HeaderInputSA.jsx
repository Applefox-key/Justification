import React from "react";

const HeaderInputSA = ({ title, btns }) => {
  return (
    <div className="header-inputSa">
      <span>{title}</span>
      {btns}
    </div>
  );
};

export default HeaderInputSA;
