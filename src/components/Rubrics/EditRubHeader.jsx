import React from "react";
import { Button } from "react-bootstrap";
import TopBtns from "../EditBtns/TopBtns";
import HotBtns from "../Hint/HotBtns";

import TopBtnsEnd from "../EditBtns/TopBtnsEnd";
import FlowerBtn from "../EditBtns/FlowerBtn";

const EditRubHeader = ({ editParam }) => {
  const {
    item,
    setItem,

    isHotBtns,
    setIsHotBtns,
    action,
    fieldFn,
    fieldId,
    onOK,
    pasteToText,
  } = editParam;

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-start mb-1 w-100">
      <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
        <div className="d-flex  align-items-center">
          <Button
            className={"btnToHis hintBtn" + (isHotBtns ? " isTmp" : "")}
            onClick={(e) => setIsHotBtns(!isHotBtns)}>
            HOT
          </Button>
          <TopBtns
            action={action}
            type="RUB"
            statesVal={{
              handleTxt: fieldFn.getFieldValue(fieldId),
              setHandleTxt: fieldFn.setNewVal,
              item,
              setItem,
            }}
          />
          <FlowerBtn
            className="btnToHis hintBtn"
            fieldId={fieldId}
            fieldFn={fieldFn}
          />
        </div>
        <TopBtnsEnd
          action={action}
          statesVal={{
            handleTxt: fieldFn.getFieldValue(fieldId),
            setHandleTxt: fieldFn.setNewVal,
            item,
            setItem,
            type: "RUB",
          }}
          onOK={onOK}
        />
      </div>
      {isHotBtns && <HotBtns toJustif={pasteToText} />}
    </div>
  );
};

export default EditRubHeader;
