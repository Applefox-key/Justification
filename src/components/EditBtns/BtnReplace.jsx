import React from "react";

import { editTextAction, replaceQuotesUniversal, replaceText } from "../../utils/utilStr";
import { GrBlockQuote } from "react-icons/gr";

const BtnReplace = ({ fieldid, handleTxt, setHandleTxt }) => {
  const replace = (oldV, newV) => {
    const newVal = replaceText(fieldid, handleTxt, oldV, newV);
    setHandleTxt(newVal);
  };

  const replaceQU = (type) => {
    // editTextAction(fieldid, handleTxt, setHandleTxt, type);
    // const newVal = replaceQuotes(handleTxt);
    const newVal = replaceQuotesUniversal(handleTxt, type);
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
        onClick={() => replaceQU("guillemet")}>
        «»
      </button>{" "}
      <button
        className="square-btn intense btn-replace"
        title="replace quotes"
        disabled={!handleTxt}
        onClick={() => replaceQU("straight")}>
        <GrBlockQuote />
      </button>
    </>
  );
};

export default BtnReplace;
