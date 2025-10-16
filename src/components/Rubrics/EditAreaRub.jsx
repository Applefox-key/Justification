import React, { useMemo, useState } from "react";
import { editTextActionRef, applyAction } from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import SideBtns from "../EditBtns/SideBtns";
import { saveToHistorygeneral } from "../../utils/localStorage";
import { usePopup } from "../../hooks/usePopup";
import { defaultRubJust } from "../../constants/rubricsTemplates";

import EditRubHeader from "./EditRubHeader";
import EditFieldRub from "./EditFieldRub";
import Rubricator from "./Rubricator";

import { createFieldFn } from "../../utils/rubricsFn";

const EditAreaRub = ({ actionFn, item, setItem, action }) => {
  const [textRef, setTextRef] = useState(null);
  const [textSelected, setTextSelected] = useState("");
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  const [countR, setCountR] = useState(4);
  // const [fieldId, setFieldId] = useState(() => textRef.current?.id || "prompt");
  // const [showBody, setShowBody] = useState(false);
  const fieldId = useMemo(() => {
    return textRef && textRef.current && textRef.current.id
      ? textRef.current.id
      : "prompt";
  }, [textRef]);
  // useEffect(() => {
  //   if (!textRef.current) return;

  //   // Начальное значение
  //   setFieldId(textRef.current.id || "prompt");

  //   const observer = new MutationObserver((mutations) => {
  //     for (let m of mutations) {
  //       if (m.type === "attributes" && m.attributeName === "id") {
  //         setFieldId(textRef.current?.id || "prompt");
  //       }
  //     }
  //   });

  //   observer.observe(textRef.current, {
  //     attributes: true,
  //     attributeFilter: ["id"],
  //   });

  //   return () => observer.disconnect();
  // }, [textRef]);

  const setPopup = usePopup();

  const fieldFn = useMemo(
    () =>
      createFieldFn(
        item,
        setItem,
        textRef,
        setTextRef,
        action,
        fieldId,
        setPopup
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item, action, fieldId, textRef]
  );
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
      fieldFn.getFieldValue(),
      fieldFn.setNewVal,
      "add",
      true,
      newVal
    );
  };

  const toHist = () => {
    const handleTxt = JSON.stringify(item);
    saveToHistorygeneral({ en: handleTxt, ru: "RUB" }, setPopup);
  };
  const clear = (e = null, notAllFields = false) => {
    toHist();
    const newV = notAllFields
      ? {
          ...defaultRubJust,
          ...(item.id && { id: item.id }),
          ...(item.name && { name: item.name }),
        }
      : defaultRubJust;
    setItem(newV);
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = JSON.stringify(item);

    clear();
    if (!!actionFn) actionFn(val);
  };
  const gv = (e) => {
    const v = fieldFn.getFieldValue();
    return v;
  };
  const changeClass = () => {
    const el = document.getElementById("prompt");
    const IsToAdd = ![...el.classList].includes("height-ta");
    if (IsToAdd) {
      el.classList.add("height-ta");
      // ref.current.classList.add("plusTextArea");
      // ref.current.focus();
    } else {
      el.classList.remove("height-ta");
    }
  };
  const handleCountChange = () => {
    const v = countR === 4 ? 2 : 4;
    setCountR(v);
  };

  const rubPr = (notAutoText = false) => {
    const textarea = document.getElementById(fieldId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end || textarea === null) {
      return; // No text selected
    }

    const textF = textarea.value;
    const selectedText = textF.slice(start, end);

    fieldFn.createRubPrompt(selectedText, notAutoText);
  };
  const splitLineData = async () => {
    const textarea = document.getElementById(fieldId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    let textF = "";
    if (start === end || textarea === null) {
      textF = await navigator.clipboard.readText();
      if (!textF) return;
      // return; // No text selected
    } else textF = textarea.value.slice(start, end);

    const input = textF;
    fieldFn.createRubPromptScores(input);
  };
  return (
    <>
      <EditRubHeader
        editParam={{
          item,
          setItem,
          isTemplates,
          setIsTemplates,
          isHotBtns,
          setIsHotBtns,
          action,
          fieldFn,
          fieldId,
          onOK,
          pasteToText,
        }}
      />

      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="editarearub">
        {/* <span className="fieldid-t">{fieldId}</span> */}
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}
          <div className="editParts-wrap">
            <div className="d-flex">
              <button onClick={handleCountChange} className="unsetW square-btn">
                {countR}
              </button>{" "}
              <button onClick={() => rubPr()} className="unsetW square-btn">
                RA
              </button>{" "}
              <button onClick={() => rubPr(1)} className="unsetW square-btn">
                R
              </button>{" "}
              <button
                onClick={() => splitLineData()}
                className="unsetW square-btn">
                RR
              </button>
              <EditFieldRub
                // showArrow
                // show={show} // key={i}
                fieldName={"prompt"}
                classN="w-100 rub-prompt"
                placeholder={"prompt text="}
                isActive={fieldId === "prompt"}
                fieldVal={item.prompt}
                fieldFn={fieldFn}
              />{" "}
              <button className="unsetW square-btn" onClick={changeClass}>
                +
              </button>
              <div>
                <EditFieldRub
                  small
                  classN="rub-id"
                  show={show} // key={i}
                  fieldName={"id"}
                  placeholder={"task id"}
                  isActive={fieldId === "id"}
                  fieldVal={item.id}
                  fieldFn={fieldFn}
                />
              </div>
            </div>
            <Rubricator
              editParam={{
                item,
                setItem,
                fieldFn,
                fieldId,
                countR,
              }}
            />
          </div>
        </div>
        <SideBtns
          fieldId={fieldId}
          // handleTxt1={fieldFn.getFieldValue()}
          handleTxt1={gv()}
          statesVal={{
            handleTxt: fieldFn.getFieldValue(),
            setHandleTxt: fieldFn.setNewVal,
          }}
          textSelected={textSelected}
        />
      </div>
    </>
  );
};

export default EditAreaRub;
