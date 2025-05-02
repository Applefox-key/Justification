import React from "react";

import { Button } from "react-bootstrap";

import { copyToClipboard } from "../../utils/utilStr";

import BtnFragm from "./BtnFragm";
import { ImCopy } from "react-icons/im";
import { FaRegPaste } from "react-icons/fa6";

import BtnArchive from "./BtnArchive";
import RubArchive from "../Rubrics/RubArchive";
import { defaultRubJust } from "../../constants/textParts";

const TopBtnsEnd = ({ fieldid, statesVal, onOK, action = "RAB" }) => {
  const { handleTxt, setHandleTxt, item, setItem, type } = statesVal;

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
      <div className="topsmallbtns-box">
        <BtnFragm handleTxt={handleTxt} setHandleTxt={setHandleTxt} />
      </div>{" "}
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
      {type === "RUB" ? (
        <RubArchive
          txt={item}
          setTxt={(val) => {
            console.log({ ...defaultRubJust, val });

            setItem({ ...defaultRubJust, ...val });
          }}
        />
      ) : (
        <BtnArchive txt={item} setTxt={setItem} type={type} />
      )}
      <Button className="btnToHis" onClick={onOK}>
        OK
      </Button>
    </div>
  );
};

export default TopBtnsEnd;
