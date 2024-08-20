import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import ImgBox from "../ImgBox";
const MainBtns = () => {
  return (
    <div className="d-flex">
      <div className="backgr">
        <ImgBox />
        {/* <IoIosImages onClick={() => setBackgroundAndSave(1)} /> */}
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default MainBtns;
