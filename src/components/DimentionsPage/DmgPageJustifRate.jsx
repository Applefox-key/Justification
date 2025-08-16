import React, { useCallback } from "react";
import { defaultDimSets } from "../../constants/textParts";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

import { compose, composeRateBoth, rateIcons } from "../../utils/rates";
import RateBoxes from "../Rate/RateBoxes";
import { recomDim } from "../../utils/analysis";
import { useRateLikert } from "../../hooks/useRateLikert";

const DmgPageJustifRate = ({ editParam }) => {
  const {
    setIsTxt,
    best,
    item,
    setItem,
    fieldFn,
    fieldId,
    isTxt,
    action,
    setBest,
  } = editParam;

  const getClassName = (field, resp = "a") => {
    return resp === "a" ? "evals-spanl" : "evals-spanr";

    // if (resp === "a") {
    //   return (
    //     (item.Evals[field.a] > item.Evals[field.b]
    //       ? "evals-spanl evals-span-b"
    //       : "evals-spanl evals-span-isempty-" + (item.Evals[field.a] === 0)) +
    //     (item.Evals[field.a] !== 5 && item.Evals[field.a] !== 0
    //       ? " notfiveA"
    //       : "")
    //   );
    // } else {
    //   return (
    //     (item.Evals[field.b] > item.Evals[field.a]
    //       ? "evals-spanr evals-span-b"
    //       : "evals-spanr evals-span-isempty-" + (item.Evals[field.b] === 0)) +
    //     (item.Evals[field.b] !== 5 && item.Evals[field.b] !== 0
    //       ? " notfiveB"
    //       : "")
    //   );
    // }
  };
  const bestField = useCallback((i) => {
    const result = [];
    if (i > -1 && i < 5) result.push("R1");
    if (i > 3) result.push("R2");
    return result;
  }, []);
  const handleRate = (e, val) => {
    let v = best.num === val.num ? -1 : val.num;
    const rec = best.rec === "" ? recomDim(item.Evals).recom : best.rec;
    setBest(
      v === -1
        ? { num: -1, title: "", fields: [], rec: rec }
        : { ...val, title: val.title, fields: bestField(v), rec: rec }
    );
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
                    rate={rateIcons[item.Evals[field.b]]}
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
      <div className="d-flex mb-2 justify-content-between">
        <RateBoxes likert={likert} choosed={item.likert} />
        <div>
          <button onClick={() => compose(item, setItem, "RateA", 1)}>
            Rate A
          </button>{" "}
          <button onClick={() => compose(item, setItem, "RateB", 2)}>
            Rate B
          </button>
          <button
            onClick={() =>
              composeRateBoth(item, setItem, "Justif", best, true)
            }>
            Justification full
          </button>
          <button
            onClick={() => composeRateBoth(item, setItem, "Justif", best)}>
            Justification
          </button>
        </div>
      </div>
      <div className={"respDim-footer "}>
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
      </div>
    </div>
  );
};

export default DmgPageJustifRate;
