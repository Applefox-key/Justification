import React from "react";
import { Button } from "react-bootstrap";
import { delFromHistory, getHistory } from "../../utils/localStorage";

const ContentSideItems = ({ itemsArr, toJustif, setCurrBtn, currentBtn }) => {
  return (
    <>
      {!!itemsArr.length &&
        itemsArr.map((el, i) => (
          <div key={i} className="variants-item" onClick={() => toJustif(el)}>
            <div>{el.en}</div>
            <div className="ru">{el.ru}</div>
            {el.level && <div className="level">{el.level}</div>}
            {currentBtn.name === "history" && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  delFromHistory(i);
                  setCurrBtn(getHistory());
                }}>
                x
              </Button>
            )}
          </div>
        ))}
    </>
  );
};

export default ContentSideItems;
