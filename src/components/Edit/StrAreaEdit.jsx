import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { voiceToEdit, editTextAction, applyAction } from "../../utils/utilStr";
import RatingOverlay from "../Rate/RatingOverlay";
import TopBtns from "./TopBtns";
import SideBtns from "./SideBtns";
import TxtBtns from "../TextParts/TxtBtns";
import VoiceOverlay from "../Voice/VoiceOverlay";
import HotBtns from "../Hint/HotBtns";
import VoiceDragable from "../Voice/VoiceDragable";

const StrAreaEdit = ({
  actionFn,
  placeholder = "",
  handleTxt,
  setHandleTxt,
  action,
}) => {
  const [textSelected, setTextSelected] = useState("");
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);

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

  const refLast = useRef(null);
  const lasttxt = {
    saveLast: () => {
      refLast.current = handleTxt;
    },
    pasteLast: () => {
      if (refLast.current !== "") setHandleTxt(refLast.current);
      refLast.current = "";
    },
  };
  const pasteToText = (val) => {
    const newVal = applyAction(val.en || val, action);
    editTextAction("editArea", handleTxt, setHandleTxt, "add", true, newVal);
  };

  return (
    <>
      <div className="d-flex flex-wrap">
        <Button
          className={"btnToHis" + (isTemplates ? " isTmp" : "")}
          onClick={(e) => setIsTemplates(!isTemplates)}>
          Templates
        </Button>
        <Button
          className={"btnToHis hintBtn" + (isHotBtns ? " isTmp" : "")}
          onClick={(e) => setIsHotBtns(!isHotBtns)}>
          HOT
        </Button>

        <TopBtns
          field="editArea"
          statesVal={{ handleTxt, setHandleTxt, isTxt, setIsTxt }}
          onOK={onOK}
          action={action}
        />
        {isHotBtns && <HotBtns toJustif={pasteToText} action={action} />}
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
              {isTemplates ? <TxtBtns edit toJustif={pasteToText} /> : <></>}
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
                  else {
                    lasttxt.saveLast();
                    if (e.key === "F2") {
                      const newVal = applyAction(handleTxt, action);
                      setHandleTxt(newVal);
                    }
                  }
                  // NumIsteadLetter(handleTxt, setHandleTxt);
                }}
                onChange={handleChange}
              />
            </div>
          )}
          <SideBtns
            fieldId="editArea"
            statesVal={{ handleTxt, setHandleTxt, isTxt, setIsTxt }}
            textSelected={textSelected}
          />
        </div>
      </div>
      <div className="w-100 mt-11 d-flex align-items-center justify-content-between">
        {/* <div className="d-flex align-items-center justify-content-between"> */}
        <RatingOverlay toJustif={toText} />{" "}
        <Button className=" m-0" onClick={onOK}>
          OK
        </Button>{" "}
        {/* </div> */}
        <VoiceDragable
          nameF={"editArea"}
          toJustif={(txt) => {
            voiceToEdit(txt, handleTxt, setHandleTxt);
          }}
        />
        {/* <VoiceOverlay
          edit
          toJustif={(txt) => {
            voiceToEdit(txt, handleTxt, setHandleTxt);
          }}
        /> */}
      </div>
    </>
  );
};

export default StrAreaEdit;
