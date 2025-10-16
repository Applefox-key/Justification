import React, { useEffect, useRef, useState } from "react";
import EditFieldRub from "./EditFieldRub";
import RubRespBtn from "./RubRespBtn";
import { copyToClipboard, editTextAction } from "../../utils/utilStr";
import {
  FaArrowDown,
  FaArrowUp,
  FaRegCopy,
  FaRegWindowMaximize,
} from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { BiSolidRightArrow } from "react-icons/bi";
import { getRubricName } from "../../utils/analysis";
import { usePopup } from "../../hooks/usePopup";

import OneRubMenuDefault from "../RubricPage/OneRubMenuDefault";
import OneRubMenuWrap from "../RubricPage/OneRubMenuWrap";
import { SlMagicWand } from "react-icons/sl";

const SHOW = {
  CLOSED: 0,
  SMALL: 1,
  BIG: 2,
  BIG_FROM_CLOSED: 3,
};

const EditOneRub = ({ editParam, simpleMode = false }) => {
  const { fieldId, fieldFn, showBody, criteria, index, noScores, item } =
    editParam;

  const [show, setShow] = useState(criteria.new ? SHOW.SMALL : SHOW.CLOSED);
  const popup = usePopup();
  const clickTimeout = useRef(null);
  const isFirstRender = useRef(true);

  /** ====== synchronization showBody ====== */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof showBody === "boolean" && showBody !== !!show) {
      if (criteria.new && !showBody) fieldFn.notNew(index);
      setShow(showBody ? SHOW.SMALL : SHOW.CLOSED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBody]);

  /** ====== ХЕЛПЕРЫ ====== */
  const rubricName = (format = []) =>
    getRubricName(criteria, editParam.item.version, format);

  const updateShow = (next) => {
    setShow(next);
    if (criteria.new) fieldFn.notNew(index);
  };

  const toggleShow = () => updateShow(show ? SHOW.CLOSED : SHOW.SMALL);

  const toggleExpand = (e) => {
    e.stopPropagation();
    const transitions = {
      [SHOW.CLOSED]: SHOW.BIG_FROM_CLOSED,
      [SHOW.SMALL]: SHOW.CLOSED,
      [SHOW.BIG]: SHOW.SMALL,
      [SHOW.BIG_FROM_CLOSED]: SHOW.CLOSED,
    };
    updateShow(transitions[show] ?? SHOW.CLOSED);
  };

  const switchSize = (e) => {
    e.stopPropagation();
    const transitions = {
      [SHOW.CLOSED]: SHOW.BIG,
      [SHOW.SMALL]: SHOW.BIG,
      [SHOW.BIG]: SHOW.SMALL,
      [SHOW.BIG_FROM_CLOSED]: SHOW.BIG,
    };
    updateShow(transitions[show] ?? SHOW.CLOSED);
  };

  /** ====== actions ====== */
  const actions = {
    moveup: () => fieldFn.move(index, "up"),
    movedown: () => fieldFn.move(index, "down"),
    copy: () => copyToClipboard(rubricName(), popup),
    del: () => fieldFn.delRub(index),
  };

  const handleAction = (e, type) => {
    e.stopPropagation();
    actions[type]?.();
  };

  /** ====== Clicks ====== */
  const handleContextMenu = (e) => {
    e.preventDefault();
    handleAction(e, "copy");
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (clickTimeout.current) {
      // double click
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      toggleExpand(e);
    } else {
      clickTimeout.current = setTimeout(() => {
        updateShow(SHOW.SMALL);
        clickTimeout.current = null;
      }, 150);
    }
  };

  /** ====== Render ====== */
  const renderClosedView = () => (
    <div
      className="rub-text-closed"
      onClick={handleClick}
      onContextMenu={handleContextMenu}>
      <span onClick={(e) => handleAction(e, "copy")} className="num">
        {index + 1}
      </span>
      <div>{rubricName(simpleMode ? [] : ["all"])}</div>
    </div>
  );

  const renderRubTextArea = (arr) => (
    <>
      {arr.map((field) => (
        <>
          <EditFieldRub
            key={field}
            show={show}
            btnSide={field === "comment" ? "bottom" : "right"}
            classN={field + "-rub-edit-input"}
            classF={field === "comment" ? "comment-edit" : ""}
            autoHeight
            fieldName={`${field}-${index}-CR${index + 1}`}
            placeholder={
              field === "comment"
                ? `short name \n custom jusification for error `
                : `${field} text`
            }
            isActive={fieldId === `${field}-${index}-CR${index + 1}`}
            fieldVal={criteria[field]}
            fieldFn={fieldFn}
            autoFocus={field === "rubric"}
          />
        </>
      ))}
    </>
  );

  const renderOpenFields = () => (
    <>
      <div
        className={`rub-open
        ${fieldFn.isRubricInEdit(index) ? "rub-active " : ""}
        `}>
        <>
          {" "}
          <div className="d-flex w-100 justify-content-between">
            <div className="w-100">
              {renderRubTextArea(["rubric"])}{" "}
              <OneRubMenuDefault
                fieldFn={fieldFn}
                switchSize={switchSize}
                criteria={criteria}
                index={index}
              />
              {renderRubTextArea(["example"])}
            </div>

            {renderRubTextArea(["comment"])}
          </div>
          {<i>{rubricName(["separator"])}</i>}
        </>
      </div>
    </>
  );

  const renderScores = () => (
    <div className="rub-resp-box">
      {Array.from({ length: item.countR }, (_, i) => i + 1).map((el) => (
        <div
          key={el}
          className={item.countR === 2 ? "rub-score-box rub2" : "rub-score-box"}
          style={{ width: `${100 / item.countR}%` }}>
          <RubRespBtn
            hide
            isMinor={item.version === 0}
            value={criteria["score" + el]}
            setValue={fieldFn.setNewVal}
            field={`score${el}-${index}`}
          />
          {criteria["score" + el] > 0 && (
            <EditFieldRub
              classN={`rubBtxt${criteria["score" + el]}`}
              show={show}
              btnSide="right"
              fieldName={`error${el}-${index}-C${index + 1}`}
              placeholder={`error${el}`}
              isActive={fieldId === `error${el}-${index}-C${index + 1}`}
              fieldVal={criteria["error" + el]}
              fieldFn={fieldFn}
              autoHeight
            />
          )}
        </div>
      ))}
    </div>
  );

  // const applyAction = useCallback(
  //   (action, isIgnore = false) => {
  //     if (!fieldId) return;
  //     editTextAction(fieldId, handleTxt, fieldFn.setNewVal, action, isIgnore);
  //   },
  //   [fieldId, handleTxt, setHandleTxt]
  // );

  const magic = async (e) => {
    e.stopPropagation();
    editTextAction(
      fieldId,
      fieldFn.getFieldValue(),
      fieldFn.setNewVal,
      "rubErrComm",
      true
    );
  };
  return (
    <>
      <div className={show ? "wrap-rub one-rub" : "wrap-rub one-rub-close"}>
        {/* Title */}
        <div className="mav-block-one-rub">
          <div className="d-flex">
            <button className="rubBtn" onClick={toggleShow}>
              <BiSolidRightArrow className={show ? "arr-down" : ""} />
              <span>{index + 1}</span>
            </button>
            <button
              className="rubBtn rub-dsb"
              onClick={(e) => handleAction(e, "moveup")}>
              <FaArrowUp />
            </button>
            <button
              className="rubBtn rub-dsb"
              onClick={(e) => handleAction(e, "movedown")}>
              <FaArrowDown />
            </button>
          </div>
          {!!show && (
            <div className="toggle-rub-open" onClick={toggleShow}>
              {fieldId === `rubric-${index}-CR${index + 1}` && (
                <OneRubMenuWrap
                  criteria={criteria}
                  fieldFn={fieldFn}
                  index={index}
                  version={item.version}
                />
              )}{" "}
              {/* <OneRubMenuDefault
                fieldFn={fieldFn}
                switchSize={switchSize}
                criteria={criteria}
                index={index}
              /> */}
              {fieldFn.isRubricInEdit(index) && (
                <span>✅{/* <FcEditImage /> */}</span>
              )}
            </div>
          )}
        </div>
        {/*Main part*/}
        <div
          id={`rubr${index}`}
          className={`${show ? "field-rub-open" : "field-rub-close"} ${
            show > SHOW.SMALL ? "active-rub-edit" : ""
          }`}>
          <div
            onClick={toggleExpand}
            className={`${
              show ? "rub-score-box-small" : "d-flex align-items-center"
            } ${show > SHOW.SMALL ? "greyTop" : ""}`}>
            {!!show && (
              <>
                <span
                  className="rubName"
                  onClick={(e) => handleAction(e, "copy")}>
                  CRITERION {index + 1}
                </span>
              </>
            )}
            <div className="d-flex align-items-center">
              {!!show && (
                <>
                  <mark>
                    <span
                      onClick={(e) => e.stopPropagation()}
                      className="header-comment">
                      {criteria.comment.split("\n")[0]}- {index + 1}
                    </span>
                  </mark>
                  <button className="rubBtn" onClick={magic}>
                    <SlMagicWand />
                  </button>
                </>
              )}
              {!!show && (
                <button className={"rubBtn"} onClick={switchSize}>
                  <FaRegWindowMaximize />
                </button>
              )}
              <button
                className="rubBtn"
                onClick={(e) => handleAction(e, "copy")}>
                <FaRegCopy />
              </button>
              {!noScores && (
                <div
                  className="rub-color-box"
                  onClick={(e) => e.stopPropagation()}
                  datarub={`${index + 1}) ${criteria.rubric}`}>
                  {Array.from({ length: item.countR }, (_, i) => i + 1).map(
                    (el) => (
                      <RubRespBtn
                        key={el}
                        small
                        isMinor={item.version === 0}
                        value={criteria["score" + el]}
                        setValue={fieldFn.setNewVal}
                        field={`score${el}-${index}`}
                        valueEr={criteria["error" + el]}
                        switchSize={switchSize}
                      />
                    )
                  )}
                </div>
              )}
              <span onClick={(e) => handleAction(e, "copy")} className="num">
                {index + 1}
              </span>
              <button
                className="rubBtn rub-dsb"
                onClick={(e) => handleAction(e, "del")}>
                <AiOutlineClear />
              </button>
            </div>
          </div>
          {!show && (
            <div className="d-flex w-100 ">
              {renderClosedView()}{" "}
              {/* <span
                  className={`header-comment ${
                    noScores ? "small-indent" : ""
                  }`}>
                  {criteria.comment.split("\n")[0]} - {index + 1}
                </span>{" "} */}
              <div className={`rub-com  ${noScores ? "small-indent" : ""}`}>
                <span className="comm">{criteria.comment.split("\n")[0]} </span>{" "}
                <span>-{index + 1}</span>
              </div>{" "}
            </div>
          )}

          {!!show && (
            <>
              {renderOpenFields()}

              {renderScores()}
            </>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default EditOneRub;
