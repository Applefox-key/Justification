import React, { useEffect, useState } from "react";
import { applyAction } from "../../utils/utilStr";
import { useRightClickCopy } from "../../hooks/useRightClickCopy";

const DimBtnsHot = ({ field, pasteToText, action, set }) => {
  const [open, setOpen] = useState(field?.justif?.length < 15);

  const getNewVal = (newT, model = "") => {
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    return applyAction(newFr_, action);
  };
  useEffect(() => {
    const val = field?.justif?.length < 15;
    if (val !== open) setOpen(val);
  }, [field]);
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
        <button className="square-btn hotBtnGr intense" onClick={() => setOpen(!open)}>
          {field.name}
        </button>
        <div className="hot-sum  w-100">
          {field.justif &&
            field.justif.length &&
            (!open ? field.justif.filter((el) => el.bold) : field.justif).map((btn, i) => (
              <button
                key={i}
                className={`square-btn hot-sub-btn ${btn?.bold ? " colorBtn" : ""}`}
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
