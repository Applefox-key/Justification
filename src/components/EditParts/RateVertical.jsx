import React from "react";

const RateVertical = ({ setVal, val }) => {
  const onHandleCLick = (nv) => {
    const newVal = nv === val ? 0 : nv;
    setVal(newVal);
  };

  return (
    <div className="rate-vert-wrap">
      {[5, 4, 3, 2, 1].map((el) => (
        <div
          onClick={(e) => onHandleCLick(el)}
          className={val === el ? "rate-vert-box vert-active" : "rate-vert-box"}
          key={el}>
          {el}
        </div>
      ))}
    </div>
  );
};

export default RateVertical;
