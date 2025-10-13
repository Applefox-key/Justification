import React, { useCallback } from "react";
import {
  editTextAction,
  replaceQuotesUniversal,
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
import { BsList } from "react-icons/bs";
import { LuListTree } from "react-icons/lu";
import { RiArrowGoForwardLine } from "react-icons/ri";

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
  const replaceQU = (type) => {
    // const newVal = replaceQuotes(handleTxt);
    const newVal = replaceQuotesUniversal(handleTxt, type);
    setHandleTxt(newVal);
  };

  const pasteToText = (val) => {
    editTextAction(fieldId, handleTxt, setHandleTxt, "add", true, val);
  };
  const subList = [
    "Additionally",
    "Although",
    "For example:",
    "For example,",
    "However,",
    "Otherwise",
  ].map((el) => {
    return {
      title: el,
      RightClickCopy: true,
      label: el,
      onClick: () => pasteToText(el),
    };
  });

  const btnsArr = [
    {
      groupName: "HOT",
      btns: [
        {
          title: "replace quotes",
          label: (
            <>
              <RiArrowGoForwardLine />
              <GrBlockQuote />
            </>
          ),
          onClick: () => replaceQU(),
        },
        {
          title: "to “” for selection",
          label: (
            <>
              +
              <GrBlockQuote />
            </>
          ),
          onClick: () => applyAction("quotation3", true),
        },
        {
          title: `add quotation to every line with the text and remove ENTER`,
          label: <LuListTree />,
          bold: true,
          onClick: () => applyAction("transformAll", true),
        },
        {
          title: "Uppercase first letter",
          label: <RxLetterCaseCapitalize />,
          onClick: () => applyAction("upFirst"),
        },
        {
          title: "Adding a words",
          label: "words",
          onClick: () => applyAction("upFirst"),
          subList: [
            ...subList,
            {
              title: "The response",
              label: "The response",
              RightClickCopy: true,
              bold: true,
              onClick: () => pasteToText("The response"),
            },
            {
              title:
                "Since responses are useless, and both models are not useful as an assistant, the system prompt is also failed.",
              label: "system prompt (both)",
              bold: true,
              RightClickCopy: true,
              onClick: () =>
                pasteToText(
                  "Since responses are useless, and both models are not useful as an assistant, the system prompt is also failed."
                ),
            },
            {
              title: "it affects it affects the truthfulness",
              label: "it affects",
              RightClickCopy: true,
              onClick: () =>
                pasteToText(
                  "it affects the localization, instruction following, truthfulness, length, tone and writing style "
                ),
            },
          ],
        },
      ],
    },
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
          onClick: () => replaceQU("guillemet"),
        },
        {
          title: "replace quotes",
          label: <GrBlockQuote />,
          onClick: () => replaceQU(),
        },
        {
          title: "replace quotes",
          label: `""`,
          onClick: () => replaceQU("straight"),
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
          label: (
            <>
              "
              <BsList />
            </>
          ),
          onClick: () => applyAction("quotationL", true),
        },
        {
          title: "paste text and add quotation to every line +,",
          // label: `"L,`,
          label: (
            <>
              "
              <BsList />,
            </>
          ),
          onClick: () => applyAction("quotationLP0", true),
        },
        {
          title: "paste text and add quotation to every line +,",

          // label: `txt:"L,`,
          label: (
            <>
              txt:"
              <BsList />
            </>
          ),
          onClick: () => applyAction("quotationLP", true),
        },
        {
          title: `add quotation to every line with the text and remove ENTER`,
          // label: `"LB`,
          label: <LuListTree />,
          bold: true,
          // label: (
          //   <>
          //     —:" <BsList />

          //   </>
          // ),
          onClick: () => applyAction("transformAll", true),
        },
        {
          title: `add quotation to every pair line with the text "instead of"`,
          // label: `"LI`,
          label: <>"INS</>,
          onClick: () => applyAction("quotationLI", true),
        },
        {
          title: `add quotation to every line with the text "it is better to use"`,
          label: <>"Bett</>,
          onClick: () => applyAction("quotationLB", true),
        },
        {
          title: `add quotation to every odd line and join with even line using — "`,
          label: <>" —</>,
          onClick: () => applyAction("linePairD", true),
        },
      ],
    },
    {
      groupName: "Case",
      btns: [
        {
          title: "Uppercase first letter Alt+Q",
          label: <RxLetterCaseCapitalize />,
          onClick: () => applyAction("upFirst"),
        },
        {
          title: "Lowercase Alt+A",
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
      <MenuBtnsWrap
        alwaysOpen={alwaysOpen}
        btnsArr={btnsArr}
        defaultOpen="HOT"
      />
    </div>
  );
};

export default SideBtnsFiled;
