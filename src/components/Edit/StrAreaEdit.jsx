import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { voiceToEdit, replaceWords } from "../../utils/utilStr";
import RatingOverlay from "../Rate/RatingOverlay";
import TopBtns from "./TopBtns";
import SideBtns from "./SideBtns";
import TxtBtns from "../TextParts/TxtBtns";
import VoiceOverlay from "../Voice/VoiceOverlay";
import { TiArrowLeftThick } from "react-icons/ti";

const StrAreaEdit = ({ str = "", actionFn, placeholder = "" }) => {
  const [textSelected, setTextSelected] = useState("");
  const [handleTxt, setHandleTxt] = useState(str);
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const handleChange = (e) => {
    e.stopPropagation();
    setHandleTxt(e.target.value);
  };

  const onOK = (e) => {
    e.stopPropagation();
    const val = handleTxt;
    setHandleTxt("");
    if (!!actionFn) actionFn(val);
  };

  const clickOnPhrase = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText === textSelected) return;
    setTextSelected(selectedText);
  };

  const toText = (text) => {
    const newVal = handleTxt + text;
    setHandleTxt(newVal);
  };
  const respOrder = (e) => {
    const newVal = replaceWords(handleTxt);
    setHandleTxt(newVal);
  };

  return (
    <>
      <div className="d-flex flex-wrap">
        <Button
          className={"btnToHis" + (isTemplates ? " isTmp" : "")}
          onClick={(e) => setIsTemplates(!isTemplates)}>
          Templates
        </Button>
        {/* <Button
          title="save selection as a template"
          disabled={!textSelected}
          className="btnToHis  toTempBtn ordinary">
          <TiArrowLeftThick />
        </Button> */}
        <TopBtns
          handleTxt={handleTxt}
          setHandleTxt={setHandleTxt}
          isTxt={isTxt}
          setIsTxt={setIsTxt}
          onOK={onOK}
        />
      </div>

      <div onClick={clickOnPhrase} onTouchEnd={clickOnPhrase} className="w-100">
        <div className="d-flex h-100 justify-content-start">
          {isTxt ? (
            <div
              className={"setIsTxt"}
              onMouseDown={(e) => {
                if (e.button === 1) setIsTxt(!isTxt);
              }}>
              {handleTxt}
            </div>
          ) : (
            <div className="d-flex w-100 h-100">
              {isTemplates ? (
                <TxtBtns edit toJustif={(val) => toText(val.en)} />
              ) : (
                <></>
              )}
              <Form.Control
                as="textarea"
                id={"editArea"}
                className={"fit-height w-100"}
                rows={1}
                spellCheck
                placeholder={placeholder}
                value={handleTxt}
                onMouseDown={(e) => {
                  if (e.button === 1) setIsTxt(!isTxt);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") onOK(e);
                  else if (e.key === "F2") respOrder(e);
                }}
                onChange={handleChange}
              />
            </div>
          )}
          <SideBtns
            handleTxt={handleTxt}
            setHandleTxt={setHandleTxt}
            isTxt={isTxt}
            textSelected={textSelected}
          />
        </div>
      </div>
      <div className="w-100 mt-11">
        <VoiceOverlay
          edit
          toJustif={(txt) => {
            voiceToEdit(txt, handleTxt, setHandleTxt);
          }}
        />
        <RatingOverlay toJustif={toText} />{" "}
        <Button className="w-100 m-0" onClick={onOK}>
          OK
        </Button>
      </div>
    </>
  );
};

export default StrAreaEdit;
