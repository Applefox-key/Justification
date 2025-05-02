import React from "react";
import { Button } from "react-bootstrap";
import { delFromHistory, getHistory } from "../../utils/localStorage";

const ContentSideItems = ({ itemsArr, toJustif, setCurrBtn, currentBtn }) => {
  const elP = (el) => {
    // debugger;
    console.log(el);

    if (el.ru === "") return el.en;
    const obj = JSON.parse(el.en);
    let nm = (obj.name ?? "") + (obj.taskId ?? "") + (obj.id ?? "");
    return nm ? nm : el.en;
  };

  return (
    <>
      {!!itemsArr.length &&
        itemsArr.map((el, i) => (
          <div key={i} className="variants-item" onClick={() => toJustif(el)}>
            <div>{elP(el)}</div>

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
