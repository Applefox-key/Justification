import React, { useMemo } from "react";
import { arrAB } from "../../constants/textParts";
import { recomDim } from "../../utils/analysis";
import RateDimScale from "./RateDimScale";

const EditDimBodyAnalitic = ({ editParam }) => {
  const { item, fieldFn } = editParam;
  const analisRecom = useMemo(() => recomDim(item.Evals), [item]);
  const dif = (field) => {
    if (!item.Evals[field.a] || !item.Evals[field.b]) return "unspecified";
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
      ? "an-sum"
      : "an-sum bord_rate" + res + (delta > 0 ? " bord_rateA" : " bord_rateB");
  };

  return (
    <div className="w-100 fs-8">
      <div className="respDim d-flex justify-content-center m-auto mt-4 w-100">
        <div className="rate-hor-wrap an-res maxw-160">{analisRecom.recom}</div>
        {arrAB.map((field, i) => (
          <div className="rate-hor-wrap" key={i}>
            <div className={difCl(field)}>{dif(field)}</div>
            <div className="field-box justify-content-center mt-4">
              <RateDimScale
                setVal={(v) => fieldFn.setNewEstim(v, field.a)}
                val={item.Evals[field.a]}
                cl="rateA"
              />{" "}
              <RateDimScale
                setVal={(v) => fieldFn.setNewEstim(v, field.b)}
                val={item.Evals[field.b]}
                cl="rateA"
              />
            </div>
            <div className="hor-pair-title">
              <div>A</div>
              <div>B</div>
            </div>
            <p>{field.name}</p>{" "}
          </div>
        ))}
        <div className="rate-hor-wrap an-res">{analisRecom.detales}</div>
      </div>{" "}
    </div>
  );
};

export default EditDimBodyAnalitic;
