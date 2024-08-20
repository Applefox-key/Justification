import React from "react";

import ImgBox from "../ImgBack/ImgBox";
import ThemeSwitch from "../UI/ThemeSwitch";
const MainBtns = () => {
  return (
    <div className="d-flex">
      <div className="backgr">
        <ImgBox />
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default MainBtns;
