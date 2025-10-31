import React, { useState } from "react";
import MyPortal from "../UI/MyPortal/MyPortal";
import { wordUnderCursor } from "../../utils/utilStr";
import ScalableInput from "../EditBtns/ScalableInput";

const DimLastField = ({ fieldRate, item, noHead, fieldFn, children, fieldId, ...props }) => {
  const [lastF, setLastF] = useState({ name: "", poz: 0 });
  console.log("id", fieldId, " name", fieldRate, " lastF", lastF.name);

  const copyToLastField = (e, poz = false, oldRow = false) => {
    if (lastF.name.at(-1) !== fieldRate.at(-1)) return;
    e.preventDefault();
    const textarea = e.target;
    if (!textarea) return "";
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;

    const textF = textarea.value;
    let selectedText = textF.slice(start, end);

    if (!selectedText) [selectedText, start, end] = wordUnderCursor(textF, start);
    if (!selectedText) return;
    if (!lastF.name) return;
    const lastV = item[lastF.name];
    const divider = oldRow ? "" : "\n";
    const newPaste = `“${selectedText}”${oldRow ? ", " : ""}`;
    const val = poz
      ? `${lastV.slice(0, lastF.poz)}${divider}${newPaste}${lastV.slice(lastF.poz)}`
      : ` ${lastV}${lastV ? divider : ""}${newPaste}`;

    fieldFn.setNewValF(val, lastF.name);
  };
  const onFocusR = () => {
    if (fieldId !== fieldRate) {
      const poz = document.getElementById(fieldId)?.selectionStart;

      setLastF({ name: fieldId, poz: poz });
    }
  };

  const handleKeyDown = (e) => {
    if (fieldId !== fieldRate) return;
    if (e.altKey && (e.key.toLowerCase() === "x" || e.key.toLowerCase() === "ч")) {
      copyToLastField(e, true);
    }

    if (e.altKey && (e.key.toLowerCase() === "z" || e.key.toLowerCase() === "я")) {
      copyToLastField(e, true, true);
    }
  };

  return (
    <>
      {!noHead && (
        <MyPortal containerId="portal-got-resp">
          {fieldId === fieldRate && (
            <div className="div-placeholder">
              <span className="me-4">{lastF.name} </span>
            </div>
          )}
        </MyPortal>
      )}
      <ScalableInput
        key={fieldRate}
        fieldName={fieldRate}
        placeholder={fieldRate}
        onFocus={onFocusR}
        onKeyDownPrew={handleKeyDown}
        onChange={(val) => {
          fieldFn.setNewVal(val);
        }}
        fieldId={fieldId}
        fieldVal={item[fieldRate]}
        fieldFn={fieldFn}
        {...props}>
        {children}
      </ScalableInput>
    </>
  );
};

export default DimLastField;
