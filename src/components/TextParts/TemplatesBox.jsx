import React, { useState } from "react";
import { copyToClipboard } from "../../utils/utilStr";
import { txtTemplatesGet, txtTemplatesSet } from "../../utils/localStorage";
import FileChooseBtn from "../UI/FileChooseBtn";
import { usePopup } from "../../hooks/usePopup";
import TemplateItem from "./TemplateItem";

const TemplatesBox = ({ toJustif, edit }) => {
  const [lev, setLev] = useState(null);
  const setPopup = usePopup();
  const [arr, setArr] = useState(txtTemplatesGet());
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
      setPopup("copied to the clipboard");
    }
  };

  const handleContextMenu = (event, el) => {
    event.preventDefault(); // Блокировка контекстного меню
    handleClick(event, el);
  };
  return (
    <div className={"variants-wrap-txt" + (edit ? "-edit" : " h-fit ")}>
      <div className={"levels-txt" + (edit ? "-edit" : "") + " "}>
        <div className="input-file-text">
          <FileChooseBtn defaultState={defaultState} onlyFirstSheet />
        </div>
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
          ))}{" "}
      </div>
      <div
        className={
          edit
            ? "text-list-body-edit justif-all-btn"
            : "text-list-body justif-all-btn"
        }>
        {arr &&
          arr
            .filter((item) => (lev ? item.level === lev : item))
            .map((el, i) => (
              <TemplateItem
                el={el}
                onContextMenu={(e) => handleContextMenu(e, el)}
                onMouseDown={(e) => handleClick(e, el)}
                key={i}
              />
            ))}
      </div>
    </div>
  );
};

export default TemplatesBox;
