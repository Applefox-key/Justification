import React from "react";
import { replacementsGeneral } from "../../constants/replacements";
import { Button } from "react-bootstrap";

const Hint = () => {
  return (
    <Button className="btnToHis  hintBtn">
      ?
      <div className="hint">
        {replacementsGeneral
          .filter((el) => el.show)
          .map((item, i) => (
            <div key={i}>
              {item.newT} :<span>{item.oldT.join("/")}</span>
            </div>
          ))}
      </div>
    </Button>
  );
};

export default Hint;
