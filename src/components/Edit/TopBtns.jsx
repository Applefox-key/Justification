import React, { useState } from "react";
import Hint from "../Hint/Hint";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../../utils/localStorage";
import {
  copyToClipboard,
  numIsteadLetter,
  replaceWords,
  replaceWordsInteractions,
} from "../../utils/utilStr";

import BtnFragm from "./BtnFragm";
import { PiSquareHalfDuotone } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";

const TopBtns = ({ fieldid, statesVal, onOK }) => {
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
      <Hint />
      <div className="his-auto">
        <Form.Check
          size="sm"
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
      <Button
        className="btnToHis"
        disabled={!handleTxt}
        onClick={(e) => copyToClipboard(handleTxt)}>
        copy
      </Button>{" "}
      <Button className="btnToHis" onClick={(e) => pasteFromClipboard()}>
        paste
      </Button>{" "}
      <Button
        className="btnToHis"
        onClick={(e) => {
          numIsteadLetter(handleTxt, setHandleTxt);
          // const newVal = replaceWords(handleTxt);
          // setHandleTxt(newVal);
        }}>
        FORMAT (F2)
      </Button>
      <Button className="btnToHis" onClick={onOK}>
        OK
      </Button>{" "}
      <div className="topsmallbtns-box">
        <BtnFragm handleTxt={handleTxt} setHandleTxt={setHandleTxt} />
        <button
          className="square-btn intense"
          title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
          onClick={respOrder}>
          <PiSquareHalfDuotone />
        </button>
        <button
          className="square-btn intense"
          title="INTERACTIONS: remove extra spaces, capitalize all sentences, correct names of INTERACTIONS"
          onClick={(e) => {
            const newVal = replaceWordsInteractions(handleTxt);
            setHandleTxt(newVal);
          }}>
          <IoChatbubblesOutline />
        </button>
        <button
          className="square-btn intense"
          title="@RESPONSES: A B -> 1 2"
          onClick={() => numIsteadLetter(handleTxt, setHandleTxt)}>
          @
        </button>
      </div>
    </>
  );
};

export default TopBtns;
