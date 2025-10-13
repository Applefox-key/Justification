import React, { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaRegCopy } from "react-icons/fa";
import { GoZoomIn, GoZoomOut } from "react-icons/go";
import {
  copyToClipboard,
  editTextAction,
  replaceEndings,
} from "../../utils/utilStr";
import { AiOutlineClear } from "react-icons/ai";
import { Form } from "react-bootstrap";
import { replacementsEnding } from "../../constants/replacements";
// props:
// fieldVal,
//   fieldFn,
//   isActive,
//   btnCount,
//   btnSide = "right",
//   small,
//PROPS FOR TEEXT ATEA OR INPUT
//   id,
//   ref,
//   className,

//   placeholder,// placeholder={placeholder}
//   autoFocus,  // autoFocus={autoFocus}
//   onKeyDown,// onKeyDown={onKeyDown}
//   onChange  // onChange={onChange}

// rows={1}
//

const ScalableInput = (props) => {
  const {
    fieldName,
    fieldVal,
    fieldFn,
    isActive,
    btnCount,
    btnSide = "right",
    small,
    autoHeight,
    onChange,
    className,
    ...inputProps
  } = props;

  const [lg, setLg] = useState(false);
  const changeClass = () => {
    setLg(!lg);
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
  const ref = useRef(null);
  const cursorPos = useRef(null);

  const adjustHeight = () => {
    const el = ref.current;
    if (el) {
      el.style.height = "auto"; // сброс
      el.style.height = `${el.scrollHeight}px`;
    }
  };
  const handleChange = (e) => {
    e.stopPropagation();

    const { curs, val } = replaceEndings(e, replacementsEnding);
    cursorPos.current = curs;
    if (onChange) onChange(val);

    if (autoHeight) adjustHeight();
  };

  useEffect(() => {
    if (autoHeight) {
      adjustHeight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ref.current && cursorPos.current !== null) {
      ref.current.selectionStart = cursorPos.current;
      ref.current.selectionEnd = cursorPos.current;
      ref.current.focus();
    }
    if (autoHeight) adjustHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldVal]);
  useEffect(() => {
    if (!isActive && lg) {
      setLg(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);
  const inputRender = () => (
    <Form.Control
      ref={ref}
      as={small ? "input" : "textarea"}
      // id={id}
      spellCheck
      className={className + (btnSide ? " right-pad " : "pad-text-" + btnSide)}
      onChange={handleChange}
      {...inputProps}
      value={fieldVal}
      style={{
        ...(autoHeight ? { overflow: "hidden", resize: "none" } : {}),
      }}
      onFocus={() => fieldFn.onFocus(ref)}
    />
  );
  return (
    <>
      {lg ? (
        <>
          <div className="text-plus-portal">
            <button className="btnMinP" onClick={() => changeClass(false)}>
              <GoZoomOut />
              EDIT {fieldName} BACK TO PAGE
            </button>
            {inputRender()}
          </div>
        </>
      ) : (
        <> {inputRender()}</>
      )}
      <div className={"textarea-btns-" + btnSide}>
        <button className={"square-btn"} onClick={changeClass}>
          <GoZoomIn />
        </button>{" "}
        <button className={"square-btn"} onClick={(e) => fieldFn.setNewVal("")}>
          <AiOutlineClear />
        </button>
        {!btnCount && (
          <>
            <button
              className={"square-btn"}
              onClick={(e) => copyToClipboard(fieldVal)}>
              <FaRegCopy />
            </button>
            <button title="quotes" className={"square-btn"} onClick={quotes}>
              <FaQuoteLeft />
            </button>
          </>
        )}
      </div>{" "}
    </>
  );
};

export default ScalableInput;
