import React, { useEffect, useState } from "react";
import FileItems from "./FileItems";
import HintItems from "./HintItems";
import { IoMdArrowDropdown } from "react-icons/io";

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
  const handleSwitch = () => {
    if (curSection !== null) {
      setCurSection(null);
      return;
    }
    if (!!currentBtn && currentBtn.items.length > 0)
      setCurSection(currentBtn.items[0]);
  };
  const hintArr =
    curSection && curSection.hint
      ? curSection.hint.filter((item) => !!item.ru)
      : [];
  return (
    <div className="variants-wrap">
      <div
        className={
          curSection === null
            ? "sheetsXls-wrap  justif-all-btn emptySheet"
            : "sheetsXls-wrap  justif-all-btn"
        }>
        <IoMdArrowDropdown
          onClick={handleSwitch}
          className={
            curSection !== null ? "menuArrow" : "menuArrow menuArrowRight"
          }
        />
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
            {/* {!!el && !!el.hint && !!el.hint.length && (
              <List isOnHover list={el.hint.filter((item) => !!item.ru)} />
            )} */}
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

export default FileSheets;
