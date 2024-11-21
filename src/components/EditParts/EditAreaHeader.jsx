import React from "react";
import { Button } from "react-bootstrap";
import TopBtns from "../Edit/TopBtns";
import HotBtns from "../Hint/HotBtns";
import VoiceDragable from "../Voice/VoiceDragable";
import { voiceToEdit } from "../../utils/utilStr";
import TopBtnsEnd from "../Edit/TopBtnsEnd";

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
    <div className="d-flex flex-wrap align-items-center justify-content-start mb-1 w-100">
      <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
        <div className="d-flex  align-items-center">
          <Button
            className={"btnToHis" + (isTemplates ? " isTmp" : "")}
            onClick={(e) => setIsTemplates(!isTemplates)}>
            Templates
          </Button>
          <Button
            className={"btnToHis hintBtn" + (isHotBtns ? " isTmp" : "")}
            onClick={(e) => setIsHotBtns(!isHotBtns)}>
            HOT
          </Button>{" "}
          <TopBtns
            action={action}
            statesVal={{
              handleTxt: item[fieldId],
              setHandleTxt: fieldFn.setNewVal,
              isTxt,
              setIsTxt,
              item,
              setItem,
            }}
            onOK={onOK}
          />
          <VoiceDragable
            nameF={fieldId}
            toJustif={(txt) => {
              voiceToEdit(txt, item[fieldId], fieldFn.setNewVal, fieldId);
            }}
          />{" "}
        </div>
        <TopBtnsEnd
          action={action}
          statesVal={{
            handleTxt: item[fieldId],
            setHandleTxt: fieldFn.setNewVal,
            isTxt,
            setIsTxt,
            item,
            setItem,
          }}
          onOK={onOK}
        />
        {/* <div className="d-flex  align-items-center">
          <BtnArchive txt={item} setTxt={setItem} />
          <Button className="btnToHis" onClick={onOK}>
            OK
          </Button>
        </div> */}
      </div>
      {isHotBtns && <HotBtns toJustif={pasteToText} />}
    </div>
  );
};

export default EditAreaHeader;
