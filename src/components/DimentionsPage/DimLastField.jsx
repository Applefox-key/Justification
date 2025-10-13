import React, { useState } from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
import MyPortal from "../UI/MyPortal/MyPortal";
import { wordUnderCursor } from "../../utils/utilStr";

const DimLastField = ({ fieldRate, item, fieldFn, fieldId, ...props }) => {
  const [lastF, setLastF] = useState({ name: "", poz: 0 });
  const copyToLastField = (e, poz = false) => {
    if (lastF.name.at(-1) !== fieldRate.at(-1)) return;
    e.preventDefault();
    const textarea = e.target;
    if (!textarea) return "";
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;

    const textF = textarea.value;
    let selectedText = textF.slice(start, end);
    // const selection = window.getSelection();
    // const selectedText = selection.toString().trim();
    console.log(selectedText);
    if (!selectedText)
      [selectedText, start, end] = wordUnderCursor(textF, start);

    if (!selectedText) return;
    if (!lastF.name) return;
    const lastV = item[lastF.name];

    const val = poz
      ? `${lastV.slice(0, lastF.poz)}\n“${selectedText}” ${lastV.slice(
          lastF.poz
        )}`
      : ` ${lastV}${lastV ? "\n" : ""}“${selectedText}”`;
    fieldFn.setNewValF(val, lastF.name);
  };
  const onFocusR = () => {
    if (fieldId !== fieldRate) {
      const poz = document.getElementById(fieldId)?.selectionStart;
      // console.log(poz);
      setLastF({ name: fieldId, poz: poz });
    }
  };

  const handleKeyDown = (e) => {
    if (fieldId !== fieldRate) return;
    if (
      e.altKey &&
      (e.key.toLowerCase() === "x" || e.key.toLowerCase() === "ч")
    ) {
      copyToLastField(e, true);
    }
  };

  return (
    <>
      <MyPortal containerId="portal-got-resp">
        {fieldId === fieldRate && (
          <div className="div-placeholder">
            <button className=" hotBtnGr intense" onClick={copyToLastField}>
              to {lastF.name} (end)
            </button>
            <button
              className=" hotBtnGr intense"
              onClick={(e) => copyToLastField(e, true)}>
              to {lastF.name} (curs)
            </button>
          </div>
        )}
      </MyPortal>
      <EditFieldDmg
        key={fieldRate}
        fieldName={fieldRate}
        placeholder={fieldRate}
        onFocus={onFocusR}
        onChangePrew={handleKeyDown}
        isActive={fieldId === fieldRate}
        fieldVal={item[fieldRate]}
        fieldFn={fieldFn}
        {...props}
      />
    </>
  );
};

export default DimLastField;
