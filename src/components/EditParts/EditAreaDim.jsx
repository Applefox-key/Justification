import React, { useMemo, useState } from "react";
import { editTextActionRef, applyAction } from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import SideBtns from "../Edit/SideBtns";
import { saveToHistory } from "../../utils/localStorage";
import { FaStar } from "react-icons/fa";
import { usePopup } from "../../hooks/usePopup";
import EditFieldDim from "./EditFieldDim";
import { arrAB, defaultDim } from "../../constants/textParts";
import EditAreaHeader from "./EditAreaHeader";

import EditAreaMenuBar from "./EditAreaMenuBar";
import { Button } from "react-bootstrap";
import { RiDragMoveFill } from "react-icons/ri";
import EditDimJustif from "./EditDimJustif";

const EditAreaDim = ({ actionFn, item, setItem, action, setIsCheckerMode }) => {
  const [textSelected, setTextSelected] = useState("");
  const [best, setBest] = useState({ num: -1, title: "", fields: [], rec: "" });
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const [show, setShow] = useState(false);
  const fieldId = useMemo(() => {
    return textRef && textRef.current && textRef.current.id
      ? textRef.current.id
      : "R3";
  }, [textRef]);

  const fieldFn = {
    onFocus: (ref) => {
      if (textRef && textRef.current) {
        const field = fieldId;
        const val = textRef.current.value || "";
        setItem({ ...item, [field]: val });
      }
      setTextRef(ref);
    },
    setNewEstim: (val, field) => {
      let newT = "";
      if (val && !item[field]) newT = val === 5 ? "OK" : "ISSUE";
      const newEst = { ...item.Evals, [field]: val };
      setItem({ ...item, Evals: newEst, ...(newT && { [field]: newT }) });
      console.log(item);
    },
    setNewVal: (val) => {
      const field = fieldId;
      setItem({ ...item, [field]: val });
    },
    setNewValF: (val, fieldVal) => {
      setItem({ ...item, [fieldVal]: val });
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

  const setPopup = usePopup();
  const toHist = () => {
    const handleTxt = JSON.stringify(item);
    saveToHistory({ en: handleTxt, ru: "DIM" });
    setPopup("info has been added to the history");
  };
  const clear = () => {
    toHist();
    setItem(defaultDim);
    setBest({ num: -1, title: "", fields: [] });
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = JSON.stringify(item);

    clear();
    if (!!actionFn) actionFn(val);
  };

  return (
    <>
      <EditAreaHeader
        editParam={{
          isTemplates,
          setIsTemplates,
          isHotBtns,
          setIsHotBtns,
          action,
          item,
          fieldFn,
          fieldId,
          isTxt,
          setIsTxt,
          onOK,
          setItem,
          pasteToText,
        }}
      />
      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="editareadim">
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}
          <div className="editParts-wrap">
            <EditDimJustif
              editParam={{
                show,
                setShow,
                setIsTxt,
                best,
                item,
                fieldFn,
                fieldId,
                isTxt,
              }}
            />
            <EditAreaMenuBar
              editParam={{
                toHist,
                setIsCheckerMode,
                item,
                fieldFn,
                fieldId,
                action,
                setBest,
                setItem,
                best,
                clear,
              }}
            />

            <div className={"dimBox" + (!show ? " hdim" : "")}>
              <div className="respDim">
                <EditFieldDim
                  fieldName={"id"}
                  small
                  placeholder={"id"}
                  setIsTxt={setIsTxt}
                  classN={fieldId === "id" ? "active-field" : ""}
                  isTxt={isTxt && fieldId === "id"}
                  isActive={fieldId === "id"}
                  fieldVal={item.id}
                  fieldFn={fieldFn}
                />
                {arrAB.map((field, i) => (
                  <>
                    <EditFieldDim
                      key={i}
                      fieldName={field.a}
                      placeholder={field.a}
                      setIsTxt={setIsTxt}
                      scale="right"
                      classN={
                        (fieldId === field.a
                          ? "dimFieldS active-field"
                          : "dimField") +
                        (best.fields.includes(field.a) ? " best-field" : "")
                      }
                      isTxt={isTxt && fieldId === field.a}
                      isActive={fieldId === field.a}
                      fieldVal={item[field.a]}
                      estim={item.Evals[field.a]}
                      fieldFn={fieldFn}
                    />
                    {best.fields.includes(field.a) && (
                      <FaStar className={field.a + "best star"} />
                    )}
                  </>
                ))}
              </div>

              <div className="respDim">
                <EditFieldDim
                  fieldName={"name"}
                  small
                  placeholder={"name"}
                  setIsTxt={setIsTxt}
                  classN={fieldId === "name" ? "active-field" : ""}
                  isTxt={isTxt && fieldId === "name"}
                  isActive={fieldId === "name"}
                  fieldVal={item.name}
                  fieldFn={fieldFn}
                />
                {arrAB.map((field, i) => (
                  <>
                    <EditFieldDim
                      scale="left"
                      key={i}
                      fieldName={field.b}
                      placeholder={field.b}
                      setIsTxt={setIsTxt}
                      classN={
                        (fieldId === field.b
                          ? "dimField active-field"
                          : "dimField") +
                        (best.fields.includes(field.b) ? " best-field" : "")
                      }
                      isTxt={isTxt && fieldId === field.b}
                      isActive={fieldId === field.b}
                      fieldVal={item[field.b]}
                      estim={item.Evals[field.b]}
                      fieldFn={fieldFn}
                    />
                    {best.fields.includes(field.b) && (
                      <FaStar className={field.b + "best star"} />
                    )}
                  </>
                ))}
              </div>
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

      <div className="d-flex mt-11 w-100">
        <Button className="edit100 m-0" onClick={onOK}>
          OK
        </Button>{" "}
        <div className="handle hbottom">
          <RiDragMoveFill />
        </div>
      </div>
    </>
  );
};

export default EditAreaDim;
