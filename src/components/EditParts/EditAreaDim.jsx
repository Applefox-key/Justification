import React, { useMemo, useState } from "react";
import {
  editTextActionRef,
  applyAction,
  getNameByAorB,
} from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import SideBtns from "../Edit/SideBtns";
import { saveToHistory } from "../../utils/localStorage";
import { usePopup } from "../../hooks/usePopup";
import { defaultDim } from "../../constants/textParts";
import EditAreaHeader from "./EditAreaHeader";
import EditAreaMenuBar from "./EditAreaMenuBar";
import { Button } from "react-bootstrap";
import { RiDragMoveFill } from "react-icons/ri";
import EditDimJustif from "./EditDimJustif";
import EditDimBody from "./EditDimBody";
import { BiSolidRightArrow } from "react-icons/bi";
import EditDimBodyAnalitic from "./EditDimBodyAnalitic";
import EditAreaTask from "./EditAreaTask";

const EditAreaDim = ({ actionFn, item, setItem, action, setIsCheckerMode }) => {
  const [textSelected, setTextSelected] = useState("");
  const [best, setBest] = useState({ num: -1, title: "", fields: [], rec: "" });
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const [show, setShow] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showBody, setShowBody] = useState(false);
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
      let newT = item[field] || "";
      let fieldName = getNameByAorB(field);
      newT = newT
        .replace(fieldName + " issues:", "")
        .replace(/^OK/, "")
        .trim();

      if (val === 5) newT = "OK " + newT;
      else if (val !== 0) {
        newT =
          fieldName +
          " issues:" +
          (newT.startsWith("OK") ? newT.replace("OK", "") : " " + newT);
      }

      // if (val && !item[field]) newT = val === 5 ? "OK" : fieldName + " issues:";
      const newEst = { ...item.Evals, [field]: val };
      setItem({ ...item, Evals: newEst, ...{ [field]: newT } });
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
  const clear = (e = null, notAllFields = false) => {
    toHist();
    const newV = notAllFields
      ? {
          ...defaultDim,
          ...(item.id && { id: item.id }),
          ...(item.name && { name: item.name }),
        }
      : defaultDim;
    setItem(newV);
    setBest({ num: -1, title: "", fields: [] });
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = JSON.stringify(item);

    clear();
    if (!!actionFn) actionFn(val);
  };

  const dimHeight = () => {
    if (!show && !showReview) return "dimBox";
    if (show && showReview) return "dimBox hdim3";
    else return "dimBox hdim";
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
      />{" "}
      <div className="handle hbottom-dim">
        <RiDragMoveFill />
      </div>
      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="editareadim">
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}
          <div className="editParts-wrap">
            <EditAreaTask
              editParam={{
                showReview,
                setShowReview,
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
                show,
                setShow,
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
            />{" "}
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
                setItem,
              }}
            />
            <div className="body-dim-line">
              {/* Dimentions scores */}
              <button id="show-body-dim" onClick={() => setShowBody(!showBody)}>
                Dimentions scores{" "}
                <BiSolidRightArrow className={showBody ? "arr-down " : ""} />
              </button>
            </div>
            {/* <button id="show-body-dim" onClick={() => setShowBody(!showBody)}>
              <BiSolidRightArrow className={showBody ? "arr-down " : ""} />
            </button> */}
            <div className={dimHeight()}>
              {/* {showBody ? ( */}
              <EditDimBody
                editParam={{
                  showBody,
                  setShowBody,
                  setIsTxt,
                  best,
                  item,
                  fieldFn,
                  fieldId,
                  isTxt,
                }}
              />
              {/* ) : (
                <EditDimBodyAnalitic
                  editParam={{
                    item,
                    fieldFn,
                  }}
                />
              )} */}
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
      {/* <div className="d-flex mt-11 w-100">
        <Button className="edit100 m-0" onClick={onOK}>
          OK
        </Button>{" "}
        <div className="handle hbottom">
          <RiDragMoveFill />
        </div>
      </div> */}
    </>
  );
};

export default EditAreaDim;
