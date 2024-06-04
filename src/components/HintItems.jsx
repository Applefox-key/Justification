import React from "react";
import { Button } from "react-bootstrap";
import { delFromHistory, getHistory } from "../utils/localStorage";

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
            {/* <div className="ru">{el.ru}</div> */}
            {el.en && <div className="level activeHint">{el.en}</div>}
          </div>
        ))}
    </>
  );
};

export default HintItems;
