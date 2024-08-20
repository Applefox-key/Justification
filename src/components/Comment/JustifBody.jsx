import React from "react";
import { highlightedText } from "../../utils/utilStr";

const JustifBody = ({
  justification,
  setJustification,
  setEdit,
  compliteCrit,
}) => {
  return (
    <div className="justif-body">
      {justification.map((el, i) => (
        <div key={i} className="justif-item" onClick={() => setEdit(i)}>
          {highlightedText(el.en, compliteCrit(true))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setJustification(
                justification.slice(0, i).concat(justification.slice(i + 1))
              );
            }}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default JustifBody;
