import React from "react";
import { textParts } from "../constants/textParts";

const TxtBtns = ({ toJustif }) => {
  // const [curSection, setCurSection] = useState(null);
  return (
    <div className="current-list h-fit">
      <div className="text-list-body">
        {textParts &&
          textParts.map((el, i) => (
            <div className="current-item" onClick={() => toJustif(el)}>
              <div>{el.en}</div>
              <div className="ru">{el.ru}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TxtBtns;
