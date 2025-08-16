import React, { useCallback, useState } from "react";
import {
  editTextAction,
  replaceQuotes,
  replaceQuotes3,
  replaceText,
} from "../../utils/utilStr";
import { TbSlashes } from "react-icons/tb";
import { PiBracketsRoundBold } from "react-icons/pi";
import { BiSolidEraser } from "react-icons/bi";
import {
  RxLetterCaseCapitalize,
  RxLetterCaseLowercase,
  RxLetterCaseUppercase,
} from "react-icons/rx";
import { GrBlockQuote } from "react-icons/gr";
import MenuBtnsWrap from "../UI/MenuBtnsWrap";

const SideBtnsFiled = ({ statesVal, fieldId, alwaysOpen }) => {
  const { handleTxt, setHandleTxt } = statesVal;

  const applyAction = useCallback(
    (action, isIgnore = false) => {
      if (!fieldId) return;
      editTextAction(fieldId, handleTxt, setHandleTxt, action, isIgnore);
    },
    [fieldId, handleTxt, setHandleTxt]
  );

  const replace = (oldV, newV) => {
    const newVal = replaceText(fieldId, handleTxt, oldV, newV);
    setHandleTxt(newVal);
  };
  const replaceQ = () => {
    const newVal = replaceQuotes(handleTxt);
    setHandleTxt(newVal);
  };
  const replaceQQ = () => {
    const newVal = replaceQuotes3(handleTxt);
    setHandleTxt(newVal);
  };

  const btnsArr = [
    {
      groupName: "Replace",
      btns: [
        {
          title: "replace dash",
          label: "-",
          onClick: () => replace("-", "—"),
        },
        {
          title: "replace quotes",
          label: "«»",
          onClick: () => replaceQ(),
        },
        {
          title: "replace quotes",
          label: <GrBlockQuote />,
          onClick: () => replaceQQ(),
        },
      ],
    },
    {
      groupName: "Add",
      btns: [
        {
          title: "add quotation2 for selection",
          label: "«»",
          onClick: () => applyAction("quotation2", true),
        },
        {
          title: "add quotation for selection",
          label: `""`,
          onClick: () => applyAction("quotation", true),
        },
        {
          title: "to “” for selection",
          label: <GrBlockQuote />,
          onClick: () => applyAction("quotation3", true),
        },
        {
          title: "add staples for selection",
          label: <PiBracketsRoundBold />,
          onClick: () => applyAction("staples", true),
        },
      ],
    },
    {
      groupName: "List",
      btns: [
        {
          title: "add quotation to every line",
          label: `"L`,
          onClick: () => applyAction("quotationL", true),
        },
        {
          title: `add quotation to every pair line with the text "instead of"`,
          label: `"LI`,
          onClick: () => applyAction("quotationLI", true),
        },
        {
          title: `add quotation to every line with the text "it is better to use"`,
          label: `"LB`,
          onClick: () => applyAction("quotationLB", true),
        },
      ],
    },
    {
      groupName: "Case",
      btns: [
        {
          title: "Uppercase first letter",
          label: <RxLetterCaseCapitalize />,
          onClick: () => applyAction("upFirst"),
        },
        {
          title: "Lowercase",
          label: <RxLetterCaseLowercase />,
          onClick: () => applyAction("down"),
        },
        {
          title: "Uppercase",
          label: <RxLetterCaseUppercase />,
          onClick: () => applyAction("up"),
        },
      ],
    },
    {
      groupName: "Selection",
      btns: [
        {
          title: "accent selection",
          label: <TbSlashes />,
          onClick: () => applyAction("accent"),
        },
        {
          title: "delete selection",
          label: <BiSolidEraser />,
          onClick: () => applyAction("delSel"),
        },
      ],
    },
  ];

  return (
    <div className="sidebtns-box-field">
      <MenuBtnsWrap alwaysOpen={alwaysOpen} btnsArr={btnsArr} />
    </div>
  );
};

export default SideBtnsFiled;
