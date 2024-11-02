import React, { act, useState } from "react";
import Hint from "../Hint/Hint";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../../utils/localStorage";
import {
  applyAction,
  copyToClipboard,
  numIsteadLetter,
  replaceWords,
  replaceWordsInteractions,
} from "../../utils/utilStr";

import BtnFragm from "./BtnFragm";
import { PiSquareHalfDuotone } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { ImCopy } from "react-icons/im";
import { FaRegPaste } from "react-icons/fa6";
import FormatBtn from "./FormatBtn";

const TopBtns = ({ fieldid, statesVal, onOK, action = "RAB" }) => {
  const { handleTxt, setHandleTxt, isTxt, setIsTxt } = statesVal;
  const [autohis, setAutohis] = useState(true);

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
  const respOrder = (e) => {
    const newVal = replaceWords(handleTxt);
    setHandleTxt(newVal);
  };

  return (
    <>
      <Hint />{" "}
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
      <div className="his-auto">
        <Form.Check
          size="sm"
          className="autocheckhis"
          checked={autohis}
          type="checkbox"
          id="inputHis"
          onChange={() => setAutohis(!autohis)}
        />
        <Button
          className="btnToHis"
          disabled={!handleTxt}
          onClick={(e) => saveToHistory({ en: handleTxt, ru: "" })}>
          to history{" "}
        </Button>{" "}
      </div>
      <Button
        disabled={!handleTxt}
        onClick={() => {
          if (isTxt) setIsTxt(false);
          if (autohis) saveToHistory({ en: handleTxt, ru: "" });
          setHandleTxt("");
        }}>
        clear
      </Button>
      <FormatBtn
        handleTxt={handleTxt}
        setHandleTxt={setHandleTxt}
        action={action}
      />
      <Button className="btnToHis" onClick={onOK}>
        OK
      </Button>{" "}
      <div className="topsmallbtns-box">
        <BtnFragm handleTxt={handleTxt} setHandleTxt={setHandleTxt} />
      </div>
    </>
  );
};

export default TopBtns;
