import React from "react";
import RateBoxes from "./RateBoxes";

const RateHot = ({ callback, setIsOpen, isOpen }) => {
  return (
    <div className="hot-menu">
      <button
        className="square-btn hotBtnGr intense"
        key={"EVAL"}
        onClick={() => setIsOpen(isOpen === "EVAL" ? null : "EVAL")}>
        EVAL
      </button>
      {isOpen === "EVAL" && (
        <RateBoxes callback={(val) => callback(val.title)} />
      )}
    </div>
  );
};

export default RateHot;
