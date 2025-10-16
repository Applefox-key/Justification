import React from "react";
import { Button } from "react-bootstrap";
import { delFromHistory, getHistory } from "../../utils/localStorage";
import { objectToText } from "../../utils/DOMfn";
import MyPortal from "../UI/MyPortal/MyPortal";

const ContentSideItems = ({ itemsArr, toJustif, setCurrBtn, currentBtn }) => {
  const elP = (el) => {
    if (el.en === "") return "";
    if (el.ru === "") return [el.en, null];

    const obj = JSON.parse(el.en);
    let nm = (obj.name ?? "") + (obj.taskId ?? "") + (obj.id ?? "");
    return [nm ? nm : "NONAME noid", obj];
  };

  const renderOneVariant = (el, i) => {
    const [title, elObj] = elP(el);

    let content = "";
    if (currentBtn.name === "history") {
      content = objectToText(elObj);
    }
    return (
      <>
        {currentBtn.name === "history" && (
          <span className="history-txt">{objectToText(content)}</span>
        )}
        <div>{title}</div>
      </>
    );
  };
  return (
    <>
      {!!itemsArr.length &&
        itemsArr.map((el, i) => (
          <div key={i} className="variants-item" onClick={() => toJustif(el)}>
            {renderOneVariant(el)}
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
