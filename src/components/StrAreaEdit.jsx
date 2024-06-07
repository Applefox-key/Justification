import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../utils/localStorage";
import { copyToClipboard } from "../utils/utilStr";

import TxtBtns from "./TxtBtns";

const StrAreaEdit = ({ str = "", actionFn, placeholder = "" }) => {
  const [copyBtn, setCopyBtn] = useState("");
  const [handleTxt, setHandleTxt] = useState(str);
  const handleChange = (e) => {
    e.stopPropagation();
    setHandleTxt(e.target.value);
  };
  // const copyToClipboard = async () => {
  //   await copyFromTextarea();
  // };
  const onOK = (e) => {
    e.stopPropagation();
    const val = handleTxt;
    setHandleTxt("");
    if (!!actionFn) actionFn(val);
  };
  const toJustif = (val) => {
    const newVal = val.en;
    const textarea = document.getElementById("editArea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      // No text selected
      const textBefore = handleTxt.slice(0, start);
      const textAfter = handleTxt.slice(end);
      const newText = textBefore + " " + newVal + " " + textAfter;
      setHandleTxt(newText);
      return;
    }

    const textBefore = handleTxt.slice(0, start);
    const textAfter = handleTxt.slice(end);
    const newText = textBefore + newVal + textAfter;

    setHandleTxt(newText);

    // Maintain the cursor position after replacement
    setTimeout(() => {
      textarea.setSelectionRange(start, start + newVal.length);
    }, 0);
  };
  const clickOnPhrase = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText === copyBtn) return;
    setCopyBtn(selectedText);
  };
  return (
    <>
      {" "}
      <Button onClick={() => setHandleTxt("")}>clear</Button>
      <Button
        className="btnToHis"
        onClick={(e) => saveToHistory({ en: handleTxt, ru: "" })}>
        save to history
      </Button>{" "}
      <Button className="btnToHis" onClick={(e) => copyToClipboard(handleTxt)}>
        copy
      </Button>{" "}
      {/* {!!actionFn && <Button onClick={onOK}>OK</Button>}{" "} */}
      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="w-100 h-100">
        <Form.Control
          as="textarea"
          id={"editArea"}
          className={"fit-height"}
          rows={1}
          spellCheck="true"
          placeholder={placeholder}
          value={handleTxt}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") onOK(e);
          }}
          onChange={handleChange}
        />
      </div>
      <TxtBtns toJustif={toJustif} />{" "}
      <Button className="w100" onClick={onOK}>
        OK
      </Button>{" "}
    </>
  );
};

export default StrAreaEdit;
