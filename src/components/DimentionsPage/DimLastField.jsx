import React, { useState } from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
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
    // const selection = window.getSelection();
    // const selectedText = selection.toString().trim();
    console.log(selectedText);
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
      // console.log(poz);
      setLastF({ name: fieldId, poz: poz });
      console.log("foc");
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
  // const chekF = (isRef) => {
  //   let result = "";
  //   if (isRef) {
  //     result = `Проверь верна ли соответсвует ли информация в новом тексте  источнику. игнорируй языковые ошибки. Нужен только спискок грубых ошибок искажающих информацию источника.
  //     ИСТОЧНИК: "${item.Prompt}"
  //     НОВЫЙ ТЕКСТ: "${item[fieldRate]}"`;
  //   } else
  //     result =
  //       result = `"Проверь верна ли фактическая информация в тексте. игнорируй языковые ошибки. Нужен только спискок грубых фактических ошибок
  //      Текст: "${item[fieldRate]}"`;
  //   if (result) {
  //     navigator.clipboard.writeText(result).catch((err) => {
  //       console.error("Ошибка копирования:", err);
  //     });
  //   }
  // };
  return (
    <>
      {!noHead && (
        <MyPortal containerId="portal-got-resp">
          {fieldId === fieldRate && (
            <div className="div-placeholder">
              {/* <span className="me-4">ALT+X: new row</span>
              <span className="me-4">ALT+Z: ,</span> */}
              <span className="me-4">{lastF.name} </span>
              {/* <button className=" hotBtnGr intense" onClick={() => chekF()}>
                check facts
              </button>
              <button className=" hotBtnGr intense" onClick={() => chekF(true)}>
                check facts in ref
              </button>
              <button
                className=" hotBtnGr intense"
                onClick={() =>
                  navigator.clipboard.writeText("Правильно ли так сказать? ").catch((err) => {
                    console.error("Ошибка копирования:", err);
                  })
                }>
                check just
              </button> */}
              {/* <button className=" hotBtnGr intense" onClick={copyToLastField}>
                to {lastF.name} (end)
              </button>
              <button className=" hotBtnGr intense" onClick={(e) => copyToLastField(e, true)}>
                to {lastF.name} (curs)
              </button> */}
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
        // isActive={fieldId === fieldRate}
        fieldVal={item[fieldRate]}
        fieldFn={fieldFn}
        {...props}>
        {children}
      </ScalableInput>
      {/* <EditFieldDmg
        key={fieldRate}
        fieldName={fieldRate}
        placeholder={fieldRate}
        onFocus={onFocusR}
        onChangePrew={handleKeyDown}
        isActive={fieldId === fieldRate}
        fieldVal={item[fieldRate]}
        fieldFn={fieldFn}
        {...props}
      /> */}
    </>
  );
};

export default DimLastField;
