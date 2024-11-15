import React, { useEffect, useState } from "react";

const RateVertical = ({ valStr, setValStr }) => {
  const [val, setVal] = useState(0);

  const onHandleCLick = (nv) => {
    const newVal = nv === val ? 0 : nv;
    if (newVal && !valStr) setValStr(newVal === 5 ? "OK" : "ISSUE");
    setVal(newVal);
  };

  useEffect(() => {
    if (!valStr && val > 0) setVal(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valStr]);
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
