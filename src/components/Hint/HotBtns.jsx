import React, { useMemo, useRef, useState } from "react";
import OneHotBtn from "./OneHotBtn";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import { applyAction, copyToClipboard } from "../../utils/utilStr";
import RateHot from "../Rate/RateHot";
import { usePopup } from "../../hooks/usePopup";
import { txtHotReplaceGet } from "../../utils/localStorage";

const HotBtns = ({ toJustif, action = "RAB", btnsArrD = null }) => {
  const [isOpen, setIsOpen] = useState(null);
  const refBox = useRef(null);
  useOutsideClick(refBox, () => setIsOpen(null));
  const setPopup = usePopup();
  const btnsArr = useMemo(
    () => (btnsArrD === null ? txtHotReplaceGet() : btnsArrD),
    [btnsArrD]
  );
  //  [
  //   { name: "FORMAT", btns: autoreplaceFormat },
  //   { name: "TONE", btns: hotReplaceTone },
  //   { name: "GRAMMAR", btns: autoreplaceGrammar },
  //   { name: "JUSTIFICATION", btns: hotReplaceJustif },
  //   { name: "ISSUES", btns: hotReplaceIssues },
  //   { name: "ADVICE", btns: hotReplaceSuggestion },
  //   { name: "TEMPLATES", btns: hotReplaceTmp },
  //   { name: "REVIEW", btns: hotReplaceRewiew },
  // ];
  const onHandleCLick = (e, newT, model = "") => {
    e.stopPropagation();
    let b = e.button;
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    const newVal = applyAction(newFr_, action);
    if (b === 0) {
      //left mouse button
      toJustif(newVal);
      return;
    } //right mouse button
    if (b === 2) {
      e.preventDefault();
      copyToClipboard(newVal);
      setPopup("copied to the clipboard");
    }
  };

  return (
    <div className="hot " ref={refBox}>
      {btnsArr.map((oneBtn, btni) => (
        <OneHotBtn
          key={btni}
          oneBtn={oneBtn}
          toJustif={onHandleCLick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ))}
      {!btnsArrD && (
        <RateHot
          callback={onHandleCLick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default HotBtns;
