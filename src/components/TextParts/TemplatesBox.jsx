import React, { useMemo, useState } from "react";
import { copyToClipboard } from "../../utils/utilStr";
import { txtTemplatesGet, txtTemplatesSet } from "../../utils/localStorage";
import FileChooseMenu from "../UI/FileChooseMenu";
import { usePopup } from "../../hooks/usePopup";
import TemplateItem from "./TemplateItem";
import TemplatesAddBox from "./TemplatesAddBox";

const TemplatesBox = ({ toJustif, edit }) => {
  const [lev, setLev] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const setPopup = usePopup();
  const [arr, setArr] = useState(txtTemplatesGet());
  const defaultState = (val) => {
    txtTemplatesSet(val, setArr);
  };
  const addDefaultState = (lev, en, ru) => {
    const ni = [...arr, { en: en, ru: ru, level: lev, note: "" }];
    txtTemplatesSet({ items: ni }, setArr);
  };
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
  const levelsArr = useMemo(() => {
    if (!arr || !arr.length) return [];
    return [...new Set(arr.map((item) => item.level))];
  }, [arr]);
  const handleContextMenu = (event, el) => {
    event.preventDefault(); // Блокировка контекстного меню
    handleClick(event, el);
  };
  return (
    <div className={"variants-wrap-txt" + (edit ? "-edit" : " h-fit ")}>
      <div className={"levels-txt" + (edit ? "-edit" : "") + " "}>
        <div className="input-file-text">
          <FileChooseMenu defaultState={defaultState} onlyFirstSheet />
          <button
            onClick={(e) => setAddMode(!addMode)}
            className="templates-wrap">
            +
          </button>
        </div>
        {!addMode && (
          <>
            <div
              className={lev === null ? "level active" : "level"}
              onClick={(e) => {
                e.stopPropagation();
                setLev(null);
              }}>
              all
            </div>

            {levelsArr.map((el, i) => (
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
          </>
        )}
      </div>
      <div
        className={
          edit
            ? "text-list-body-edit justif-all-btn"
            : "text-list-body justif-all-btn"
        }>
        {addMode && (
          <TemplatesAddBox
            addDefaultState={addDefaultState}
            levels={levelsArr}
          />
        )}
        {!addMode &&
          arr &&
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
