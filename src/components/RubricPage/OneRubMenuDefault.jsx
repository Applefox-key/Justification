import React from "react";
import { exampleSeparators } from "../../constants/rubricsTemplates";

const OneRubMenuDefault = ({ fieldFn, criteria, index, version }) => {
  const exSep = criteria.exExample === null ? -1 : Number(criteria.exExample);
  return (
    <>
      <div className={"separator-rub-btn"}>
        {Object.entries(exampleSeparators).map(([key, conf], i) => (
          <span
            onClick={(e) => {
              e.stopPropagation();

              fieldFn.setNewVal(Number(key), "exExample-" + index);
            }}>
            {exSep === Number(key) ? <mark>{conf.title} </mark> : conf.title}
            <br />
          </span>
        ))}
      </div>{" "}
    </>
  );
};

export default OneRubMenuDefault;
