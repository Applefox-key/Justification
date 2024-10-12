import React, { useState } from "react";
import { copyToClipboard } from "../../utils/utilStr";
import { txtTemplatesGet, txtTemplatesSet } from "../../utils/localStorage";
import FileChooseBtn from "../UI/FileChooseBtn";

const TxtBtns = ({ toJustif, edit }) => {
  const [lev, setLev] = useState(null);

  const [arr, setArr] = useState(txtTemplatesGet());
  const [showMessage, setShowMessage] = useState(false);
  const defaultState = (val) => {
    txtTemplatesSet(val, setArr);
  };
  console.log(arr);

  const handleClick = (e, el) => {
    let b = e.button;
    //left mouse button
    if (b === 0) {
      toJustif(el);
      return;
    } //right mouse button
    if (b === 2) {
      copyToClipboard(el.en);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };
  const handleContextMenu = (event) => {
    event.preventDefault(); // Блокировка контекстного меню
  };
  return (
    <div className={"variants-wrap-txt" + (edit ? "-edit" : " h-fit ")}>
      <div className={"levels-txt" + (edit ? "-edit" : "") + " "}>
        <div className="input-file-text">
          <FileChooseBtn defaultState={defaultState} onlyFirstSheet />
        </div>
        {/* <button
          title="save selection as a template"
          // disabled={!textSelected}
          onClick={() => addNewElement(lev, setArr, arr)}
          className="btnToHis  toTempBtn ordinary">
          <TiArrowLeftThick />
        </button> */}
        <div
          className={lev === null ? "level active" : "level"}
          onClick={(e) => {
            e.stopPropagation();
            setLev(null);
          }}>
          all
        </div>
        {arr
          .reduce((sum, item) => {
            return sum.includes(item.level) ? sum : [...sum, item.level];
          }, [])
          .map((el, i) => (
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
      <div
        className={
          edit
            ? "text-list-body-edit justif-all-btn"
            : "text-list-body justif-all-btn"
        }>
        <div className={`message ${showMessage ? "visible" : ""}`}>
          copied to the clipboard
        </div>
        {arr &&
          arr
            .filter((item) => (lev ? item.level === lev : item))
            .map((el, i) => (
              <div
                onContextMenu={handleContextMenu}
                onMouseDown={(e) => handleClick(e, el)}
                key={i}
                className="current-item-txt">
                <div>{el.en}</div>
                <div className="ru">{el.ru}</div>{" "}
              </div>
            ))}
      </div>
    </div>
  );
};

export default TxtBtns;
