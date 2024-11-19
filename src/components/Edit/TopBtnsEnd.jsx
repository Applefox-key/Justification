import React, { useState } from "react";
import Hint from "../Hint/Hint";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../../utils/localStorage";
import { copyToClipboard } from "../../utils/utilStr";

import BtnFragm from "./BtnFragm";
import { ImCopy } from "react-icons/im";
import { FaRegPaste } from "react-icons/fa6";
import FormatBtn from "./FormatBtn";
import { usePopup } from "../../hooks/usePopup";
import BtnArchive from "./BtnArchive";

const TopBtnsEnd = ({ fieldid, statesVal, onOK, action = "RAB" }) => {
  const { handleTxt, setHandleTxt, item, setItem } = statesVal;

  const pasteFromClipboard = async () => {
    let start = 0;
    let end = 0;
    const text = await navigator.clipboard.readText();
    let newVal = handleTxt + text;
    const textarea = document.getElementById(fieldid);

    if (textarea !== null) {
      start = textarea.selectionStart;
      end = textarea.selectionEnd;
      newVal = handleTxt.slice(0, start) + text + handleTxt.slice(end);
    }

    setHandleTxt(newVal);
    console.log("paste from clipboard:", text);
  };
  const setPopup = usePopup();
  return (
    <div className="d-flex  align-items-center">
      {" "}
      <div className="topsmallbtns-box">
        <BtnFragm handleTxt={handleTxt} setHandleTxt={setHandleTxt} />
      </div>{" "}
      <Button
        className="btnToHis hintBtn"
        disabled={!handleTxt}
        onClick={(e) => copyToClipboard(handleTxt)}>
        {/* copy */}
        <ImCopy />
      </Button>{" "}
      <Button
        className="btnToHis hintBtn"
        onClick={(e) => pasteFromClipboard()}>
        {/* paste */}
        <FaRegPaste />
      </Button>{" "}
      <BtnArchive txt={item} setTxt={setItem} />
      <Button className="btnToHis" onClick={onOK}>
        OK
      </Button>
    </div>
  );
};

export default TopBtnsEnd;
