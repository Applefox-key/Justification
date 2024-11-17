import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { copyToClipboard, replaceEndings } from "../../utils/utilStr";
import { replacementsEnding } from "../../constants/replacements";
import RateVertical from "./RateVertical";
import { FaRegCopy } from "react-icons/fa";
import { GoZoomIn, GoZoomOut } from "react-icons/go";

const EditFieldDim = ({
  autoFocus,
  isTxt,
  setIsTxt,
  fieldName,
  placeholder,
  fieldVal,
  estim = null,
  fieldFn,
  isActive,
  classN,
  scale = null,
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
    <div className="field-box" ref={refBox}>
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
          {fieldVal && (
            <span
              className={"field-" + scale + (isActive ? " active-span" : "")}>
              {fieldName}
            </span>
          )}
          {scale === "left" && (
            <RateVertical
              val={estim}
              setVal={(v) => fieldFn.setNewEstim(v, fieldName)}
            />
          )}
          <Form.Control
            ref={ref}
            as="textarea"
            id={fieldName}
            autoFocus={autoFocus}
            className={"fieldDim " + classN}
            onFocus={() => fieldFn.onFocus(ref)}
            rows={1}
            spellCheck
            placeholder={placeholder}
            value={fieldVal}
            onKeyDown={fieldFn.onKeyDown}
            onChange={handleChange}
          />
          {scale === "right" && (
            <RateVertical
              val={estim}
              setVal={(v) => fieldFn.setNewEstim(v, fieldName)}
            />
          )}
          <button
            className={"square-btn btnPlus" + scale}
            onClick={changeClass}>
            <GoZoomIn />
          </button>{" "}
          <button
            className={"square-btn btnCopyField" + scale}
            onClick={(e) => copyToClipboard(fieldVal)}>
            <FaRegCopy />
          </button>
          <button className={" btnMin"} onClick={() => changeClass(false)}>
            {/* <CiZoomOut /> */}
            <GoZoomOut />
            EDIT {fieldName} BACK TO DIMENTIONS
          </button>
        </>
      )}
    </div>
  );
};

export default EditFieldDim;
