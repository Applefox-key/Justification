import React, { useMemo } from "react";
import { labelsFullVerdict, labelsFullVerdictEdit } from "../../utils/analysis";
import { applyAction } from "../../utils/utilStr";

const RateBoxes = ({ callback, choosed = -1, action = "RAB" }) => {
  const rateStr = (i) =>
    i > -1 ? applyAction(labelsFullVerdictEdit[i], action) : "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const titleChoosed = useMemo(() => rateStr(choosed), [action, choosed]);

  const clN = useMemo(() => {
    if (choosed < 0) return "";
    if (choosed === 4) return "rate-same";
    if (choosed < 4) return "rate-A";
    else if (choosed > 4) return "rate-B";
  }, [choosed]);

  return (
    <div className="header-fin">
      <div className="final-rate">
        {labelsFullVerdict.map((el, i) => (
          <div
            key={i}
            onClick={() => callback({ title: rateStr(i), num: i })}
            title={labelsFullVerdictEdit[i]}
            className={`rate rates${i + 1} ${i === choosed ? clN : ""}`}>
            {el[0]}
          </div>
        ))}
      </div>
      {choosed > -1 && <span>{titleChoosed}</span>}
    </div>
  );
};

export default RateBoxes;
