import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { replaceEndings } from "../../utils/utilStr";
import { replacementsEnding } from "../../constants/replacements";
import RateDmgScale from "./RateDmgScale";
import TextFocusBtns from "../EditBtns/TextFocusBtns";

const EditFieldDmg = ({
  autoFocus,
  isTxt,
  setIsTxt,
  fieldName,
  placeholder,
  fieldVal,
  fieldFn,
  isActive,
  classN,
  classF,
  onChangePrew = null,
  onFocus = null,
  estim = null,
  small = null,
  scale = null,
  show = true,
  onContextMenu = null,
  onBlur = null,
}) => {
  const ref = useRef(null);
  const refBox = useRef(null);
  const cursorPos = useRef(null);
  // const { isFocused, handleFocus, handleBlur } = useShowOnFocus();

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
      className={`field-box ${classF || ""} ${
        !show ? " field-close-" + scale || "" : ""
      }`}
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
          {fieldVal && show && (
            <span
              className={"field-" + scale + (isActive ? " active-span" : "")}>
              {fieldName}
            </span>
          )}
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
              onFocus={() => {
                if (onFocus) onFocus();
                fieldFn.onFocus(ref);
              }}
              rows={1}
              spellCheck
              placeholder={placeholder}
              value={fieldVal}
              onKeyDown={(e) => {
                if (onChangePrew) onChangePrew(e);
                fieldFn.onKeyDown(e);
              }}
              onContextMenu={onContextMenu}
              onBlur={onBlur}
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
              <TextFocusBtns
                fieldName={fieldName}
                fieldVal={fieldVal}
                fieldFn={fieldFn}
                refBox={refBox}
                refC={ref}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EditFieldDmg;
