import React, { useCallback } from "react";
import { editTextAction, replaceText } from "../../utils/utilStr";
import MenuBtnsWrap from "../UI/MenuBtnsWrap";
import { sideBtnsData } from "../../constants/sideBtnsFiled";

const SideBtnsFiled = ({ statesVal, fieldId, alwaysOpen }) => {
  const { handleTxt, setHandleTxt } = statesVal;

  const applyActionP = useCallback(
    (action, isIgnore = false) => {
      if (!fieldId) return;
      editTextAction(fieldId, handleTxt, setHandleTxt, action, isIgnore);
    },
    [fieldId, handleTxt, setHandleTxt]
  );

  const replace = (oldV, newV) => {
    const newVal = replaceText(fieldId, handleTxt, oldV, newV);
    setHandleTxt(newVal);
  };
  const replaceQU = (type) => {
    // const newVal = replaceQuotes(handleTxt);
    editTextAction(fieldId, handleTxt, setHandleTxt, type, true);
    // const newVal = replaceQuotesUniversal(handleTxt, type);
    // setHandleTxt(newVal);
  };

  const pasteToText = (val) => {
    editTextAction(fieldId, handleTxt, setHandleTxt, "add", true, val);
  };
  const btnsArr = sideBtnsData({
    applyActionP,
    replace,
    replaceQU,
    pasteToText,
  });

  return (
    <div className="sidebtns-box-field">
      <MenuBtnsWrap alwaysOpen={alwaysOpen} btnsArr={btnsArr} defaultOpen="HOT" />
    </div>
  );
};

export default SideBtnsFiled;
