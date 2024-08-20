import React, { useEffect, useState } from "react";
import FileItems from "./FileItems";
import HintItems from "../HintItems";

const ContentSide = ({ currentBtn, toJustif, setCurrBtn, curSection }) => {
  const [lev, setLev] = useState(null);
  useEffect(() => {
    if (currentBtn === null) return;
    setLev(null);
  }, [currentBtn, curSection]);
  const hintArr =
    curSection && curSection.hint
      ? curSection.hint.filter((item) => !!item.ru)
      : [];
  return (
    <div className="wrap-side">
      {!!curSection && !!curSection.levels && !!curSection.levels.length && (
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
              key={i}
              className={lev === el ? "level active" : "level"}
              onClick={(e) => {
                e.stopPropagation();
                setLev(el);
              }}>
              {el}
            </div>
          ))}
          {!!hintArr.length && (
            <div
              key={"hint"}
              className={lev === "hint" ? "levelHint active" : "levelHint"}
              onClick={(e) => {
                e.stopPropagation();
                setLev("hint");
              }}>
              HINT
            </div>
          )}
        </div>
      )}
      {!!curSection && !!curSection.items && !!curSection.items.length && (
        <div className="variants-body">
          {lev !== "hint" ? (
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
          ) : (
            <HintItems itemsArr={hintArr} />
          )}
        </div>
      )}
    </div>
  );
};

export default ContentSide;
