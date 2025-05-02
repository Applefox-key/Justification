import React from "react";
import BtnReplace from "./BtnReplace";
import { editTextAction } from "../../utils/utilStr";
import { TbSlashes, TbTxt } from "react-icons/tb";

import { PiBracketsRoundBold } from "react-icons/pi";
import { BiSolidEraser } from "react-icons/bi";
import {
  RxLetterCaseCapitalize,
  RxLetterCaseLowercase,
  RxLetterCaseUppercase,
} from "react-icons/rx";

import { GrBlockQuote } from "react-icons/gr";

const SideBtns = ({ statesVal, textSelected, fieldId }) => {
  const { handleTxt, setHandleTxt, isTxt, setIsTxt } = statesVal;
  const capsSwitch = (action, isIgnore = false) => {
    editTextAction(fieldId, handleTxt, setHandleTxt, action, isIgnore);
  };

  return (
    <div className="sidebtns-box">
      {handleTxt && (
        <>
          <button
            id="setIsTxt"
            className={
              isTxt ? "square-btn intense isTxtAct" : "square-btn intense"
            }
            title="add from voice text area"
            onClick={() => setIsTxt(!isTxt)}>
            <TbTxt />
          </button>
        </>
      )}

      {!isTxt && (
        <>
          <BtnReplace
            fieldid={fieldId}
            handleTxt={handleTxt}
            setHandleTxt={setHandleTxt}
            textSelected={textSelected}
          />
          <button
            className="square-btn ordinary"
            title="add a dot"
            onClick={() => setHandleTxt(handleTxt + ". ")}>
            .
          </button>
          <button
            title="dash"
            className="square-btn ordinary"
            // disabled={!textSelected}
            onClick={() => capsSwitch("dash", true)}>
            —
          </button>{" "}
          <button
            title="add quotation2 for selection"
            onClick={() => capsSwitch("quotation2", true)}
            // disabled={!textSelected}
            className="square-btn ordinary">
            «»
          </button>
          <button
            title="add quotation for selection"
            onClick={() => capsSwitch("quotation", true)}
            // disabled={!textSelected}
            className="square-btn ordinary">
            {`""`}
          </button>
          <button
            title="add quotation to every line for selection"
            onClick={() => capsSwitch("quotationL", true)}
            // disabled={!textSelected}
            className="square-btn ordinary">
            {`""L`}
          </button>{" "}
          <button
            title="add quotation to every line for selection"
            onClick={() => capsSwitch("quotationLI", true)}
            // disabled={!textSelected}
            className="square-btn ordinary">
            {`""LI`}
          </button>{" "}
          <button
            title="add staples for selection"
            onClick={() => capsSwitch("staples", true)}
            // disabled={!textSelected}
            className="square-btn ordinary">
            <PiBracketsRoundBold />
          </button>
          <button
            title="add for selection text about instead"
            onClick={() => capsSwitch("accent")}
            disabled={!textSelected}
            className="square-btn ordinary">
            <TbSlashes />
          </button>{" "}
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
          </button>
          <button
            title="to “” for selection"
            onClick={() => capsSwitch("quotation3", true)}
            disabled={!textSelected}
            className="square-btn ordinary">
            <GrBlockQuote />
          </button>
          <button
            title="delete selection"
            className="square-btn ordinary"
            disabled={!textSelected}
            onClick={() => capsSwitch("delSel")}>
            <BiSolidEraser />
          </button>
        </>
      )}
    </div>
  );
};

export default SideBtns;
