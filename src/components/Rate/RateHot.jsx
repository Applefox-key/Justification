import React, { useCallback } from "react";
import RateBoxes from "./RateBoxes";
import { labelsFullVerdictEdit } from "../../utils/analysis";

const RateHot = ({ callback, setIsOpen, isOpen }) => {
  const rateStr = useCallback(
    (i) => (i > -1 ? labelsFullVerdictEdit[i] : ""),
    []
  );
  return (
    <div className="hot-menu">
      <button
        className="square-btn hotBtnGr intense"
        key={"EVAL"}
        onClick={() => setIsOpen(isOpen === "EVAL" ? null : "EVAL")}>
        EVAL
      </button>
      {isOpen === "EVAL" && (
        <RateBoxes
          likert={{
            setNewRate: (e, val) => callback(e, rateStr(val)),
            titleChoosed: "",
          }}
        />
      )}
    </div>
  );
};

export default RateHot;
