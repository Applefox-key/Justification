import React, { useMemo, useState } from "react";
import { editTextActionRef, applyAction } from "../../utils/utilStr";
import TemplatesBox from "../TextParts/TemplatesBox";
import SideBtns from "../EditBtns/SideBtns";
import { saveToHistory } from "../../utils/localStorage";
import { usePopup } from "../../hooks/usePopup";
import { defaultRubJust } from "../../constants/textParts";

import { createFieldFn } from "../../utils/rubricsFn";
import EditRubHeader from "../Rubrics/EditRubHeader";
import EditFieldRub from "../Rubrics/EditFieldRub";
import Rubricator from "../Rubrics/Rubricator";
import DmgPageTask from "../DimentionsPage/DmgPageTask";
import MyPortal from "../UI/MyPortal/MyPortal";
import RubBodyTabs from "./RubBodyTabs";
import SideBtnsFiled from "../EditBtns/SideBtnsFiled";

const RubricPageBody = ({ actionFn, item, setItem, action }) => {
  const [textRef, setTextRef] = useState(null);
  const [textSelected, setTextSelected] = useState("");
  const [isTemplates, setIsTemplates] = useState(false);
  const [isHotBtns, setIsHotBtns] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
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
    saveToHistory({ en: handleTxt, ru: "RUB" });
    setPopup("info has been added to the history");
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

  return (
    <>
      <div className="dmg-page-menu">
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
      </div>
      <div className="task-head-box">
        <SideBtnsFiled
          fieldId={fieldId}
          alwaysOpen
          statesVal={{
            handleTxt: fieldFn.getFieldValue(),
            setHandleTxt: fieldFn.setNewVal,
          }}
        />
        <div className="taskidBox">
          <DmgPageTask
            editParam={{
              item,
              fieldFn,
              fieldId,
            }}
          />
        </div>
      </div>
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
                }}
              />
            </div>
          </div>
        </div>
        {/* <SideBtns
          fieldId={fieldId}
          handleTxt1={gv()}
          statesVal={{
            handleTxt: fieldFn.getFieldValue(),
            setHandleTxt: fieldFn.setNewVal,
          }}
          textSelected={textSelected}
        /> */}
      </div>
    </>
  );
};

export default RubricPageBody;
