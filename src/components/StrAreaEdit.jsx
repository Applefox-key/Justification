import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../utils/localStorage";
import { copyToClipboard } from "../utils/utilStr";

import TxtBtns from "./TxtBtns";

const StrAreaEdit = ({ str = "", actionFn, placeholder = "" }) => {
  const [textSelected, setTextSelected] = useState("");
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

  const capsSwitch = (action) => {
    const textarea = document.getElementById("editArea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      return; // No text selected
    }

    const selectedText = handleTxt.slice(start, end);
    let resultText = "";
    if (action === "Aa")
      resultText = selectedText.replace(/\b\w/g, (char) => char.toUpperCase());
    else if (action === "aa")
      resultText = selectedText.replace(/\b\w/g, (char) => char.toLowerCase());
    else if (action === "AA") resultText = selectedText.toUpperCase();
    const newText =
      handleTxt.slice(0, start) + resultText + handleTxt.slice(end);

    setHandleTxt(newText);
    textarea.setSelectionRange(start, start + resultText.length);
  };
  const delSelected = () => {
    const textarea = document.getElementById("editArea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      return; // No text selected
    }

    const newText = handleTxt.slice(0, start) + handleTxt.slice(end);
    setHandleTxt(newText);
    textarea.setSelectionRange(start, start);
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
    const newText = textBefore + " " + newVal + " " + textAfter;

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

    if (selectedText === textSelected) return;
    setTextSelected(selectedText);
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
        <div className="d-flex h-100 justify-content-start">
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
          {textSelected && (
            <div className="d-flex flex-column ms-1">
              <button onClick={() => capsSwitch("Aa")} className="square-btn">
                Aa
              </button>{" "}
              <button onClick={() => capsSwitch("aa")} className="square-btn">
                aa
              </button>{" "}
              <button onClick={() => capsSwitch("AA")} className="square-btn">
                AA
              </button>
              <button className="square-btn" onClick={delSelected}>
                del
              </button>
            </div>
          )}
        </div>
      </div>
      <TxtBtns toJustif={toJustif} />
      <Button className="w100" onClick={onOK}>
        OK
      </Button>{" "}
    </>
  );
};

export default StrAreaEdit;
