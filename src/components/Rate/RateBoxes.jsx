import React, { useMemo } from "react";
import { labelsVerdict, labelsVerdictEdit } from "../../utils/analysis";

const RateBoxes = ({ callback, choosed = -1 }) => {
  const clN = useMemo(() => {
    if (choosed < 0) return "";
    if (choosed === 3) return "rate-same";
    if (choosed < 3) return "rate-A";
    else if (choosed > 3) return "rate-B";
  }, [choosed]);
  return (
    <div className="header-fin">
      <div className="final-rate">
        {labelsVerdict.map((el, i) => (
          <div
            onClick={() => callback({ title: labelsVerdictEdit[i], num: i })}
            title={labelsVerdictEdit[i]}
            className={`rate rate${i + 1} ${i === choosed ? clN : ""}`}>
            {el[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RateBoxes;
