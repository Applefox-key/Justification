import React from "react";
import { labelsVerdict, labelsVerdictEdit } from "../../utils/analysis";

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
        <div className="header-fin">
          <div className="final-rate">
            {labelsVerdict.map((el, i) => (
              <div
                onClick={() => callback(labelsVerdictEdit[i])}
                title={labelsVerdictEdit[i]}
                className={`rate rate${i + 1} `}>
                {el[0]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RateHot;
