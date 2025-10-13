import React, { useMemo } from "react";
import { labelsFullVerdict, labelsFullVerdictEdit } from "../../utils/analysis";
import { useRightClickCopy } from "../../hooks/useRightClickCopy";

const RateBoxes = ({ likert, choosed = -1, nospan = false }) => {
  const { setNewRate, titleChoosed } = likert;

  const clN = useMemo(() => {
    if (choosed < 0) return "";
    if (choosed === 4) return "rate-same";
    if (choosed < 4) return "rate-A";
    else if (choosed > 4) return "rate-B";
  }, [choosed]);

  const onContextMenuClick = useRightClickCopy();

  return (
    <div className="header-fin">
      <div className="final-rate">
        {labelsFullVerdict.map((el, i) => (
          <div
            key={i}
            onClick={(e) => setNewRate(e, i)}
            onContextMenu={(e) =>
              onContextMenuClick(e, labelsFullVerdictEdit[i])
            }
            title={labelsFullVerdictEdit[i]}
            className={`rate rates${i + 1} ${i === choosed ? clN : ""}`}>
            {el[0]}
          </div>
        ))}
      </div>
      {choosed > -1 && titleChoosed && !nospan && <span>{titleChoosed}</span>}
    </div>
  );
};

export default RateBoxes;
