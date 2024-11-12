import React, { useRef, useState } from "react";
import {
  autoreplaceFormat,
  autoreplaceGrammar,
  hotReplaceIssues,
  hotReplaceJustif,
  hotReplaceRewiew,
  hotReplaceSuggestion,
  hotReplaceTmp,
  hotReplaceTone,
} from "../../constants/replacements";

import OneHotBtn from "./OneHotBtn";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import { applyAction, copyToClipboard } from "../../utils/utilStr";
import RateHot from "../Rate/RateHot";
import { usePopup } from "../../hooks/usePopup";

const HotBtns = ({ toJustif, action = "RAB" }) => {
  const [isOpen, setIsOpen] = useState(null);
  const refBox = useRef(null);
  useOutsideClick(refBox, () => setIsOpen(null));
  const setPopup = usePopup();
  const btnsArr = [
    { name: "FORMAT", btns: autoreplaceFormat },
    { name: "TONE", btns: hotReplaceTone },
    { name: "ADVICE", btns: hotReplaceSuggestion },
    { name: "GRAMMAR", btns: autoreplaceGrammar },
    { name: "ISSUES", btns: hotReplaceIssues },
    { name: "TEMPLATES", btns: hotReplaceTmp },
    { name: "JUSTIFICATION", btns: hotReplaceJustif },
    { name: "REVIEW", btns: hotReplaceRewiew },
  ];
  const onHandleCLick = (e, newT, model = "") => {
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
      <RateHot callback={onHandleCLick} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default HotBtns;
