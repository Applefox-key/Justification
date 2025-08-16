import React from "react";

import {
  replaceQuotes,
  replaceQuotes3,
  replaceText,
} from "../../utils/utilStr";
import { GrBlockQuote } from "react-icons/gr";

const BtnReplace = ({ fieldid, handleTxt, setHandleTxt }) => {
  const replace = (oldV, newV) => {
    const newVal = replaceText(fieldid, handleTxt, oldV, newV);
    setHandleTxt(newVal);
  };
  const replaceQ = () => {
    const newVal = replaceQuotes(handleTxt);
    setHandleTxt(newVal);
  };
  const replaceQQ = () => {
    const newVal = replaceQuotes3(handleTxt);
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
        onClick={replaceQ}>
        «»
      </button>{" "}
      <button
        className="square-btn intense btn-replace"
        title="replace quotes"
        disabled={!handleTxt}
        onClick={replaceQQ}>
        <GrBlockQuote />
      </button>
    </>
  );
};

export default BtnReplace;
