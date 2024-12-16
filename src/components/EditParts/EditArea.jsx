import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
  voiceToEdit,
  editTextActionRef,
  applyAction,
} from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import HotBtns from "../Hint/HotBtns";
import TopBtns from "../Edit/TopBtns";
import SideBtns from "../Edit/SideBtns";
import EditField from "./EditField";
import { saveToHistory } from "../../utils/localStorage";
import RateBoxes from "../Rate/RateBoxes";
import BtnArchive from "../Edit/BtnArchive";
import { baseRespName } from "../../constants/replacements";
import { FaStar } from "react-icons/fa";
import VoiceDragable from "../Voice/VoiceDragable";
import { RiDragMoveFill } from "react-icons/ri";
import { TbBoxAlignTop } from "react-icons/tb";
import { usePopup } from "../../hooks/usePopup";

const EditArea = ({ actionFn, item, setItem, action, setIsCheckerMode }) => {
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
    if (i > -1 && i < 5) result.push("R1");
    if (i > 3) result.push("R2");
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
    onKeyDown: (e) => {
      if (e.key === "F2") {
        const val = item[fieldId];
        const newVal = applyAction(val, action);
        fieldFn.setNewVal(newVal);
      }
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
    const newVal = applyAction(val.en || val, action);
    editTextActionRef(
      textRef,
      item[fieldId],
      fieldFn.setNewVal,
      "add",
      true,
      newVal
    );
  };
  const compose = (r3targ = true) => {
    const rateStr = best.title;

    if (r3targ)
      setItem({
        ...item,
        "R3": `${rateStr} ${item.R0}\n ${baseRespName[action].R1} : ${item.R1}\n ${baseRespName[action].R2} : ${item.R2}`,
      });
    else {
      const cursorPos = textRef.current.selectionStart;
      const text = item[fieldId];
      const newVal =
        text.slice(0, cursorPos) +
        rateStr +
        " " +
        item.R0 +
        text.slice(cursorPos);

      setItem({
        ...item,
        [fieldId]: newVal,
      });
      textRef.current.selectionStart = textRef.current.selectionEnd =
        cursorPos + textRef.length;
    }
  };
  const setPopup = usePopup();
  const toHist = () => {
    const handleTxt =
      !item.R1 && !item.R1 && !item.R1 && !item.R0
        ? ""
        : `R1:${item.R1}\n R2:${item.R2}\n R3:${item.R3}\n R0:${item.R0}`;

    saveToHistory({ en: handleTxt, ru: "" });
    setPopup("info has been added to the history");
  };
  const clear = () => {
    toHist();
    setItem({ R1: "", R2: "", R3: "", R0: "" });
    setBest({ num: -1, title: "", fields: [] });
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = `R1:\n${item.R1}\nR2:\n${item.R2}\nR3:\n${item.R3}\nR0:\n${item.R0}`;
    clear();
    if (!!actionFn) actionFn(val);
  };
  const handleRate = (e, val) => {
    let v = best.num === val.num ? -1 : val.num;
    setBest(
      v === -1
        ? { num: -1, title: "", fields: [] }
        : { ...val, title: val.title, fields: bestField(v) }
    );
  };
  const refBoxR03 = useRef(null);
  // const isFlex = refBoxR03.current ? refBoxR03.current.classList.length - 1 : 0;

  const changeView = () => {
    const isFlex = refBoxR03.current.classList.length - 1;
    if (isFlex) {
      refBoxR03.current.classList.remove("unflex-box");
    } else {
      refBoxR03.current.classList.add("unflex-box");
    }
  };
  const turnsTMP = () => {
    const userConfirmed = window.confirm(
      "Do you want to clear text and add a template?"
    );
    if (!userConfirmed) return;
    const txt = `TURN1.\n\nTURN2.\n\nTURN3.\n\nTURN4.`;
    setItem({ R1: `PROMPT.\n\n${txt}`, R2: txt, R3: txt, R0: "" });
  };
  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-start mb-1">
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
          action={action}
          statesVal={{
            handleTxt: item[fieldId],
            setHandleTxt: fieldFn.setNewVal,
            isTxt,
            setIsTxt,
          }}
          onOK={onOK}
        />
        <BtnArchive txt={item} setTxt={setItem} />
        {isHotBtns && <HotBtns toJustif={pasteToText} />}
      </div>
      <div onClick={clickOnPhrase} onTouchEnd={clickOnPhrase} className="w-100">
        <div className="d-flex h-100 justify-content-start align-items-start">
          <div className="d-flex edit100 h-100">
            {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}
            <div className="editParts-wrap">
              <div className="resp12">
                {["R1", "R2"].map((field, i) => (
                  <>
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
                    {best.fields.includes(field) && (
                      <FaStar className={field + "best star"} />
                    )}
                  </>
                ))}
              </div>
              <div className="edit-parts-menu">
                <div className="d-flex">
                  <Button
                    className="btn-back square-btn"
                    onClick={changeView}
                    title=" small or big field for the reason">
                    <TbBoxAlignTop />
                  </Button>
                  <RateBoxes
                    action={action}
                    choosed={best.num}
                    callback={handleRate}
                  />
                </div>
                <div>
                  {" "}
                  <button onClick={turnsTMP}>Turns TMPL</button>
                  <button onClick={() => compose(false)}>
                    rate to active text field
                  </button>
                  <button onClick={() => compose(true)}>compose</button>
                  <button onClick={clear}>clear all parts</button>{" "}
                </div>
              </div>
              <div ref={refBoxR03} className="resp34">
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

      <div className="d-flex mt-11 w-100">
        <Button
          className="edit100 m-0 me-2"
          onClick={() => {
            toHist();
            setIsCheckerMode(true);
          }}>
          Check text
        </Button>
        <Button className="edit100 m-0" onClick={onOK}>
          OK
        </Button>{" "}
        <VoiceDragable
          nameF={fieldId}
          toJustif={(txt) => {
            voiceToEdit(txt, item[fieldId], fieldFn.setNewVal, fieldId);
          }}
        />{" "}
        <div className="handle hbottom">
          <RiDragMoveFill />
        </div>
      </div>
    </>
  );
};

export default EditArea;
