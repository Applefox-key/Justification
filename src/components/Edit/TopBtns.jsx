import React, { useState } from "react";
import Hint from "../Hint/Hint";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../../utils/localStorage";
import { copyToClipboard, replaceWords } from "../../utils/utilStr";
import BtnFontSize from "./BtnFontSize";
import { TbTxt } from "react-icons/tb";
const TopBtns = ({ handleTxt, setHandleTxt, isTxt, setIsTxt, onOK }) => {
  const [autohis, setAutohis] = useState(true);
  const pasteFromClipboard = async () => {
    let start = 0;
    let end = 0;
    const text = await navigator.clipboard.readText();
    let newVal = handleTxt + text;
    const textarea = document.getElementById("editArea");

    if (textarea !== null) {
      start = textarea.selectionStart;
      end = textarea.selectionEnd;
      newVal = handleTxt.slice(0, start) + text + handleTxt.slice(end);
    }

    setHandleTxt(newVal);
    console.log("paste from clipboard:", text);
  };
  return (
    <>
      {/* <TxtBtnsOverlay
        toJustif={(val) => voiceToEdit(val, handleTxt, setHandleTxt)}
        edit
      /> */}
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
          const newVal = replaceWords(handleTxt);
          setHandleTxt(newVal);
        }}>
        FORMAT (F2)
      </Button>
      <Button className="btnToHis" onClick={onOK}>
        OK
      </Button>
      {handleTxt && (
        <>
          <BtnFontSize />
          <button
            id="setIsTxt"
            className={
              isTxt ? "square-btn intense isTxtAct" : "square-btn intense"
            }
            title="add from voice text area"
            onClick={() => setIsTxt(!isTxt)}>
            <TbTxt />
          </button>
        </>
      )}
    </>
  );
};

export default TopBtns;
