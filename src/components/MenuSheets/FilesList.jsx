import React from "react";
import { getHistory } from "../../utils/localStorage";

const FilesList = ({ justparts, currBtn, setCurrBtn }) => {
  return (
    <div className="bookXlsBtns-wrap">
      {!!justparts.length &&
        justparts.map((el, i) => (
          <div
            key={i}
            className={
              currBtn && currBtn.name === el.name
                ? "parts-btn activeBtn"
                : "parts-btn"
            }
            onClick={() => {
              currBtn && currBtn.name === el.name
                ? setCurrBtn(null)
                : setCurrBtn(el);
            }}>
            {el.name}
          </div>
        ))}
      <div
        className={
          currBtn && currBtn.name === "history"
            ? "parts-btn activeBtn"
            : "parts-btn"
        }
        onClick={() => {
          currBtn && currBtn.name === "history"
            ? setCurrBtn(null)
            : setCurrBtn(getHistory());
        }}>
        History
      </div>
    </div>
  );
};

export default FilesList;
