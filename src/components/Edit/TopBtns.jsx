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

const TopBtns = ({ fieldid, statesVal, onOK, action = "RAB" }) => {
  const { handleTxt, setHandleTxt, isTxt, setIsTxt, item, setItem } = statesVal;
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
  const setPopup = usePopup();
  return (
    <>
      <Hint />
      {/* <Button
        className="btnToHis hintBtn"
        disabled={!handleTxt}
        onClick={(e) => copyToClipboard(handleTxt)}>
        <ImCopy />
      </Button>
      <Button
        className="btnToHis hintBtn"
        onClick={(e) => pasteFromClipboard()}>
        <FaRegPaste />
      </Button> */}
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
          onClick={(e) => {
            saveToHistory({ en: handleTxt, ru: "" });
            setPopup("info has been added to the history");
          }}>
          to history{" "}
        </Button>{" "}
      </div>
      <Button
        className="btnToHis"
        disabled={!handleTxt}
        onClick={() => {
          if (isTxt) setIsTxt(false);
          if (autohis) saveToHistory({ en: handleTxt, ru: "" });
          setPopup("info has been added to the history");
          setHandleTxt("");
        }}>
        clear
      </Button>
      <FormatBtn
        handleTxt={handleTxt}
        setHandleTxt={setHandleTxt}
        action={action}
      />
      {/* <div className="topsmallbtns-box">
        <BtnFragm handleTxt={handleTxt} setHandleTxt={setHandleTxt} />
      </div>{" "} */}
    </>
  );
};

export default TopBtns;
