import React, { useEffect, useState } from "react";
import FileItems from "./FileItems";
import List from "./List";

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
    <div className="variants-wrap">
      <div className="sheetsXls-wrap  justif-all-btn">
        {currentBtn.items.map((el, i) => (
          <div className="sheetsXls">
            <div
              key={i}
              className={
                curSection && curSection.name === el.name
                  ? "sheetsXls-item z0 activeEl"
                  : "sheetsXls-item z0"
              }
              onClick={() => setCurSection(el)}>
              <div>{el.name}</div>
            </div>{" "}
            {!!el && !!el.hint && !!el.hint.length && (
              <List isOnHover list={el.hint.filter((item) => !!item.ru)} />
            )}
          </div>
          //
        ))}
      </div>{" "}
      {/* {!!curSection && !!curSection.hint && !!curSection.hint.length && (
        <List list={curSection.hint} />
      )} */}
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
        </div>
      )}
      {!!curSection && !!curSection.items && !!curSection.items.length && (
        <div className="variants-body">
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
