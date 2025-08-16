import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { copyToClipboard, replaceEndings } from "../../utils/utilStr";
import { replacementsEnding } from "../../constants/replacements";

import { FaRegCopy } from "react-icons/fa";
import { GoZoomIn, GoZoomOut } from "react-icons/go";
import { AiOutlineClear } from "react-icons/ai";
import { PiCopyleftDuotone } from "react-icons/pi";
import RateDmgScale from "../Dimentions/RateDmgScale";

const DmgFieldEdit = ({
  autoFocus,
  isTxt,
  setIsTxt,
  fieldName,
  placeholder,
  fieldVal,
  estim = null,
  small = null,
  fieldFn,
  isActive,
  classN,
  scale = null,
  show = true,
}) => {
  const ref = useRef(null);
  const refBox = useRef(null);
  const cursorPos = useRef(null);
  const changeClass = (IsToAdd = true) => {
    if (IsToAdd) {
      refBox.current.classList.add("field-box-plus");
      ref.current.classList.add("plusTextArea");
      ref.current.focus();
    } else {
      ref.current.classList.remove("plusTextArea");
      refBox.current.classList.remove("field-box-plus");
    }
  };
  const handleChange = (e) => {
    e.stopPropagation();
    const { curs, val } = replaceEndings(e, replacementsEnding);
    cursorPos.current = curs;
    fieldFn.setNewVal(val);
  };
  useEffect(() => {
    if (ref.current && cursorPos.current !== null) {
      ref.current.selectionStart = cursorPos.current;
      ref.current.selectionEnd = cursorPos.current;
      ref.current.focus();
    }
  }, [fieldVal]);
  return (
    <div
      className={"field-box" + (!show ? " field-close-" + scale || "" : "")}
      ref={refBox}>
      {isTxt ? (
        <div
          className={"setIsTxt"}
          onMouseDown={(e) => {
            if (e.button === 1) setIsTxt(!isTxt);
          }}>
          {fieldVal}
        </div>
      ) : (
        <>
          {/* {fieldVal && show && (
            <span
              className={"field-" + scale + (isActive ? " active-span" : "")}>
              {fieldName}
            </span>
          )} */}
          {scale === "left" && (
            <RateDmgScale
              horiz={!show}
              val={estim}
              setVal={(v) => fieldFn.setNewEstim(v, fieldName)}
            />
          )}
          {show ? (
            <Form.Control
              ref={ref}
              as={small ? "input" : "textarea"}
              id={fieldName}
              autoFocus={autoFocus}
              className={"fieldDim " + (small ? "dimFieldSmall " : "") + classN}
              onFocus={() => fieldFn.onFocus(ref)}
              rows={1}
              spellCheck
              placeholder={placeholder}
              value={fieldVal}
              onKeyDown={fieldFn.onKeyDown}
              onChange={handleChange}
            />
          ) : (
            <div className="field-val-close"> {fieldVal}</div>
          )}
          {scale === "right" && (
            <RateDmgScale
              horiz={!show}
              val={estim}
              setVal={(v) => fieldFn.setNewEstim(v, fieldName)}
            />
          )}
          {!small && (
            <>
              <div className={"textarea-btns-" + scale}>
                <button className={"square-btn"} onClick={changeClass}>
                  <GoZoomIn />
                </button>{" "}
                <button
                  className={"square-btn"}
                  onClick={(e) => copyToClipboard(fieldVal)}>
                  <FaRegCopy />
                </button>
                <button
                  className={"square-btn"}
                  onClick={(e) => fieldFn.setNewVal("")}>
                  <AiOutlineClear />
                </button>{" "}
                <button
                  title="translate prompt for gpt"
                  className={"square-btn"}
                  onClick={(e) =>
                    copyToClipboard("translate to English: " + fieldVal)
                  }>
                  <PiCopyleftDuotone />
                </button>
              </div>{" "}
              <button className={" btnMin"} onClick={() => changeClass(false)}>
                <GoZoomOut />
                EDIT {fieldName} BACK TO DIMENTIONS
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DmgFieldEdit;
