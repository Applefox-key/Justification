import React from "react";
import { applyAction } from "../../utils/utilStr";
import { useRightClickCopy } from "../../hooks/useRightClickCopy";

const DimBtnsHot = ({ field, pasteToText, action, set }) => {
  const getNewVal = (newT, model = "") => {
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    return applyAction(newFr_, action);
  };

  const onHandleCLick = (e, newT, model = "") => {
    e.stopPropagation();
    const newVal = getNewVal(newT);
    pasteToText(newVal);
    return;
  };
  const onContextMenuClick = useRightClickCopy(getNewVal);
  return (
    <div className="hot  w-100">
      <div className="hot-menu  w-100">
        <button className="square-btn hotBtnGr intense">{field.name}</button>
        <div className="hot-sum  w-100">
          {field.justif &&
            field.justif.length &&
            field.justif.map((btn, i) => (
              <button
                key={i}
                className={`square-btn hot-sub-btn ${
                  btn?.bold ? " colorBtn" : ""
                }`}
                title={btn.newT}
                onClick={(e) => onHandleCLick(e, btn.newT)}
                onContextMenu={(e) => onContextMenuClick(e, btn.newT)}>
                {btn.title}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DimBtnsHot;
