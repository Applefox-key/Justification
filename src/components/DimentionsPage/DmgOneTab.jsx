import React, { useEffect, useState } from "react";
import DimBtnsHot from "../Dimentions/DimBtnsHot";
import { defaultDimSets } from "../../constants/textParts";
import DmgFieldEditPage from "./DmgFieldEditPage";
import RateDmgScale from "../Dimentions/RateDmgScale";

const DmgOneTab = ({ editParam, small, showBody }) => {
  const {
    field,
    setIsTxt,
    fieldId,
    isTxt,
    item,
    fieldFn,
    pasteToText,
    action,
    setAct,
    activeTab,
  } = editParam;
  console.log(showBody);

  const [closed, setClosed] = useState(!showBody);
  const classA = () =>
    "dimField " +
    (small ? "sm " : "") +
    (fieldId === field.a ? "active-field" : "");
  const classB = () =>
    "dimField " +
    (small ? "sm " : "") +
    (fieldId === field.b ? "active-field" : "");

  useEffect(() => {
    if (typeof showBody === "boolean") {
      setClosed(!showBody);
    }
  }, [showBody]);
  console.log("cl", closed);

  return (
    <>
      {!closed && (
        <DimBtnsHot
          field={field}
          pasteToText={pasteToText}
          action={action}
          set={item.setName}
        />
      )}
      <div className={closed ? "one-dim-close" : "one-dim"}>
        <DmgFieldEditPage
          autoFocus
          show={!closed}
          fieldName={field.a}
          placeholder={field.a}
          setIsTxt={setIsTxt}
          scale="right"
          btnSide="up"
          classN={classA()}
          isTxt={isTxt && fieldId === field.a}
          isActive={fieldId === field.a}
          fieldVal={item[field.a]}
          estim={item.Evals[field.a]}
          fieldFn={fieldFn}
          navDim={defaultDimSets[editParam.item.setName]}
        />
        <div>
          <div className="field-box-score">
            <RateDmgScale
              horiz={closed}
              val={item.Evals[field.a]}
              setVal={(v) => fieldFn.setNewEstim(v, field.a)}
            />
            {small && (
              <div className="wrap-dim-nav ">
                <button
                  className={!closed ? "activeTab " + (small ? "h-6" : "") : ""}
                  onClick={() => setClosed(!closed)}>
                  {field.short}
                </button>{" "}
              </div>
            )}
            <RateDmgScale
              horiz={closed}
              val={item.Evals[field.b]}
              setVal={(v) => fieldFn.setNewEstim(v, field.b)}
            />
          </div>
          {!small && (
            <div className="wrap-dim-nav ">
              {defaultDimSets[editParam.item.setName].map((field, i) => (
                <button
                  className={activeTab === field.short ? "activeTab" : ""}
                  onClick={() => setAct(field)}>
                  {field.short}
                </button>
              ))}
            </div>
          )}
        </div>
        <DmgFieldEditPage
          scale="left"
          btnSide="up"
          show={!closed}
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
