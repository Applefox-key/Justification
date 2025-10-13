import React from "react";

import { Button } from "react-bootstrap";

import { copyToClipboard, wordCount } from "../../utils/utilStr";

import BtnFragm from "./BtnFragm";
import { ImCopy } from "react-icons/im";
import { FaRegPaste } from "react-icons/fa6";

import { saveToHistorygeneral } from "../../utils/localStorage";
import { AiOutlineClear } from "react-icons/ai";
import { LiaCalculatorSolid } from "react-icons/lia";
import FlowerBtnUniv from "../DimentionsPage/FlowerBtnUniv";
import FormatBtn from "./FormatBtn";

const PageTxtEditBtns = ({ fieldid, statesVal, onOK, action = "RAB" }) => {
  const { handleTxt, setHandleTxt, item } = statesVal;

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
  };

  return (
    <div className="d-flex  align-items-center">
      <FormatBtn
        handleTxt={handleTxt}
        setHandleTxt={setHandleTxt}
        action={action}
      />
      <div className="topsmallbtns-box">
        <BtnFragm handleTxt={handleTxt} setHandleTxt={setHandleTxt} />
      </div>{" "}
      <Button
        className="btnToHis hintBtn"
        disabled={!handleTxt}
        onClick={() => {
          // if (isTxt) setIsTxt(false);
          saveToHistorygeneral({ en: handleTxt, ru: "" });

          setHandleTxt("");
        }}>
        <AiOutlineClear />
      </Button>
      <Button
        className="btnToHis hintBtn"
        disabled={!handleTxt}
        onClick={(e) => copyToClipboard(handleTxt)}>
        <ImCopy />
      </Button>{" "}
      <Button
        className="btnToHis hintBtn"
        onClick={(e) => pasteFromClipboard()}>
        <FaRegPaste />
      </Button>{" "}
      <button
        className="btnToHis hintBtn"
        title="word count"
        onClick={() => wordCount(item[fieldid], fieldid)}>
        <LiaCalculatorSolid />
      </button>{" "}
      <FlowerBtnUniv
        className="hintBtn "
        fieldId={fieldid}
        fieldVal={item[fieldid]}
        setNewVal={setHandleTxt}
      />
      {onOK && (
        <Button className="btnToHis" onClick={onOK}>
          OK
        </Button>
      )}
    </div>
  );
};

export default PageTxtEditBtns;
