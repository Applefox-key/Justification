import React, { useMemo, useState } from "react";
import {
  editTextActionRef,
  applyAction,
  getNameByAorB,
} from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import SideBtns from "../EditBtns/SideBtns";
import { saveToHistory } from "../../utils/localStorage";
import { usePopup } from "../../hooks/usePopup";
import { getNewOrParseDmg } from "../../constants/textParts";

import { BiSolidRightArrow } from "react-icons/bi";

import { recomDim } from "../../utils/analysis";

import EditDmgHeader from "./EditDmgHeader";
import EditDmgBody from "./EditDmgBody";
import EditDmgJustif from "./EditDmgJustif";
import EditDmgMenuBar from "./EditDmgMenuBar";
import EditDmgTask from "./EditDmgTask";

const EditAreaDmg = ({ actionFn, item, setItem, action, setIsCheckerMode }) => {
  const [textSelected, setTextSelected] = useState("");
  const [best, setBest] = useState({ num: -1, title: "", fields: [], rec: "" });
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [isSetBtn, setIsSetBtn] = useState(false);
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
      let fieldName = getNameByAorB(field, item.setName);
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
      const rec = recomDim(newEst);

      if (rec.recom !== rec) setBest({ ...best, rec: rec.recom });
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
    const defaultDmg = getNewOrParseDmg();
    const newV = notAllFields
      ? {
          ...defaultDmg,
          ...(item.id && { id: item.id }),
          ...(item.name && { name: item.name }),
        }
      : defaultDmg;
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
      <EditDmgHeader
        editParam={{
          isTemplates,
          setIsTemplates,
          isHotBtns,
          setIsHotBtns,
          isSetBtn,
          setIsSetBtn,
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
      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="editareadim">
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}

          <div className="editParts-wrap">
            <EditDmgTask
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
            <EditDmgMenuBar
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
            {show && <div className="rec">Recommendation: {best.rec}</div>}
            <EditDmgJustif
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
              <button id="show-body-dim" onClick={() => setShowBody(!showBody)}>
                Dimentions scores
                <BiSolidRightArrow className={showBody ? "arr-down " : ""} />
              </button>
            </div>
            <div className={dimHeight()}>
              <EditDmgBody
                editParam={{
                  showBody,
                  setShowBody,
                  setIsTxt,
                  best,
                  item,
                  fieldFn,
                  fieldId,
                  isTxt,
                  pasteToText,
                  action,
                }}
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
    </>
  );
};

export default EditAreaDmg;
