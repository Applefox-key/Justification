import React from "react";

const JustifBody = ({ justification, setJustification, setEdit }) => {
  const concatenateEnFields = () => {
    return justification
      .map((obj) => obj.en)
      .reduce((acc, val) => {
        if (val === "." || val === ",") {
          return acc + val;
        }
        return acc + " " + val;
      }, "")
      .trim();
  };
  const allJust = concatenateEnFields();

  return (
    <>
      <div className="justif-body">
        {justification.map((el, i) => (
          <div key={i} className="justif-item" onClick={() => setEdit(i)}>
            {el.en}
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
      {allJust && (
        <div className="justif-all">
          {allJust}
          <button onClick={() => setJustification([{ en: allJust, ru: "" }])}>
            join
          </button>
        </div>
      )}
    </>
  );
};

export default JustifBody;
