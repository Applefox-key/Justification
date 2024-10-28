import React, { useRef, useState } from "react";
import {
  autoreplaceFormat,
  hotReplaceIssues,
  hotReplaceSuggestion,
  hotReplaceTmp,
  hotReplaceTone,
} from "../../constants/replacements";

import OneHotBtn from "./OneHotBtn";
import { useOutsideClick } from "../../hooks/useOutSideClick";

import { applyAction } from "../../utils/utilStr";
import { mainTmp } from "../../constants/textParts";
import RateHot from "../Rate/RateHot";

const HotBtns = ({ toJustif, action = "RAB" }) => {
  const [isOpen, setIsOpen] = useState(null);

  const refBox = useRef(null);
  useOutsideClick(refBox, () => setIsOpen(null));

  const btnsArr = [
    { name: "FORMAT", btns: autoreplaceFormat },
    { name: "TONE", btns: hotReplaceTone },
    { name: "ADVICE", btns: hotReplaceSuggestion },
    { name: "ISSUES", btns: hotReplaceIssues },
    { name: "TEMPLATES", btns: hotReplaceTmp },
  ];
  const onHandleCLick = (newT, model = "") => {
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    const newVal = applyAction(newFr_, action);

    toJustif(newVal);
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
      <button
        className="square-btn hotBtnGr intense"
        onClick={() => {
          toJustif(mainTmp);
        }}>
        TMP
      </button>
    </div>
  );
};

export default HotBtns;
