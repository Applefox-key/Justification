import React from "react";

import { replaceText } from "../../utils/utilStr";

const BtnReplace = ({ fieldid, handleTxt, setHandleTxt }) => {
  const replace = (oldV, newV) => {
    const newVal = replaceText(fieldid, handleTxt, oldV, newV);
    setHandleTxt(newVal);
  };
  const replaceQuotes = () => {
    let isOpening = true;

    const newVal = handleTxt.replace(/"/g, () => {
      if (isOpening) {
        isOpening = false;
        return "«";
      } else {
        isOpening = true;
        return "»";
      }
    });
    setHandleTxt(newVal);
  };
  return (
    <>
      <button
        className="square-btn intense btn-replace"
        title="replace dash"
        disabled={!handleTxt}
        onClick={() => replace("-", "—")}>
        -
      </button>{" "}
      <button
        className="square-btn intense btn-replace"
        title="replace quotes"
        disabled={!handleTxt}
        onClick={replaceQuotes}>
        «»
      </button>
    </>
  );
};

export default BtnReplace;
