import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { replaceEndings } from "../../utils/utilStr";
import { replacementsEnding } from "../../constants/replacements";
import { CiZoomIn, CiZoomOut } from "react-icons/ci";

const EditField = ({
  autoFocus,
  isTxt,
  setIsTxt,
  fieldName,
  placeholder,
  fieldVal,
  fieldFn,
  classN,
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
          <Form.Control
            ref={ref}
            as="textarea"
            id={fieldName}
            autoFocus={autoFocus}
            className={"field " + classN}
            onFocus={() => fieldFn.onFocus(ref)}
            rows={1}
            spellCheck
            placeholder={placeholder}
            value={fieldVal}
            onKeyDown={fieldFn.onKeyDown}
            onChange={handleChange}
          />
          <button className="square-btn btnPlus" onClick={changeClass}>
            <CiZoomIn />
          </button>{" "}
          <button
            className="square-btn btnMin"
            onClick={() => changeClass(false)}>
            <CiZoomOut />
          </button>
        </>
      )}
    </div>
  );
};

export default EditField;
