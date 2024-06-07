import React from "react";

const SelectRange = ({ crit }) => {
  const arrLev = ["++", "+", "OK"];
  return (
    <div className="d-flex">
      {arrLev.map((el, i) => (
        <button className={crit.RespA - 1 === i ? "btn-selected" : ""}>
          {el}
        </button>
      ))}
      {arrLev.map((el, i) => (
        <button className={crit.RespB - 1 === i ? "btn-selected" : ""}>
          {el}
        </button>
      ))}
    </div>
  );
};

export default SelectRange;
