import React, { useMemo, useState } from "react";
import { editTextActionRef, applyAction } from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import { saveToHistorygeneral } from "../../utils/localStorage";
import { usePopup } from "../../hooks/usePopup";
import { defaultRubJust } from "../../constants/textParts";

import { createFieldFn } from "../../utils/rubricsFn";
import DmgPageTask from "../DimentionsPage/DmgPageTask";
import MyPortal from "../UI/MyPortal/MyPortal";
import RubBodyTabs from "./RubBodyTabs";
import SideBtnsFiled from "../EditBtns/SideBtnsFiled";
import RubPageBtns from "../EditBtns/RubPageBtns";
import PageRubHeader from "./PageRubHeader";

const RubricPageBody = ({ actionFn, item, setItem, action }) => {
  const [textRef, setTextRef] = useState(null);
  const [textSelected, setTextSelected] = useState("");
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);

  // eslint-disable-next-line no-unused-vars

  const [countR, setCountR] = useState(4);

  const fieldId = useMemo(() => {
    return textRef && textRef.current && textRef.current.id
      ? textRef.current.id
      : "prompt";
  }, [textRef]);

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
    const defaulRUB = defaultRubJust;
    const newV = notAllFields
      ? {
          ...defaulRUB,
          ...(item.id && { id: item.id }),
          ...(item.name && { name: item.name }),
        }
      : { ...defaulRUB };
    setItem(newV);
  };
  const onOK = (e) => {
    e.stopPropagation();
    const val = JSON.stringify(item);

    clear();
    if (!!actionFn) actionFn(val);
  };

  return (
    <>
      <MyPortal containerId="navidPortalCenter">
        <div className="task-head-box">
          <div className="taskidBox">
            <DmgPageTask
              editParam={{
                item,
                fieldFn,
                fieldId,
              }}
            />
          </div>
          <RubPageBtns
            fieldFn={fieldFn}
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
      <div className="dmg-page-menu ">
        <PageRubHeader
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
        <SideBtnsFiled
          fieldId={fieldId}
          alwaysOpen
          statesVal={{
            handleTxt: fieldFn.getFieldValue(),
            setHandleTxt: fieldFn.setNewVal,
          }}
        />
      </div>
      <div className="task-head-box"></div>
      <div
        onClick={clickOnPhrase}
        onTouchEnd={clickOnPhrase}
        className="editarearub pagedimbody">
        <span className="fieldid-t">{fieldId}</span>
        <div className="d-flex edit100 h-100 ">
          {isTemplates && <TemplatesBox edit toJustif={pasteToText} />}
          <div className="editParts-wrap">
            <div className="rubBoxPage">
              <RubBodyTabs
                editParam={{
                  item,
                  setItem,
                  fieldFn,
                  fieldId,
                  pasteToText,
                  action,
                  countR,
                  setCountR,
                }}>
                <div>
                  <button onClick={fieldFn.setVersion} className="button-count">
                    Version:
                    <span className={item.version === 0 ? "pinkB" : ""}>0</span>
                    {"/"}{" "}
                    <span className={item.version === 1 ? "pinkB" : ""}>1</span>
                    {/* <span>{countR}</span> */}
                  </button>
                  <button onClick={fieldFn.setRCount} className="button-count">
                    Resp. num:
                    <span className={item.countR === 2 ? "pinkB" : ""}>2</span>
                    {"/"}{" "}
                    <span className={item.countR === 3 ? "pinkB" : ""}>3</span>
                    {"/"}{" "}
                    <span className={item.countR === 4 ? "pinkB" : ""}>4</span>
                    {/* <span>{countR}</span> */}
                  </button>
                </div>
              </RubBodyTabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RubricPageBody;
