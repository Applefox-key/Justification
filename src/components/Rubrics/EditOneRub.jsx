import React, { useEffect, useRef, useState } from "react";
import EditFieldRub from "./EditFieldRub";
import RubRespBtn from "./RubRespBtn";
import { copyToClipboard } from "../../utils/utilStr";
import {
  FaArrowDown,
  FaArrowUp,
  FaRegCopy,
  FaRegWindowMaximize,
} from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { BiSolidRightArrow } from "react-icons/bi";
import { getRubricName } from "../../utils/analysis";
import FlowerBtn from "../EditBtns/FlowerBtn";
import { usePopup } from "../../hooks/usePopup";

const EditOneRub = ({ editParam }) => {
  const { fieldId, fieldFn, showBody, criteria, index, countR } = editParam;
  const [show, setShow] = useState(criteria.new ? 1 : 0);
  // const [showBig, setShowBig] = useState(0); //
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof showBody === "boolean" && showBody !== !!show) {
      if (criteria.new && !showBody) fieldFn.notNew(index);
      setShow(showBody ? 1 : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBody]);
  const rubricName = (getTxt = false) => {
    return getRubricName(criteria, getTxt);
  };
  const changeShow = () => {
    const stateShow = show;
    setShow(stateShow ? 0 : 1);
    if (criteria.new) fieldFn.notNew(index);
  };
  const popup = usePopup();
  const changeShowDiv = (e) => {
    e.stopPropagation();
    const stateShow = show;
    //closed 0 0    0
    //open small 1 0  1
    //open big from small 1 1   2
    //open big from closed 1 2  3

    switch (stateShow) {
      case 0:
        setShow(3);
        break;
      case 1:
        setShow(0);
        break;
      case 2:
        setShow(1);
        break;
      case 3:
        setShow(0);
        break;

      default:
        break;
    }
    if (criteria.new) fieldFn.notNew(index);
  };

  const btnsRubOnClick = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "moveup":
        fieldFn.move(index, "up");
        break;
      case "movedown":
        fieldFn.move(index, "down");
        break;
      case "copy":
        copyToClipboard(rubricName(true), popup);
        break;
      case "del":
        fieldFn.delRub(index);
        break;
      default:
    }
  };
  const switchSize = (e) => {
    e.stopPropagation();

    const stateShow = show;
    //closed 0 0    0
    //open small 1 0  1
    //open big from small 1 1   2
    //open big from closed 1 2  3

    switch (stateShow) {
      case 0:
        setShow(1);
        break;
      case 1:
        setShow(2);
        break;
      case 2:
        setShow(1);
        break;
      case 3:
        setShow(2);
        break;

      default:
        break;
    }
  };
  const handleContextMenu = (e) => {
    e.preventDefault(); // Блокировка контекстного меню
    if (e.button === 2) {
      btnsRubOnClick(e, "copy");
    }
  };
  return (
    <>
      <div className={!!show ? "wrap-rub one-rub" : "wrap-rub one-rub-close"}>
        <button className="rubBtn" onClick={changeShow}>
          <BiSolidRightArrow className={show ? "arr-down " : ""} />
          <span>{index + 1}</span>
        </button>

        <div
          id={"rubr" + index}
          className={
            (!!show ? "field-rub-open" : "field-rub-close") +
            (show > 1 ? " active-rub-edit" : "")
          }>
          <div
            onClick={changeShowDiv}
            className={
              (show ? "rub-score-box-small" : "d-flex") +
              (show > 1 ? " greyTop" : "")
            }>
            {!!show && (
              <>
                {/* <div>
                  <HotBtns
                    btnsArrD={[{ name: "RUBRICS", btns: autoreplaceRub }]}
                    toJustif={() => ""}
                  />
                </div>{" "} */}
                <FlowerBtn
                  className="rubBtn"
                  fieldId={fieldId}
                  fieldFn={fieldFn}
                  type={"«»"}
                />
                <FlowerBtn
                  className="rubBtn"
                  fieldId={fieldId}
                  fieldFn={fieldFn}
                />
                <button className={"rubBtn"} onClick={switchSize}>
                  <FaRegWindowMaximize />
                </button>{" "}
                <span
                  className="rubName"
                  onClick={(e) => btnsRubOnClick(e, "copy")}>
                  CRITERIA {index + 1}
                </span>
                <button
                  className={""}
                  onClick={(e) => {
                    e.stopPropagation();
                    fieldFn.setNewValRub(
                      !criteria.exExample,
                      "exExample-" + index
                    );
                  }}>
                  {criteria.exExample ? (
                    <>
                      <strong>а именно: / </strong> Например
                    </>
                  ) : (
                    <>
                      а именно:<strong> / Например</strong>
                    </>
                  )}
                </button>
              </>
            )}
            <button
              className={"rubBtn"}
              onClick={(e) => btnsRubOnClick(e, "copy")}>
              <FaRegCopy />
            </button>
            <div
              className="rub-color-box"
              onClick={(e) => e.stopPropagation()}
              datarub={index + 1 + ") " + criteria.rubric}>
              {(countR === 2 ? [1, 2] : [1, 2, 3, 4]).map((el, i) => (
                <RubRespBtn
                  key={el}
                  small
                  value={criteria["score" + el]}
                  setValue={fieldFn.setNewValRub}
                  field={"score" + el + "-" + index}
                  valueEr={criteria["error" + el]}
                  switchSize={switchSize}
                />
              ))}
            </div>
            <span onClick={(e) => btnsRubOnClick(e, "copy")} className="num">
              {index + 1}
            </span>

            <button
              className={"rubBtn rub-dsb"}
              onClick={(e) => btnsRubOnClick(e, "del")}>
              <AiOutlineClear />
            </button>
            <button
              className={"rubBtn rub-dsb"}
              onClick={(e) => btnsRubOnClick(e, "moveup")}>
              <FaArrowUp />
            </button>
            <button
              className={"rubBtn rub-dsb"}
              onClick={(e) => btnsRubOnClick(e, "movedown")}>
              <FaArrowDown />
            </button>
          </div>
          {show ? (
            <div className="rub-open">
              <EditFieldRub
                show={show} // key={i}
                fieldName={"rubric-" + index + "-CR" + (index + 1)}
                placeholder={"criteria text"}
                isActive={fieldId === "rubric-" + index + "-CR" + (index + 1)}
                fieldVal={criteria.rubric}
                fieldFn={fieldFn}
                autoFocus
              />

              <EditFieldRub
                show={show} // key={i}
                fieldName={"example-" + index + "-CR" + (index + 1)}
                placeholder={"example text"}
                isActive={fieldId === "example-" + index + "-CR" + (index + 1)}
                fieldVal={criteria.example}
                fieldFn={fieldFn}
              />
            </div>
          ) : (
            <div
              className="rub-text-closed"
              onClick={changeShowDiv}
              onContextMenu={(e) => handleContextMenu(e)}
              onDoubleClick={(e) => btnsRubOnClick(e, "copy")}>
              {rubricName()}{" "}
            </div>
          )}
          {/* {[1, 2, 3, 4].map((el, i) => (
            <RubRespBtn
              key={el}
              small
              value={criteria["score" + el]}
              setValue={fieldFn.setNewValRub}
              field={"score" + el + "-" + index}
              valueEr={criteria["error" + el]}
            />
          ))} */}
          {!!show && (
            <div className="rub-resp-box">
              {(countR === 2 ? [1, 2] : [1, 2, 3, 4]).map((el, i) => (
                <div
                  key={i}
                  className={
                    countR === 2 ? "rub-score-box rub2" : "rub-score-box"
                  }>
                  <RubRespBtn
                    hide
                    value={criteria["score" + el]}
                    setValue={fieldFn.setNewValRub}
                    field={"score" + el + "-" + index}
                  />

                  {criteria["score" + el] > 0 ? (
                    <EditFieldRub
                      classN={"rubBtxt" + criteria["score" + el]}
                      show={show} // key={i}
                      fieldName={
                        "error" + el + "-" + index + "-C" + (index + 1)
                      }
                      placeholder={"error" + el}
                      isActive={
                        fieldId ===
                        "error" + el + "-" + index + "-C" + (index + 1)
                      }
                      fieldVal={criteria["error" + el]}
                      fieldFn={fieldFn}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditOneRub;
