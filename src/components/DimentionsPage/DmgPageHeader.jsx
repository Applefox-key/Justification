import React from "react";
import { Button } from "react-bootstrap";

import HotBtns from "../Hint/HotBtns";

import PageTxtEditBtns from "../EditBtns/PageTxtEditBtns";
import SideBtnsFiled from "../EditBtns/SideBtnsFiled";
import DimAddDetail from "./DimAddDetail";

const DmgPageHeader = ({ editParam }) => {
  const {
    isHotBtns,
    setIsHotBtns,
    action,
    item,
    fieldFn,
    fieldId,
    isTxt,
    setIsTxt,

    setItem,
    pasteToText,
  } = editParam;
  return (
    <>
      <div className="dmg-page-menu">
        <div className="d-flex flex-wrap justify-content-between w-100 align-items-center">
          <div className="d-flex  align-items-center me-4">
            <Button
              className={"btnToHis hintBtn" + (isHotBtns ? " isTmp" : "")}
              onClick={(e) => setIsHotBtns(!isHotBtns)}>
              HOT
            </Button>{" "}
            <PageTxtEditBtns
              fieldid={fieldId}
              action={action}
              statesVal={{
                handleTxt: item[fieldId],
                setHandleTxt: fieldFn.setNewVal,
                isTxt,
                setIsTxt,
                item,
                setItem,
              }}
            />{" "}
          </div>
          <SideBtnsFiled
            fieldId={fieldId}
            statesVal={{
              handleTxt: item[fieldId],
              setHandleTxt: fieldFn.setNewVal,
            }}
          />
        </div>
        {isHotBtns && <HotBtns toJustif={pasteToText} />}
      </div>
      <div className="dmg-page-menu justify-content-between flex-nowrap">
        <div id="portal-sub-menu-left"> </div>
        <div id="portal-sub-menu"> </div>
      </div>
    </>
  );
};

export default DmgPageHeader;
