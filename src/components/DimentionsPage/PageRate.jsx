import React from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

import { compose, rateIcons } from "../../utils/rates";
import RateBoxes from "../Rate/RateBoxes";

const PageRate = ({ editParam }) => {
  const { setIsTxt, item, setItem, fieldFn, fieldId, isTxt, likert } =
    editParam;

  const getClassName = (resp = "a", val) => {
    const colorStyle = !val
      ? "empty"
      : val === 3
      ? "yellow"
      : val < 3
      ? "red"
      : "green";
    return resp === "a"
      ? `evals-spanl ${colorStyle}`
      : `evals-spanr ${colorStyle}`;
  };

  return (
    <div>
      <div className="menu-accent ">
        <RateBoxes likert={likert} choosed={item.likert} nospan />

        <div>
          <div>
            <button onClick={() => likert.getRecomendation(null, true)}>
              get hint
            </button>
            <button onClick={() => compose(item, setItem, "RateA", 1)}>
              Rate A
            </button>
            <button onClick={() => compose(item, setItem, "RateB", 2)}>
              Rate B
            </button>
          </div>
        </div>
      </div>
      <div className={"respDim-footer "}>
        <>
          <EditFieldDmg
            scale=""
            key={"RateA"}
            fieldName={"RateA"}
            placeholder={"RateA"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "RateA" ? "dimField active-field" : "dimField") +
              (likert.best.fields.includes("RateA") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "RateA"}
            isActive={fieldId === "RateA"}
            fieldVal={item["RateA"]}
            fieldFn={fieldFn}
          />
          <div className="mt-4">
            <div className="evals-dim">
              <div>
                {defaultDimSets[editParam.item.setName].map((field, i) => (
                  <div className="d-flex flex-row" key={i}>
                    <span
                      rate={rateIcons[item.Evals[field.b]]}
                      title={
                        item.Evals[field.a] > item.Evals[field.b]
                          ? item.Evals[field.a] - item.Evals[field.b]
                          : ""
                      }
                      className={getClassName("a", item.Evals[field.a])}>
                      {item.Evals[field.a]}
                    </span>
                    <span className="evals-span">{field.name[0]}</span>

                    <span
                      rate={rateIcons[item.Evals[field.b]]}
                      title={
                        item.Evals[field.b] > item.Evals[field.a]
                          ? item.Evals[field.b] - item.Evals[field.a]
                          : ""
                      }
                      className={getClassName("b", item.Evals[field.b])}>
                      {item.Evals[field.b]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <EditFieldDmg
            scale=""
            key={"RateB"}
            fieldName={"RateB"}
            placeholder={"RateB"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "RateB" ? "dimField active-field" : "dimField") +
              (likert.best.fields.includes("RateB") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "RateB"}
            isActive={fieldId === "RateB"}
            fieldVal={item["RateB"]}
            fieldFn={fieldFn}
          />
        </>
      </div>
    </div>
  );
};

export default PageRate;
