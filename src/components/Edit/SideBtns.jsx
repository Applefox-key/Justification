import React from "react";

import {
  editTextAction,
  NumIsteadLetter,
  replaceWords,
  replaceWordsInteractions,
} from "../../utils/utilStr";
import { TbQuotes, TbSlashes } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";
import { PiBracketsRoundBold, PiSquareHalfDuotone } from "react-icons/pi";
import { BiSolidEraser } from "react-icons/bi";
import {
  RxLetterCaseCapitalize,
  RxLetterCaseLowercase,
  RxLetterCaseUppercase,
} from "react-icons/rx";
const SideBtns = ({ handleTxt, setHandleTxt, isTxt, textSelected }) => {
  const capsSwitch = (action) => {
    editTextAction(handleTxt, setHandleTxt, action);
  };
  const respOrder = (e) => {
    const newVal = replaceWords(handleTxt);
    setHandleTxt(newVal);
  };
  return (
    <div className="d-flex flex-column ms-1">
      <button
        className="square-btn intense"
        title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
        onClick={respOrder}>
        <PiSquareHalfDuotone />
      </button>
      <button
        className="square-btn intense"
        title="INTERACTIONS: remove extra spaces, capitalize all sentences, correct names of INTERACTIONS"
        onClick={(e) => {
          const newVal = replaceWordsInteractions(handleTxt);
          setHandleTxt(newVal);
        }}>
        <IoChatbubblesOutline />
      </button>
      <button
        className="square-btn intense"
        title="@RESPONSES: A B -> 1 2"
        onClick={() => NumIsteadLetter(handleTxt, setHandleTxt)}>
        @
      </button>
      <button
        className="square-btn intense"
        title="add a dot"
        onClick={() => setHandleTxt(handleTxt + ". ")}>
        .
      </button>{" "}
      {!isTxt && (
        <>
          <button
            title="delete selection"
            className="square-btn ordinary"
            disabled={!textSelected}
            onClick={() => capsSwitch("delSel")}>
            <BiSolidEraser />
          </button>
          <button
            title="Uppercase first letter for selection"
            onClick={() => capsSwitch("upFirst")}
            disabled={!textSelected}
            className="square-btn ordinary">
            <RxLetterCaseCapitalize />
          </button>{" "}
          <button
            title="Lowercase for selection"
            onClick={() => capsSwitch("down")}
            disabled={!textSelected}
            className="square-btn  ordinary">
            <RxLetterCaseLowercase />
          </button>{" "}
          <button
            title="Uppercase for selection"
            onClick={() => capsSwitch("up")}
            disabled={!textSelected}
            className="square-btn ordinary">
            <RxLetterCaseUppercase />
          </button>{" "}
          <button
            title="add quotation for selection"
            onClick={() => capsSwitch("quotation")}
            disabled={!textSelected}
            className="square-btn ordinary">
            <TbQuotes />
          </button>
          <button
            title="add staples for selection"
            onClick={() => capsSwitch("staples")}
            disabled={!textSelected}
            className="square-btn ordinary">
            <PiBracketsRoundBold />
          </button>
          <button
            title="add accent error text for selection"
            onClick={() => capsSwitch("accent")}
            disabled={!textSelected}
            className="square-btn ordinary">
            <TbSlashes />
          </button>
        </>
      )}
    </div>
  );
};

export default SideBtns;
