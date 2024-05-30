import React, { useEffect, useState } from "react";
import List from "./List";
import { Button } from "react-bootstrap";
import { delFromHistory, getHistory } from "../utils/localStorage";
import StrArea from "./StrArea";

const CurrentBtn = ({
  currentBtn,
  toJustif,
  setCurrBtn,
  curSection,
  setCurSection,
}) => {
  useEffect(() => {
    setCurSection(currentBtn.items.length === 1 ? currentBtn.items[0] : null);
  }, [currentBtn]);

  return (
    <div className="current-list">
      <div className="partsBtns-section">
        {currentBtn.items.map((el, i) => (
          <div
            className={
              curSection && curSection.name === el.name
                ? "current-item activeEl"
                : "current-item"
            }
            onClick={() => setCurSection(el)}>
            <div>{el.name}</div>
          </div>
          //
        ))}
      </div>

      <div className="current-list-body">
        {" "}
        <div className="textarea-box mb-2">
          <StrArea placeholder="...your notes" />
        </div>
        {/* {curSection && !!curSection.hint && <List list={curSection.hint} />} */}
        {curSection &&
          curSection.items.map((el, i) => (
            <div className="current-item" onClick={() => toJustif(el)}>
              <div>{el.en}</div>
              <div className="ru">{el.ru}</div>
              {el.level && <div className="level">{el.level}</div>}
              {currentBtn.name === "history" && (
                <Button
                  // className="simpleButton"
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
      </div>
    </div>
  );
};

export default CurrentBtn;
