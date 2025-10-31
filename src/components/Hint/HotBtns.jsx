import React, { useMemo, useRef, useState } from "react";
import OneHotBtn from "./OneHotBtn";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import { applyAction } from "../../utils/utilStr";
import RateHot from "../Rate/RateHot";

import { txtHotReplaceGet } from "../../utils/localStorage";
import { useRightClickCopy } from "../../hooks/useRightClickCopy";

const HotBtns = ({ toJustif, action = "RAB", btnsArrD = null }) => {
  const [isOpen, setIsOpen] = useState(null);
  const refBox = useRef(null);
  useOutsideClick(refBox, () => setIsOpen(null));
  // const setPopup = usePopup();
  const btnsArr = useMemo(() => (btnsArrD === null ? txtHotReplaceGet() : btnsArrD), [btnsArrD]);

  const onContextMenuClick = useRightClickCopy();
  const onHandleCLick = (e, newT, model = "") => {
    e.stopPropagation();
    let b = e.button;
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    const newVal = applyAction({ text: newFr_, action });
    if (b === 0) {
      //left mouse button
      toJustif(newVal);
      return;
    } //right mouse button
    if (b === 2) onContextMenuClick(e, newVal);
  };
  return (
    <div className="hot " ref={refBox}>
      {btnsArr.map((oneBtn, btni) => (
        <OneHotBtn
          key={btni}
          oneBtn={oneBtn}
          toJustif={onHandleCLick}
          onContextMenuClick={onContextMenuClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ))}
      {!btnsArrD && <RateHot callback={onHandleCLick} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default HotBtns;
