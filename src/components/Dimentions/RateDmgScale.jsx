import React from "react";
import { rateColorClasses } from "../../utils/rates";

const RateDmgScale = ({ setVal, val, cl, horiz, addElem }) => {
  const onHandleCLick = (nv) => {
    const newVal = nv === val ? 0 : nv;
    setVal(newVal);
  };

  return (
    <div
      className={
        "rate-vert-wrap " +
        (horiz ? " horiz-score " : "") +
        rateColorClasses[val]
      }>
      {addElem || <></>}
      {[5, 4, 3, 2, 1].map((el) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onHandleCLick(el);
          }}
          className={
            (val === el ? "rate-vert-box vert-active" : "rate-vert-box") +
            (!cl ? "" : " " + cl)
          }
          key={el}>
          {el}
        </div>
      ))}
    </div>
  );
};

export default RateDmgScale;
