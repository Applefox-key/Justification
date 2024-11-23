import React, { useMemo } from "react";
import { arrAB } from "../../constants/textParts";
import { recomDim } from "../../utils/analysis";
import RateVertical from "./RateVertical";

const EditDimBodyAnalitic = ({ editParam }) => {
  const { item, fieldFn } = editParam;
  const analisRecom = useMemo(() => recomDim(item.Evals), [item]);
  const dif = (field) =>
    item.Evals[field.a] > item.Evals[field.b]
      ? "A"
      : item.Evals[field.a] < item.Evals[field.b]
      ? "B"
      : "Same";
  const difCl = (field) => {
    const delta = item.Evals[field.a] - item.Evals[field.b];
    const res = Math.abs(delta);
    return res === 0
      ? "an-sum"
      : "an-sum bord_rate" + res + (delta > 0 ? " bord_rateA" : " bord_rateB");
  };

  return (
    <div className="w-100">
      <div className="respDim d-flex justify-content-center m-auto mt-4 w-100">
        {arrAB.map((field, i) => (
          <div className="rate-hor-wrap" key={i}>
            <div className={difCl(field)}>{dif(field)}</div>{" "}
            {/* <div className="field-box justify-content-center">
              <RateVertical
                setVal={(v) => fieldFn.setNewEstim(v, field.a)}
                val={item.Evals[field.a]}
              />{" "}
              <RateVertical
                setVal={(v) => fieldFn.setNewEstim(v, field.b)}
                val={item.Evals[field.b]}
              />
            </div> */}
            {[5, 4, 3, 2, 1].map((el) => (
              <>
                <div className="hor-pair" key={el}>
                  <div
                    onClick={(e) =>
                      fieldFn.setNewEstim(
                        el === item.Evals[field.a] ? 0 : el,
                        field.a
                      )
                    }
                    className={item.Evals[field.a] === el ? " hor-active" : ""}>
                    {el}
                  </div>

                  <div
                    onClick={(e) =>
                      fieldFn.setNewEstim(
                        el === item.Evals[field.b] ? 0 : el,
                        field.b
                      )
                    }
                    className={item.Evals[field.b] === el ? " hor-active" : ""}>
                    {el}
                  </div>
                </div>
              </>
            ))}
            <div className="hor-pair-title">
              <div>A</div>
              <div>B</div>
            </div>
            <p>{field.name}</p>{" "}
          </div>
        ))}
        <div className="rate-hor-wrap an-res">{analisRecom.detales}</div>
      </div>{" "}
      {analisRecom.recom}
    </div>
  );
};

export default EditDimBodyAnalitic;
