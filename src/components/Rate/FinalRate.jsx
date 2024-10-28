import React from "react";
import { labelsVerdict } from "../../utils/analysis";

const FinalRate = ({ value, setValue, lg = false }) => {
  const setClassName = (i) => {
    let cl = `rate rate${i + 1} `;

    if (!!value && !!value.resultNum && i === value.resultNum - 1) {
      if (value.resultNum < 4) cl += "rate-A";
      else if (value.resultNum > 4) cl += "rate-B";
      else cl += "rate-same";
    } else if (!!value && value.recomNum && value.recomNum.includes(i + 1))
      cl += "rate-recom";
    return cl;
  };

  return (
    <div className="header-fin">
      <div className="final-rate">
        {labelsVerdict.map((el, i) => (
          <div
            key={i}
            onClick={() => setValue(i + 1)}
            className={setClassName(i)}>
            {el[0]}
          </div>
        ))}
      </div>{" "}
      <span>
        {!!value && !!value.resultNum ? labelsVerdict[value.resultNum - 1] : ""}
      </span>
      {!!value && !!value.recom && <div className="recom">{value.recom}</div>}
    </div>
  );
};

export default FinalRate;
