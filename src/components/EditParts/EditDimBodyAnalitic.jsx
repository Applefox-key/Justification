import React, { useMemo } from "react";
import { arrAB } from "../../constants/textParts";
import { analisDim, compareResponses, recomDim } from "../../utils/analysis";

const EditDimBodyAnalitic = ({ editParam }) => {
  const { item, fieldFn } = editParam;
  const analisRes = useMemo(() => analisDim(item.Evals), [item]);
  const analisRecom = useMemo(() => recomDim(item.Evals), [item]);
  // const analisRes1 = useMemo(
  //   () => compareResponses({ respA: {}, respB: {} }),
  //   [item]
  // );

  return (
    <div className="w-100">
      <div className="respDim d-flex justify-content-center m-auto mt-4 w-100">
        {arrAB.map((field, i) => (
          <div className="rate-hor-wrap" key={i}>
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
                    className={item.Evals[field.a] >= el ? " hor-active" : ""}>
                    {el}
                  </div>
                  {/* {el === 1 ? "B" : ""} */}
                  <div
                    onClick={(e) =>
                      fieldFn.setNewEstim(
                        el === item.Evals[field.b] ? 0 : el,
                        field.b
                      )
                    }
                    className={item.Evals[field.b] >= el ? " hor-active" : ""}>
                    {el}
                  </div>
                </div>
              </>
            ))}
            <div className="hor-pair-title">
              <div>A</div>
              <div>B</div>
            </div>
            <p>{field.name}</p>
          </div>
        ))}
        <div className="rate-hor-wrap an-res">{analisRes}</div>
      </div>{" "}
      {analisRecom}
    </div>
  );
};

export default EditDimBodyAnalitic;
