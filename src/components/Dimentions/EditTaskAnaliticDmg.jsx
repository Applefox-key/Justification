import React, { useMemo } from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import { recomDim } from "../../utils/analysis";
import RateDmgScale from "../EditParts/RateDimScale";

const EditTaskAnaliticDmg = ({ editParam }) => {
  const { item, fieldFn } = editParam;
  const analisRecom = useMemo(() => recomDim(item.Evals), [item]);
  const dif = (field) => {
    if (!item.Evals[field.a] || !item.Evals[field.b]) return "-";
    return item.Evals[field.a] > item.Evals[field.b]
      ? "A"
      : item.Evals[field.a] < item.Evals[field.b]
      ? "B"
      : "Same";
  };
  const difCl = (field) => {
    const delta = item.Evals[field.a] - item.Evals[field.b];
    const res = Math.abs(delta);
    return res === 0
      ? "an-sum-task"
      : "an-sum-task bord_rate" +
          res +
          (delta > 0 ? " bord_rateA" : " bord_rateB");
  };

  return (
    <div className="fs-8 ms-4">
      <div className="respDim d-flex justify-content-center m-auto w-100">
        {defaultDimSets[editParam.item.setName].map((field, i) => (
          <div className="rate-hor-wrap task-rate-width" key={i}>
            <span>{field.short}</span>
            <div className={difCl(field)}>{dif(field)}</div>
            <div className="field-box justify-content-center">
              <RateDmgScale
                setVal={(v) => fieldFn.setNewEstim(v, field.a)}
                val={item.Evals[field.a]}
                cl="rateA rateTask"
              />{" "}
              <RateDmgScale
                setVal={(v) => fieldFn.setNewEstim(v, field.b)}
                val={item.Evals[field.b]}
                cl="rateA rateTask"
              />
            </div>{" "}
          </div>
        ))}
      </div>
      <div className="rate-hor-wrap an-res">
        {" "}
        <button onClick={() => alert(analisRecom.detales)}>?</button>
        {analisRecom.recom}
      </div>{" "}
    </div>
  );
};

export default EditTaskAnaliticDmg;
