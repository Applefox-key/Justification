import React from "react";
import { FaQuoteLeft, FaRegCopy } from "react-icons/fa";
import { GoZoomIn, GoZoomOut } from "react-icons/go";
import { copyToClipboard, editTextAction } from "../../utils/utilStr";
import { AiOutlineClear } from "react-icons/ai";
import { PiCopyleftDuotone } from "react-icons/pi";

const TextFocusBtns = ({
  btnSide = "right",
  fieldName,
  fieldVal,
  fieldFn,
  refBox,
  refC,
}) => {
  const changeClass = (IsToAdd = true) => {
    if (IsToAdd) {
      refBox.current.classList.add("field-box-plus");
      refC.current.classList.add("plusTextArea");
      refC.current.focus();
    } else {
      refC.current.classList.remove("plusTextArea");
      refBox.current.classList.remove("field-box-plus");
    }
  };
  const quotes = () => {
    editTextAction(
      fieldName,
      fieldVal,
      fieldFn.setNewVal,
      "englBaseComm",
      true
    );
  };
  return (
    <>
      <div className={"textarea-btns-" + btnSide}>
        <button className={"square-btn"} onClick={changeClass}>
          <GoZoomIn />
        </button>{" "}
        <button
          className={"square-btn"}
          onClick={(e) => copyToClipboard(fieldVal)}>
          <FaRegCopy />
        </button>
        <button className={"square-btn"} onClick={(e) => fieldFn.setNewVal("")}>
          <AiOutlineClear />
        </button>
        {/* <button
          title="translate prompt for gpt"
          className={"square-btn"}
          onClick={(e) => copyToClipboard("translate to English: " + fieldVal)}>
          <PiCopyleftDuotone />
        </button>{" "} */}
        <button title="quotes" className={"square-btn"} onClick={quotes}>
          <FaQuoteLeft />
        </button>
      </div>{" "}
      <button className={" btnMin"} onClick={() => changeClass(false)}>
        <GoZoomOut />
        EDIT {fieldName} BACK TO PAGE
      </button>
    </>
  );
};

export default TextFocusBtns;
