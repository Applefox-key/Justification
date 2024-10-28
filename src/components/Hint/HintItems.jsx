import React from "react";

const HintItems = ({ itemsArr }) => {
  return (
    <>
      {!!itemsArr.length &&
        itemsArr.map((el, i) => (
          <div
            key={i}
            className="variants-item"
            onClick={(e) => e.stopPropagation()}>
            <div>{el.ru}</div>
            {el.en && <div className="level activeHint">{el.en}</div>}
          </div>
        ))}
    </>
  );
};

export default HintItems;
