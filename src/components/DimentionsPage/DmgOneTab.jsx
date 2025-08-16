import React from "react";

import DimBtnsHot from "../Dimentions/DimBtnsHot";
import DmgFieldEdit from "./DmgFieldEdit";

const DmgOneTab = ({ editParam }) => {
  const {
    field,
    setIsTxt,
    fieldId,
    isTxt,
    item,
    fieldFn,
    pasteToText,
    action,
  } = editParam;

  const classA = () =>
    "dimField " + (fieldId === field.a ? "active-field" : "");
  const classB = () =>
    "dimField " + (fieldId === field.b ? "active-field" : "");

  console.log(item);

  return (
    <>
      <DimBtnsHot
        field={field}
        pasteToText={pasteToText}
        action={action}
        set={item.setName}
      />
      <div
        // className={show ? "one-dim" : "one-dim-close"}
        className="one-dim">
        <DmgFieldEdit
          // key={i}
          autoFocus
          show={true}
          fieldName={field.a}
          placeholder={field.a}
          setIsTxt={setIsTxt}
          scale="right"
          classN={classA()}
          isTxt={isTxt && fieldId === field.a}
          isActive={fieldId === field.a}
          fieldVal={item[field.a]}
          estim={item.Evals[field.a]}
          fieldFn={fieldFn}
        />
        <div className="wrap-cp"></div>
        <DmgFieldEdit
          scale="left"
          show={true} // key={i}
          fieldName={field.b}
          placeholder={field.b}
          setIsTxt={setIsTxt}
          classN={classB()}
          isTxt={isTxt && fieldId === field.b}
          isActive={fieldId === field.b}
          fieldVal={item[field.b]}
          estim={item.Evals[field.b]}
          fieldFn={fieldFn}
        />
      </div>
    </>
  );
};

export default DmgOneTab;
