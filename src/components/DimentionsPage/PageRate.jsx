import React from "react";
import { defaultDimSets } from "../../constants/textParts";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

import { compose, rateIcons } from "../../utils/rates";
import RateBoxes from "../Rate/RateBoxes";

import { useRateLikert } from "../../hooks/useRateLikert";

const PageRate = ({ editParam }) => {
  const { setIsTxt, best, item, setItem, fieldFn, fieldId, isTxt, action } =
    editParam;

  const getClassName = (resp = "a") => {
    return resp === "a" ? "evals-spanl" : "evals-spanr";
  };
  const likert = useRateLikert({
    action,
    item,
    setItem,
  });

  return (
    <div>
      <div className="hot hot-sum  w-100">
        <div className="rec">Recommendation: {best.rec}</div>
      </div>{" "}
      <div className="d-flex mb-2 justify-content-between">
        <RateBoxes likert={likert} choosed={item.likert} />
        <div>
          <button onClick={() => compose(item, setItem, "RateA", 1)}>
            Rate A
          </button>
          <button onClick={() => compose(item, setItem, "RateB", 2)}>
            Rate B
          </button>
        </div>
      </div>
      <div className={"respDim-footer "}>
        {" "}
        <>
          <EditFieldDmg
            scale=""
            key={"RateA"}
            fieldName={"RateA"}
            placeholder={"RateA"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "RateA" ? "dimField active-field" : "dimField") +
              (best.fields.includes("RateA") ? " best-field" : "")
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
                  <span
                    rate={rateIcons[item.Evals[field.b]]}
                    title={
                      item.Evals[field.a] > item.Evals[field.b]
                        ? item.Evals[field.a] - item.Evals[field.b]
                        : ""
                    }
                    className={getClassName("a")}
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
                    rate={rateIcons[item.Evals[field.b]]}
                    title={
                      item.Evals[field.b] > item.Evals[field.a]
                        ? item.Evals[field.b] - item.Evals[field.a]
                        : ""
                    }
                    className={getClassName("b")}
                    key={i}>
                    {item.Evals[field.b]}
                  </span>
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
              (best.fields.includes("RateB") ? " best-field" : "")
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
