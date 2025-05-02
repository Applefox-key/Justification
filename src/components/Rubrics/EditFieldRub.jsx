import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { replaceEndings } from "../../utils/utilStr";
import { replacementsEnding } from "../../constants/replacements";
import { GoZoomIn, GoZoomOut } from "react-icons/go";

const EditFieldRub = ({
  autoFocus,
  showArrow,
  fieldName,
  placeholder,
  fieldVal,

  small = null,
  fieldFn,
  isActive,
  classN = "",
  scale = null,
  show = true,
}) => {
  const ref = useRef(null);
  const refBox = useRef(null);
  const cursorPos = useRef(null);
  const [isScale, setIsScale] = useState(false);
  const changeClass = () => {
    const curV = isScale;
    setIsScale(!curV);
    // debugger;
    if (!curV) ref.current.focus();
  };
  const handleChange = (e) => {
    e.stopPropagation();

    const { curs, val } = replaceEndings(e, replacementsEnding);
    cursorPos.current = curs;

    fieldFn.setNewValRub(val);
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
      className={
        "field-box" +
        (!show ? " field-close-" + scale || "" : "") +
        (isScale ? " field-rub-plus" : "")
      }
      ref={refBox}>
      <>
        <Form.Control
          ref={ref}
          as={small ? "input" : "textarea"}
          id={fieldName}
          autoFocus={autoFocus}
          className={
            "fieldRub " +
            (small ? "dimFieldSmall " : "") +
            classN +
            (isScale ? " plusTextArea" : "")
          }
          onFocus={() => fieldFn.onFocus(ref)}
          rows={1}
          spellCheck
          placeholder={placeholder}
          value={fieldVal}
          onKeyDown={fieldFn.onKeyDown}
          onChange={handleChange}
        />{" "}
        {/* {showArrow && !isActive && (
          <button className="rubBtn square-btn" onClick={changeClass}>
            <GoZoomIn />
          </button>
        )} */}
        {((!small && show && isActive) || showArrow) && (
          <>
            <div className={"textarea-btns-" + scale}>
              <button className={"square-btn"} onClick={changeClass}>
                <GoZoomIn />
              </button>
            </div>
          </>
        )}
        {!small && show && isActive && (
          <button className={" btnMin"} onClick={changeClass}>
            <GoZoomOut />
            EDIT {fieldName} BACK TO RUBRICATOR
          </button>
        )}
      </>
    </div>
  );
};

export default EditFieldRub;
