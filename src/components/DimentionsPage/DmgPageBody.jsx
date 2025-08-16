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
import DmgPageHeader from "./DmgPageHeader";
import DmgPageTask from "./DmgPageTask";
import DmgPageDim from "./PageBodyTabs";
import PageBodyTabs from "./PageBodyTabs";
import MyPortal from "../UI/MyPortal/MyPortal";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
import { useRateLikert } from "../../hooks/useRateLikert";
import SideBtnsFiled from "../EditBtns/SideBtnsFiled";

const DmgPageBody = ({ actionFn, item, setItem, action, setIsCheckerMode }) => {
  const [textSelected, setTextSelected] = useState("");
  // const [best, setBest] = useState({ num: -1, title: "", fields: [], rec: "" });
  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [isSetBtn, setIsSetBtn] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const [addIssueName, setAddIssueName] = useState(false);

  const { setNewRate, titleChoosed, best, setBest } = useRateLikert({
    action,
    item,
    setItem,
  });

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
      const newEst = { ...item.Evals, [field]: val };
      if (addIssueName) {
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
        setItem({ ...item, Evals: newEst, ...{ [field]: newT } });
      } else setItem({ ...item, Evals: newEst });

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
    return "dimBoxPage";
  };
  return (
    <>
      <DmgPageHeader
        editParam={{
          clear,
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
      />

      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="pagedimbody">
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}

          <div className="editParts-wrap">
            <div className="task-head-box">
              <SideBtnsFiled
                fieldId={fieldId}
                alwaysOpen
                statesVal={{
                  handleTxt: item[fieldId],
                  setHandleTxt: fieldFn.setNewVal,
                }}
              />
              <div className="taskidBox">
                <div className="add-details">
                  <input
                    id="issueNameCh"
                    type="checkbox"
                    checked={addIssueName}
                    onChange={() => setAddIssueName(!addIssueName)}
                  />
                  <label htmlFor="issueNameCh">add dimention name issue </label>
                </div>
                <DmgPageTask
                  editParam={{
                    setIsTxt,
                    item,
                    fieldFn,
                    fieldId,
                    isTxt,
                  }}
                />
              </div>
            </div>
            <div className={dimHeight()}>
              <PageBodyTabs
                editParam={{
                  setBest,
                  setIsTxt,
                  best,
                  item,
                  setItem,
                  fieldFn,
                  fieldId,
                  isTxt,
                  pasteToText,
                  action,
                  setNewRate,
                  titleChoosed,
                }}
              />
            </div>
          </div>
        </div>
        {/* <SideBtns
          fieldId={fieldId}
          statesVal={{
            handleTxt: item[fieldId],
            setHandleTxt: fieldFn.setNewVal,
            isTxt,
            setIsTxt,
          }}
          textSelected={textSelected}
        /> */}
      </div>
    </>
  );
};

export default DmgPageBody;
