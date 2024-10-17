import React, { useEffect, useRef, useState } from "react";
import {
  autoreplaceDash,
  autoReplaceEval,
  autoreplaceNum,
  hotreplaceSuggest,
} from "../../constants/replacements";

import OneHotBtn from "./OneHotBtn";
import { useOutsideClick } from "../../hooks/useOutSideClick";

import {
  replaceNum,
  replaceWords,
  replaceWordsInteractions,
} from "../../utils/utilStr";
import { mainTmp } from "../../constants/textParts";

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
    { name: "num", btns: autoreplaceNum },
    { name: "eval", btns: autoReplaceEval },
    { name: "dash", btns: autoreplaceDash },
    { name: "advice", btns: hotreplaceSuggest },
  ];

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
          toJustif={(newFr) => {
            const newVal =
              action === "@R"
                ? replaceNum(newFr)
                : action === "RAB"
                ? replaceWords(newFr)
                : replaceWordsInteractions(newFr);
            toJustif(newVal);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ))}
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
