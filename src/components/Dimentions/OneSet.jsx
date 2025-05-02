import React from "react";

const OneSet = ({ el, curSet, setCurSet }) => {
  return (
    <button
      className="btnToHis intense"
      title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
      onClick={setCurSet}>
      {el.map((it, i) => (
        <div>{it.name}</div>
      ))}
    </button>
  );
};

export default OneSet;
