import React from "react";

const RubRespBtn = ({
  value,
  setValue,
  field,
  small,
  hide,
  valueEr,
  switchSize,
}) => {
  const scaleSm = { "-1": "NA", 0: "No", 1: "Mn", 2: "Mj" };
  const onClick = (e) => {
    e.stopPropagation();
    const newV = value + 1 > 2 ? -1 : value + 1;
    setValue(newV, field);
  };

  return (
    <>
      {small ? (
        <button
          className={
            "rubBtn rubB" + value + (value > 0 && !valueEr ? " nojust" : "")
          }
          onClick={onClick}
          onContextMenu={(e) => {
            e.preventDefault();
            switchSize(e);
          }}>
          {scaleSm[value]}
        </button>
      ) : (
        <button
          className={"rubBtnScore rubB" + value + (value < 1 ? " hideBtn" : "")}
          onClick={onClick}>
          {scaleSm[value]}
        </button>
      )}
    </>
  );
};

export default RubRespBtn;
