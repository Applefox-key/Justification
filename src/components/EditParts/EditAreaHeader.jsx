import React from "react";
import { Button } from "react-bootstrap";
import TopBtns from "../Edit/TopBtns";
import BtnArchive from "../Edit/BtnArchive";
import HotBtns from "../Hint/HotBtns";

const EditAreaHeader = ({ editParam }) => {
  const {
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
  } = editParam;
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-start mb-1">
      <Button
        className={"btnToHis" + (isTemplates ? " isTmp" : "")}
        onClick={(e) => setIsTemplates(!isTemplates)}>
        Templates
      </Button>
      <Button
        className={"btnToHis hintBtn" + (isHotBtns ? " isTmp" : "")}
        onClick={(e) => setIsHotBtns(!isHotBtns)}>
        HOT
      </Button>
      <TopBtns
        action={action}
        statesVal={{
          handleTxt: item[fieldId],
          setHandleTxt: fieldFn.setNewVal,
          isTxt,
          setIsTxt,
        }}
        onOK={onOK}
      />
      <BtnArchive txt={item} setTxt={setItem} />
      {isHotBtns && <HotBtns toJustif={pasteToText} />}
    </div>
  );
};

export default EditAreaHeader;
