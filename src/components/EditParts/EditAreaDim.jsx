import React, { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { editTextActionRef, applyAction } from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import SideBtns from "../Edit/SideBtns";
import { saveToHistory } from "../../utils/localStorage";
import RateBoxes from "../Rate/RateBoxes";
import { FaArrowCircleDown, FaStar } from "react-icons/fa";
import { usePopup } from "../../hooks/usePopup";
import EditFieldDim from "./EditFieldDim";
import { arrA, arrB, defaultDim } from "../../constants/textParts";
import EditAreaHeader from "./EditAreaHeader";
import EditAreaFooter from "./EditAreaFooter";
import ComposeRate from "./ComposeRate";

const EditAreaDim = ({ actionFn, item, setItem, action, setIsCheckerMode }) => {
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

  const compose = (r) => {
    const ar = r === 1 ? arrA : arrB;
    const newArr = ar
      .filter((it) => item[it] && item[it] !== "OK")
      .map((el) => item[el]);
    setItem({ ...item, Justif: newArr.join(`\n`) });
  };
  const composeRate = () => {
    const rateStr = best.title;

    setItem({
      ...item,
      "Rate": `${rateStr}\n ${item.Rate} `,
    });
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
  const handleRate = (val) => {
    let v = best.num === val.num ? -1 : val.num;
    setBest(
      v === -1
        ? { num: -1, title: "", fields: [] }
        : { ...val, title: val.title, fields: bestField(v) }
    );
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
            <div className=" dimBox">
              <div className="respDim">
                {arrA.map((field, i) => (
                  <>
                    <EditFieldDim
                      key={i}
                      fieldName={field}
                      placeholder={field}
                      setIsTxt={setIsTxt}
                      scale="right"
                      classN={
                        (fieldId === field
                          ? "dimField active-field"
                          : "dimField") +
                        (best.fields.includes(field) ? " best-field" : "")
                      }
                      isTxt={isTxt && fieldId === field}
                      isActive={fieldId === field}
                      fieldVal={item[field]}
                      estim={item.Evals[field]}
                      fieldFn={fieldFn}
                    />
                    {best.fields.includes(field) && (
                      <FaStar className={field + "best star"} />
                    )}
                  </>
                ))}
              </div>
              {/* <div className="respDimEv">
                {[...arrA, ...arrB].map((field, i) => (
                  <></>
                ))}
              </div> */}
              <div className="respDim">
                {arrB.map((field, i) => (
                  <>
                    <EditFieldDim
                      scale="left"
                      key={i}
                      fieldName={field}
                      placeholder={field}
                      setIsTxt={setIsTxt}
                      classN={
                        (fieldId === field
                          ? "dimField active-field"
                          : "dimField") +
                        (best.fields.includes(field) ? " best-field" : "")
                      }
                      isTxt={isTxt && fieldId === field}
                      isActive={fieldId === field}
                      fieldVal={item[field]}
                      estim={item.Evals[field]}
                      fieldFn={fieldFn}
                    />
                    {best.fields.includes(field) && (
                      <FaStar className={field + "best star"} />
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="edit-parts-menu">
              <div className="d-flex">
                <Button
                  className="btn-back square-btn "
                  onClick={composeRate}
                  title=" small or big field for the reason">
                  <FaArrowCircleDown />
                </Button>
                <RateBoxes
                  action={action}
                  choosed={best.num}
                  callback={handleRate}
                />
              </div>
              <ComposeRate compose={compose} clear={clear} best={best} />{" "}
              <button onClick={clear}>clear all parts</button>{" "}
            </div>
            <div className="respDim-footer">
              <EditFieldDim
                scale=""
                key={"Rate"}
                fieldName={"Rate"}
                placeholder={"Rate"}
                setIsTxt={setIsTxt}
                classN={
                  (fieldId === "Rate" ? "dimField active-field" : "dimField") +
                  (best.fields.includes("Rate") ? " best-field" : "")
                }
                isTxt={isTxt && fieldId === "Rate"}
                isActive={fieldId === "Rate"}
                fieldVal={item["Rate"]}
                fieldFn={fieldFn}
              />{" "}
              <EditFieldDim
                scale=""
                key={"Justif"}
                fieldName={"Justif"}
                placeholder={"Justif"}
                setIsTxt={setIsTxt}
                classN={
                  (fieldId === "Justif"
                    ? "dimField active-field"
                    : "dimField") +
                  (best.fields.includes("Justif") ? " best-field" : "")
                }
                isTxt={isTxt && fieldId === "Justif"}
                isActive={fieldId === "Justif"}
                fieldVal={item["Justif"]}
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

      <EditAreaFooter
        editParam={{
          toHist,
          setIsCheckerMode,
          item,
          fieldFn,
          fieldId,
          onOK,
        }}
      />
    </>
  );
};

export default EditAreaDim;
