import React from "react";
import { textParts } from "../constants/textParts";

const TxtBtns = ({ toJustif }) => {
  return (
    <div className="current-list h-fit">
      <div className="text-list-body">
        {textParts &&
          textParts.map((el, i) => (
            <div key={i} className="current-item" onClick={() => toJustif(el)}>
              <div>{el.en}</div>
              <div className="ru">{el.ru}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TxtBtns;
