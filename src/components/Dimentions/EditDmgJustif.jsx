import React from "react";
import { defaultDimSets } from "../../constants/dimDefault";

import EditFieldDmg from "./EditFieldDmg";
import ComposeRate from "../EditParts/ComposeRate";

const EditDmgJustif = ({ editParam }) => {
  const {
    setIsTxt,
    best,
    item,
    setItem,
    fieldFn,
    fieldId,
    isTxt,
    show,
    setShow,
  } = editParam;
  const compose = (r) => {
    const arf = r === 1 ? "a" : "b";
    const newArr = defaultDimSets[editParam.item.setName]
      .filter((it) => item[it[arf]] && item[it[arf]] !== "OK")
      .map((el) => item[el[arf]]);
    setItem({ ...item, Justif: newArr.join(`\n`) });
  };
  const getClassName = (field, resp = "a") => {
    if (resp === "a") {
      return (
        (item.Evals[field.a] > item.Evals[field.b]
          ? "evals-spanl evals-span-b"
          : "evals-spanl evals-span-isempty-" + (item.Evals[field.a] === 0)) +
        (item.Evals[field.a] !== 5 && item.Evals[field.a] !== 0
          ? " notfiveA"
          : "")
      );
    } else {
      return (
        (item.Evals[field.b] > item.Evals[field.a]
          ? "evals-spanr evals-span-b"
          : "evals-spanr evals-span-isempty-" + (item.Evals[field.b] === 0)) +
        (item.Evals[field.b] !== 5 && item.Evals[field.b] !== 0
          ? " notfiveB"
          : "")
      );
    }
  };
  return (
    <div className={"respDim-footer " + (!show ? " closeBar" : "")}>
      {show && (
        <>
          <EditFieldDmg
            scale=""
            key={"Rate"}
            fieldName={"Rate"}
            placeholder={"Rate"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "Rate" ? "dimField active-field" : "dimField") +
              (best.fields.includes("Rate") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "Rate"}
            isActive={fieldId === "Rate"}
            fieldVal={item["Rate"]}
            fieldFn={fieldFn}
          />

          <div className="mt-4">
            <div className="evals-dim">
              <div>
                {defaultDimSets[editParam.item.setName].map((field, i) => (
                  <span
                    title={
                      item.Evals[field.a] > item.Evals[field.b]
                        ? item.Evals[field.a] - item.Evals[field.b]
                        : ""
                    }
                    className={getClassName(field, "a")}
                    key={i}>
                    {item.Evals[field.a]}
                  </span>
                ))}
              </div>
              <div>
                {defaultDimSets[editParam.item.setName].map((field, i) => (
                  <span className="evals-span" key={i}>
                    {field.name[0]}
                  </span>
                ))}
              </div>
              <div>
                {defaultDimSets[editParam.item.setName].map((field, i) => (
                  <span
                    title={
                      item.Evals[field.b] > item.Evals[field.a]
                        ? item.Evals[field.b] - item.Evals[field.a]
                        : ""
                    }
                    className={getClassName(field, "b")}
                    key={i}>
                    {item.Evals[field.b]}
                  </span>
                ))}
              </div>
            </div>{" "}
            <ComposeRate
              compose={compose}
              best={best}
              show={show}
              setShow={setShow}
            />
          </div>
          <EditFieldDmg
            scale=""
            key={"Justif"}
            fieldName={"Justif"}
            placeholder={"Justif"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "Justif" ? "dimField active-field" : "dimField") +
              (best.fields.includes("Justif") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "Justif"}
            isActive={fieldId === "Justif"}
            fieldVal={item["Justif"]}
            fieldFn={fieldFn}
          />
        </>
      )}
    </div>
  );
};

export default EditDmgJustif;
