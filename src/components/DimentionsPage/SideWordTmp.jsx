import React from "react";
import { editTextAction } from "../../utils/utilStr";
import MenuBtnsWrap from "../UI/MenuBtnsWrap";
import { wordBtnsData } from "../../constants/sideBtnsFiled";
import { useRightClickCopy } from "../../hooks/useRightClickCopy";

const SideWordTmp = ({ editParam }) => {
  // const { handleTxt, setHandleTxt, fieldId } = editParam;
  const fieldId = editParam.fieldId;
  const handleTxt = editParam.item[fieldId];
  const setHandleTxt = editParam.fieldFn.setNewVal;
  const pasteToText = (val) => {
    editTextAction(fieldId, handleTxt, setHandleTxt, "add", true, val);
  };
  const btnsArr = wordBtnsData({
    pasteToText,
  });
  const onContextMenuClick = useRightClickCopy();
  const onHandleCLick = (e, btn) => {
    let b = e.button;
    e.stopPropagation();
    if (b === 2 && btn.RightClickCopy) onContextMenuClick(e, btn.title);
    else if (btn.onClick) btn.onClick(e);
  };
  return (
    <div className="sidebtns-box-tmp">
      {btnsArr.map((btn, i) => (
        <button
          className={` ${btn?.bold ? " colorBtn" : ""}`}
          title={btn.title}
          onMouseDown={(e) => onHandleCLick(e, btn)}
          onContextMenu={(e) => onHandleCLick(e, btn)}>
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default SideWordTmp;
