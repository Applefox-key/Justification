import React from "react";
import EditFieldRub from "../Rubrics/EditFieldRub";
import RubricatorShort from "./RubricatorShort";

const PageRubPrompt = ({ editParam }) => {
  const { fieldId, countR, fieldFn, item, setItem } = editParam;

  const rubPr = (notAutoText = false) => {
    const textarea = document.getElementById(fieldId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end || textarea === null) {
      return; // No text selected
    }

    const textF = textarea.value;
    const selectedText = textF.slice(start, end);

    fieldFn.createRubPrompt(selectedText, notAutoText);
  };
  const splitLineData = async () => {
    const textarea = document.getElementById(fieldId);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    let textF = "";
    if (start === end || textarea === null) {
      textF = await navigator.clipboard.readText();
      if (!textF) return;
      // return; // No text selected
    } else textF = textarea.value.slice(start, end);

    const input = textF;
    fieldFn.createRubPromptScores(input);
  };
  return (
    <div className="h-90">
      <div className="d-flex hot-sum">
        <button onClick={() => rubPr()} className="unsetW ">
          CREATE AUTO RUBRICATOR
        </button>
        <button onClick={() => rubPr(1)} className="unsetW ">
          CREATE RUBRICATOR
        </button>
        <button onClick={() => splitLineData()} className="unsetW ">
          CREATE RAITINGS FOR REVIEW
        </button>
      </div>

      <div className="d-flex h-100">
        <EditFieldRub
          fieldName={"prompt"}
          classN="w-100 rub-prompt"
          placeholder={"prompt text"}
          isActive={fieldId === "prompt"}
          fieldVal={item.prompt}
          fieldFn={fieldFn}
        />

        <RubricatorShort
          editParam={{
            item,
            setItem,
            fieldFn,
            fieldId,
            countR,
            noScores: true,
          }}
        />
      </div>
    </div>
  );
};

export default PageRubPrompt;
