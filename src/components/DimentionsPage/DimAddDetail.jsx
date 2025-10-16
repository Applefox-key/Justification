import React from "react";
import { FaMinus } from "react-icons/fa";

const DimAddDetail = ({ val, setVal, title, id, isBtn }) => {
  return (
    <div className="add-details ps-1">
      {isBtn ? (
        <button id="show-body-dim" onClick={() => setVal(!val)}>
          <FaMinus className={!val ? " " : "arr-down"} /> {title}
        </button>
      ) : (
        <>
          <input
            id={id}
            type="checkbox"
            checked={val}
            onChange={() => setVal(!val)}
          />
          <label htmlFor={id}>{title}</label>
        </>
      )}
    </div>
  );
};
export default DimAddDetail;
