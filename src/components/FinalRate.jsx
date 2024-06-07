import React from "react";
import { labelsVerdict } from "../utils/analysis";
// import StarIcon from "@mui/icons-material/Star";

// function getLabelText(value) {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// }
// {result: result.comparisonResult,
// resultNum: result.comparisonResultNum,
// recom: result.comparisonRecom,}
const FinalRate = ({ value, setValue }) => {
  // const labels = [
  //   "A much better",
  //   "A better",
  //   "A slightly better",
  //   "Same",
  //   "B slightly better",
  //   "B better",
  //   "B much better",
  // ];

  const setClassName = (i) => {
    let cl = `rate rate${i + 1} `;
    if (!!value.resultNum && i === value.resultNum - 1)
      if (value.resultNum < 4) cl += "rate-A";
      else if (value.resultNum > 4) cl += "rate-B";
      else cl += "rate-same";
    else if (value.recomNum && value.recomNum.includes(i + 1))
      cl += "rate-recom";
    return cl;
  };

  return (
    <div className="header-fin">
      <div className="final-rate">
        {labelsVerdict.map((el, i) => (
          <div onClick={() => setValue(i + 1)} className={setClassName(i)}>
            {el[0]}
          </div>
        ))}
      </div>{" "}
      <span>{labelsVerdict[value.resultNum - 1]}</span>
      {!!value.recom && <div className="recom">{value.recom}</div>}
    </div>
  );
};

export default FinalRate;
