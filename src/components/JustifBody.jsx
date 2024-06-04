import React from "react";

const JustifBody = ({ justification, setJustification, setEdit }) => {
  return (
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
  );
};

export default JustifBody;
