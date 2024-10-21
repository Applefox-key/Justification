import React, { useEffect, useRef, useState } from "react";
import {
  autoreplaceFormat,
  hotReplaceSuggestion,
  hotReplaceTone,
} from "../../constants/replacements";

import OneHotBtn from "./OneHotBtn";
import { useOutsideClick } from "../../hooks/useOutSideClick";

import {
  replaceNum,
  replaceWords,
  replaceWordsInteractions,
} from "../../utils/utilStr";
import { mainTmp } from "../../constants/textParts";
import RateHot from "../Rate/RateHot";

const HotBtns = ({ toJustif, handleTxt, setHandleTxt }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [action, setAction] = useState("@R");

  const refBox = useRef(null);
  useOutsideClick(refBox, () => setIsOpen(null));

  useEffect(() => {
    const newVal = localStorage.getItem("lastAction") || "@R";
    if (newVal !== action) setAction(newVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const btnsArr = [
    { name: "FORMAT", btns: autoreplaceFormat },
    { name: "TONE", btns: hotReplaceTone },
    { name: "ADVICE", btns: hotReplaceSuggestion },

    // { name: "eval", btns: autoReplaceEval },

    // { name: "advice", btns: hotreplaceSuggest },
  ];
  const onHandleCLick = (newT, model = "") => {
    let newFr_ = model ? newT.replace(/BotModel/g, "BotModel" + model) : newT;
    const newVal =
      action === "@R"
        ? replaceNum(newFr_)
        : action === "RAB"
        ? replaceWords(newFr_)
        : replaceWordsInteractions(newFr_);
    toJustif(newVal);
  };
  return (
    <div className="hot " ref={refBox}>
      <button
        className="square-btn hotBtnGr "
        onClick={() => {
          const newval =
            action === "@R" ? "RAB" : action === "RAB" ? "INT" : "@R";
          localStorage.setItem("lastAction", newval);
          setAction(newval);
        }}>
        {action}
      </button>
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
