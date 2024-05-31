import React from "react";
import { getHistory } from "../utils/localStorage";

const FilesList = ({ justparts, currBtn, setCurrBtn, defaultState }) => {
  return (
    <div className="partsBtns">
      <button
        className="resetBtn"
        onClick={() => {
          defaultState(null);
        }}>
        reset
      </button>
      {!!justparts.length &&
        justparts.map((el, i) => (
          <div
            className={
              currBtn && currBtn.name === el.name
                ? "parts-btn activeBtn"
                : "parts-btn"
            }
            onClick={() => {
              setCurrBtn(el);
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
          setCurrBtn(getHistory());
        }}>
        History
      </div>
    </div>
  );
};

export default FilesList;
