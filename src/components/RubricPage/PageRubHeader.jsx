import React from "react";
import { Button } from "react-bootstrap";
import HotBtns from "../Hint/HotBtns";
import PageTxtEditBtns from "../EditBtns/PageTxtEditBtns";

const PageRubHeader = ({ editParam }) => {
  const {
    item,
    setItem,
    isHotBtns,
    setIsHotBtns,
    action,
    fieldFn,
    fieldId,

    pasteToText,
  } = editParam;

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-start mb-1">
      <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
        <div className="d-flex  align-items-center">
          <Button
            className={"btnToHis hintBtn" + (isHotBtns ? " isTmp" : "")}
            onClick={(e) => setIsHotBtns(!isHotBtns)}>
            HOT
          </Button>

          <PageTxtEditBtns
            fieldid={fieldId}
            action={action}
            statesVal={{
              handleTxt: item[fieldId],
              setHandleTxt: fieldFn.setNewVal,

              item,
              setItem,
            }}
          />
        </div>
      </div>
      {isHotBtns && <HotBtns toJustif={pasteToText} />}
    </div>
  );
};

export default PageRubHeader;
