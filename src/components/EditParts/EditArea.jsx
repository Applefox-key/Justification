import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { voiceToEdit, editTextActionRef } from "../../utils/utilStr";
import RatingOverlay from "../Rate/RatingOverlay";

import TxtBtns from "../TextParts/TxtBtns";
import VoiceOverlay from "../Voice/VoiceOverlay";
import HotBtns from "../Hint/HotBtns";
import TopBtns from "../Edit/TopBtns";
import SideBtns from "../Edit/SideBtns";
import EditField from "./EditField";
import FinalRate from "../Rate/FinalRate";
import { defaultVerdict, labelsVerdictEdit } from "../../utils/analysis";

const EditArea = ({ actionFn, placeholder = "", handleTxt, item, setItem }) => {
  const [textSelected, setTextSelected] = useState("");
  const [rate, setRate] = useState(defaultVerdict);
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const clear = () => {
    setItem({ R1: "", R2: "", R3: "" });
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = ` R1${item.R1}, R2${item.R2} R3${item.R3}`;
    clear();
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
    fieldFn.setNewVal(newVal);
  };
  const fieldFn = {
    onFocus: (ref) => {
      if (textRef) {
        const field = textRef.current.id;
        const val = textRef.current.value;

        // const oldVal = item[field];
        setItem({ ...item, [field]: val });
      }
      setTextRef(ref);
    },
    setNewVal: (val) => {
      const field = textRef.current.id;
      setItem({ ...item, [field]: val });
    },
  };
  const refLast = useRef(null);
  const lasttxt = {
    saveLast: () => {
      refLast.current = item[textRef.current.id || "R3"];
    },
    pasteLast: () => {
      if (refLast.current !== "") fieldFn.setNewVal(refLast.current);
      refLast.current = "";
    },
  };
  const pasteToText = (val) => {
    editTextActionRef(
      textRef,
      item[textRef.current.id],
      fieldFn.setNewVal,
      "add",
      true,
      val.en || val
    );
  };
  const compose = () => {
    const newV = rate.resultNum ? labelsVerdictEdit[rate.resultNum - 1] : "";
    setItem({
      ...item,
      "R3": `${newV}\n @Response 1: ${item.R1}\n @Response 2:${item.R2}`,
    });
  };

  const handleChangeVerdict = (val) => {
    const newvalTxt = labelsVerdictEdit[val - 1];
    setRate({
      ...rate,
      result: val === 4 ? "Responses are the same" : "Response " + newvalTxt,
      resultNum: val,
    });
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
          statesVal={{
            handleTxt: textRef ? item[textRef.current.id] : item["R3"],
            setHandleTxt: fieldFn.setNewVal,
            isTxt,
            setIsTxt,
          }}
          onOK={onOK}
        />
        {isHotBtns && <HotBtns toJustif={pasteToText} />}
      </div>

      <div onClick={clickOnPhrase} onTouchEnd={clickOnPhrase} className="w-100">
        <div className="d-flex h-100 justify-content-start">
          <div className="d-flex w-100 h-100">
            {isTemplates && <TxtBtns edit toJustif={pasteToText} />}
            <div className="editParts-wrap">
              <div className="d-flex w-100">
                <EditField
                  fieldName="R1"
                  placeholder="A"
                  fieldVal={item.R1}
                  fieldFn={fieldFn}
                />{" "}
                <EditField
                  fieldName="R2"
                  placeholder="B"
                  fieldVal={item.R2}
                  fieldFn={fieldFn}
                />{" "}
              </div>{" "}
              <div className="edit-parts-menu">
                <FinalRate value={rate} setValue={handleChangeVerdict} />{" "}
                <button onClick={compose}>compose</button>
                <button onClick={clear}>clear</button>
              </div>
              <EditField
                autoF
                fieldName="R3"
                placeholder="Both"
                fieldVal={item.R3}
                fieldFn={fieldFn}
              />
            </div>
          </div>

          <SideBtns
            fieldId={textRef ? textRef.current.id : "R3"}
            statesVal={{
              handleTxt: textRef ? item[textRef.current.id] : item["R3"],
              setHandleTxt: fieldFn.setNewVal,
              isTxt,
              setIsTxt,
            }}
            textSelected={textSelected}
          />
        </div>
      </div>
      <div className="w-100 mt-11">
        <VoiceOverlay
          edit
          toJustif={(txt) => {
            voiceToEdit(
              txt,
              textRef.current ? item[textRef.current.id] : item["R3"],
              fieldFn.setNewVal
            );
          }}
        />
        {/* <RatingOverlay toJustif={toText} /> */}
        <Button className="w-100 m-0" onClick={onOK}>
          OK
        </Button>
      </div>
    </>
  );
};

export default EditArea;
