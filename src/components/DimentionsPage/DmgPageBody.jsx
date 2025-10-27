import React, { useMemo, useState } from "react";
import { editTextActionRef, applyAction, getNameByAorB } from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";

import { saveToHistorygeneral } from "../../utils/localStorage";
import { usePopup } from "../../hooks/usePopup";

import DmgPageHeader from "./DmgPageHeader";
import DmgPageTask from "./DmgPageTask";

import PageBodyTabs from "./PageBodyTabs";

import { useRateLikert } from "../../hooks/useRateLikert";

import MyPortal from "../UI/MyPortal/MyPortal";

import PageBtns from "../EditBtns/PageBtns";
import { defaultKey } from "../../utils/defaultKey";
import DimAddDetail from "./DimAddDetail";
import { getNewOrParseDmg } from "../../utils/dimentions";

const DmgPageBody = ({ actionFn, item, setItem, action }) => {
  const [textSelected, setTextSelected] = useState("");

  const [isTxt, setIsTxt] = useState(false);
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);
  const [isSetBtn, setIsSetBtn] = useState(false);
  const [textRef, setTextRef] = useState(null);
  const [addIssueName, setAddIssueName] = useState(false);

  const likert = useRateLikert({
    action,
    item,
    setItem,
  });

  const fieldId = useMemo(() => {
    return textRef && textRef.current && textRef.current.id ? textRef.current.id : "Prompt";
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
          newT = fieldName + " issues:" + (newT.startsWith("OK") ? newT.replace("OK", "") : " " + newT);
        }
        setItem({ ...item, Evals: newEst, ...{ [field]: newT } });
      } else setItem({ ...item, Evals: newEst });

      likert.getRecomendation(newEst);
    },
    setNewVal: (val) => {
      const field = fieldId;
      setItem({ ...item, [field]: val });
    },
    setNewValF: (val, fieldVal) => {
      setItem({ ...item, [fieldVal]: val });
    },
    onKeyDown: (e) => {
      defaultKey(e, fieldId, item[fieldId], fieldFn.setNewVal, action);
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
    editTextActionRef(textRef, item[fieldId], fieldFn.setNewVal, "add", true, newVal);
  };

  const setPopup = usePopup();
  const toHist = () => {
    const handleTxt = JSON.stringify(item);
    saveToHistorygeneral({ en: handleTxt, ru: "DIM" }, setPopup);
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

    likert.setBest({ num: -1, title: "", fields: [] });
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
      <MyPortal containerId="navidPortalCenter">
        <div className="task-head-box">
          <div className="taskidBox">
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
          <PageBtns
            fieldid={fieldId}
            action={action}
            clear={clear}
            statesVal={{
              handleTxt: item[fieldId],
              setHandleTxt: fieldFn.setNewVal,
              item,
              setItem,
            }}
          />
        </div>
      </MyPortal>
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
      <div onClick={clickOnPhrase} onTouchEnd={clickOnPhrase} className="pagedimbody">
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}

          <div className="editParts-wrap">
            <div id="portal-got-resp"></div>
            <div className={dimHeight()}>
              <PageBodyTabs
                editParam={{
                  setIsTxt,
                  item,
                  setItem,
                  fieldFn,
                  fieldId,
                  isTxt,
                  pasteToText,
                  action,
                }}
                likert={likert}>
                <div className="taskidBox w-100">
                  <DimAddDetail
                    id="issueNameCh"
                    title="add dim name to issue"
                    val={addIssueName}
                    setVal={setAddIssueName}
                  />
                </div>
                <div id="portal-on-tabs"> </div>
              </PageBodyTabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DmgPageBody;
