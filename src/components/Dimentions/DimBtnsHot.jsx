import React from "react";
import { applyAction, copyToClipboard } from "../../utils/utilStr";
import { defaultDimSets } from "../../constants/textParts";

const DimBtnsHot = ({ field, pasteToText, action, set }) => {
  const onHandleCLick = (e, newT, model = "") => {
    e.stopPropagation();
    let b = e.button;
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    const newVal = applyAction(newFr_, action);
    if (b === 0) {
      //left mouse button
      pasteToText(newVal);
      return;
    } //right mouse button
    if (b === 2) {
      e.preventDefault();
      copyToClipboard(newVal);
      pasteToText("copied to the clipboard");
    }
  };

  //   const btns = defaultDimSets[field].justif;
  //   console.log(defaultDimSets[set][field].justif || []);
  //   console.log(field.justif);
  //   console.log(field.justif | "no");

  return (
    <div className="hot  w-100">
      <div className="hot-menu  w-100">
        <button className="square-btn hotBtnGr intense">{field.name}</button>
        <div className="hot-sum  w-100">
          {field.justif &&
            field.justif.length &&
            field.justif.map((btn, i) => (
              <button
                className="square-btn hot-sub-btn"
                title={btn.newT}
                onMouseDown={(e) => onHandleCLick(e, btn.newT)}
                onContextMenu={(e) => onHandleCLick(e, btn.newT)}>
                {btn.title}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DimBtnsHot;
