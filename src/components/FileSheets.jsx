import React, { useEffect, useState } from "react";
import FileItems from "./FileItems";

const FileSheets = ({
  currentBtn,
  toJustif,
  setCurrBtn,
  curSection,
  setCurSection,
}) => {
  const [lev, setLev] = useState(null);
  useEffect(() => {
    if (currentBtn === null) return;
    setLev(null);
  }, [currentBtn, curSection]);
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
      {curSection && !!curSection.levels && !!curSection.levels.length && (
        <div className="levels">
          <div
            className={lev === null ? "level active" : "level"}
            onClick={(e) => {
              e.stopPropagation();
              setLev(null);
            }}>
            all
          </div>
          {curSection.levels.map((el, i) => (
            <div
              className={lev === el ? "level active" : "level"}
              onClick={(e) => {
                e.stopPropagation();
                setLev(el);
              }}>
              {el}
            </div>
          ))}
        </div>
      )}

      {curSection && !!curSection.items.length && (
        <div className="current-list-body">
          <FileItems
            itemsArr={
              lev === null
                ? curSection.items
                : curSection.items.filter((el) => el.level === lev)
            }
            toJustif={toJustif}
            setCurrBtn={setCurrBtn}
            currentBtn={currentBtn}
          />
        </div>
      )}
    </div>
  );
};

export default FileSheets;
