import React, { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { voiceToEdit, editTextActionRef } from "../../utils/utilStr";
import TxtBtns from "../TextParts/TxtBtns";
import VoiceOverlay from "../Voice/VoiceOverlay";
import HotBtns from "../Hint/HotBtns";
import TopBtns from "../Edit/TopBtns";
import SideBtns from "../Edit/SideBtns";
import EditField from "./EditField";
import FinalRate from "../Rate/FinalRate";
import { defaultVerdict, labelsVerdictEdit } from "../../utils/analysis";
import { saveToHistory } from "../../utils/localStorage";
import RateBoxes from "../Rate/RateBoxes";

const EditArea = ({ actionFn, item, setItem }) => {
  const [textSelected, setTextSelected] = useState("");

  const [best, setBest] = useState({ num: -1, title: "", fields: [] });
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const fieldId = useMemo(() => {
    return textRef && textRef.current && textRef.current.id
      ? textRef.current.id
      : "R3";
  }, [textRef]);

  const bestField = useCallback((i) => {
    const result = [];
    if (i > -1 && i < 4) result.push("R1");
    if (i > 2) result.push("R2");
    return result;
  }, []);

  const fieldFn = {
    onFocus: (ref) => {
      if (textRef && textRef.current) {
        const field = fieldId;
        const val = textRef.current.value || "";
        setItem({ ...item, [field]: val });
      }
      setTextRef(ref);
    },
    setNewVal: (val) => {
      const field = fieldId;
      setItem({ ...item, [field]: val });
    },
  };
  const clickOnPhrase = (e) => {
    e.stopPropagation();
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText === textSelected) return;
    setTextSelected(selectedText);
  };
  const pasteToText = (val) => {
    editTextActionRef(
      textRef,
      item[fieldId],
      fieldFn.setNewVal,
      "add",
      true,
      val.en || val
    );
  };
  const compose = () => {
    const newV = best.title;
    setItem({
      ...item,
      "R3": `${newV} ${item.R0}\n @Response 1: ${item.R1}\n @Response 2: ${item.R2}`,
    });
  };
  const clear = () => {
    const handleTxt =
      !item.R1 && !item.R1 && !item.R1 && !item.R0
        ? ""
        : `R1:${item.R1} R2:${item.R2}, R3:${item.R3}, R0:${item.R0}`;

    saveToHistory({ en: handleTxt, ru: "" });
    setItem({ R1: "", R2: "", R3: "", R0: "" });
    setBest({ num: -1, title: "", fields: [] });
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = ` R0${item.R0} R1${item.R1}, R2${item.R2} R3${item.R3}`;
    clear();
    if (!!actionFn) actionFn(val);
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
            handleTxt: item[fieldId],
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
          <div className="d-flex edit100 h-100">
            {isTemplates && <TxtBtns edit toJustif={pasteToText} />}
            <div className="editParts-wrap">
              <div className="d-flex w-100">
                {["R1", "R2"].map((field, i) => (
                  <EditField
                    key={i}
                    fieldName={field}
                    placeholder={i + 1}
                    setIsTxt={setIsTxt}
                    classN={
                      (fieldId === field ? "active-field" : "") +
                      (best.fields.includes(field) ? " best-field" : "")
                    }
                    isTxt={isTxt && fieldId === field}
                    isActive={fieldId === field}
                    fieldVal={item[field]}
                    fieldFn={fieldFn}
                  />
                ))}
              </div>
              <div className="edit-parts-menu">
                <RateBoxes
                  callback={(val) => {
                    let v = best.num === val.num ? -1 : val.num;
                    setBest(
                      v === -1
                        ? { num: -1, title: "", fields: [] }
                        : { ...val, fields: bestField(v) }
                    );
                  }}
                  choosed={best.num}
                />

                <span>{best.title}</span>
                <div>
                  <button onClick={compose}>compose</button>
                  <button onClick={clear}>clear all parts</button>{" "}
                </div>
              </div>{" "}
              <EditField
                setIsTxt={setIsTxt}
                isTxt={isTxt && fieldId === "R0"}
                autoFocus
                fieldName="R0"
                classN={fieldId === "R0" ? "active-field" : ""}
                isActive={fieldId === "R0"}
                placeholder="Reason"
                fieldVal={item.R0}
                fieldFn={fieldFn}
              />
              <EditField
                setIsTxt={setIsTxt}
                isTxt={isTxt && fieldId === "R3"}
                autoFocus
                fieldName="R3"
                classN={fieldId === "R3" ? "active-field" : ""}
                isActive={fieldId === "R3"}
                placeholder="Both"
                fieldVal={item.R3}
                fieldFn={fieldFn}
              />
            </div>
          </div>

          <SideBtns
            fieldId={fieldId}
            statesVal={{
              handleTxt: item[fieldId],
              setHandleTxt: fieldFn.setNewVal,
              isTxt,
              setIsTxt,
            }}
            textSelected={textSelected}
          />
        </div>
      </div>
      <div className="edit100 mt-11">
        <VoiceOverlay
          edit
          toJustif={(txt) => {
            voiceToEdit(txt, item[fieldId], fieldFn.setNewVal, fieldId);
          }}
        />
        <Button className="edit100 m-0" onClick={onOK}>
          OK
        </Button>
      </div>
    </>
  );
};

export default EditArea;
