import React, { useEffect, useState } from "react";
import EditRubBody from "./EditRubBody";
import { BiSolidRightArrow } from "react-icons/bi";
import SummaryRub from "./SummaryRub";
import { FaAngleDoubleRight } from "react-icons/fa";
import { detectHeightRub } from "../../utils/analysis";
import { replaceQuotes } from "../../utils/utilStr";

const Rubricator = ({ editParam }) => {
  const [showRubricator, setShowRubricator] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const fieldFn = editParam.fieldFn;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (showRubricator) {
      requestAnimationFrame(() => {
        setReady(true);
      });
    } else {
      setReady(false);
    }
  }, [showRubricator]);
  const clickBtns = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case "hide":
        // requestAnimationFrame(() => {
        //   setShowRubricator((prev) => !prev);
        // });
        setShowRubricator(!showRubricator);
        // debugger;
        break;
      case "showHideBody":
        setShowBody(!showBody);
        break;
      case "delRubr":
        fieldFn.deleteRub();
        break;
      case "createRub":
        fieldFn.createRub();
        break;
      case "createRubP":
        fieldFn.createRub("punct");
        break;
      case "createRubU":
        fieldFn.createRub("upperCA");
        break;
      case "createRubN":
        fieldFn.createRub("fluency");
        break;
      case "createRubF":
        fieldFn.createRub("foreign");
        break;
      case "createRubG":
        fieldFn.createRub("gender");
        break;
      case "examplesQ":
        let rb = editParam.item.rubricator.map((el) => {
          return {
            ...el,
            example: el.rubric.includes(
              "Ответ использует правильную пунктуацию"
            )
              ? el.example
              : replaceQuotes(el.example),
          };
        });
        editParam.setItem({ ...editParam.item, rubricator: rb });
        break;
      default:
    }
  };
  const titleClick = (e) => {
    if (
      editParam.item &&
      !editParam.item.rubricator.length &&
      !showRubricator
    ) {
      e.stopPropagation();
      setShowRubricator(!showRubricator);
      fieldFn.createRub();
    } else clickBtns(e, "hide");
  };

  return (
    <div className="h-90">
      <div className="body-dim-line rub-title" onClick={titleClick}>
        <div className="rub-bode-menu">
          {showRubricator && (
            <>
              <button
                title="show or hide criteria"
                id="show-body-dim"
                onClick={(e) => clickBtns(e, "showHideBody")}>
                <BiSolidRightArrow className={showBody ? "arr-down " : ""} />
              </button>{" "}
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRub")}
                title="add new criteria">
                +
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubP")}
                title="add new criteria punctuation err">
                + «»
              </button>{" "}
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubU")}
                title="add new criteria punctuation err">
                + :A
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubN")}
                title="add new criteria fluency err">
                + LF
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubF")}
                title="add new criteria foreign language">
                +FR
              </button>{" "}
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubG")}
                title="add new criteria gender">
                +GN
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "examplesQ")}
                title="change quotation mark in examples">
                «»
              </button>{" "}
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "delRubr")}
                title="delete all rubrics">
                x
              </button>
            </>
          )}
        </div>
        <span>
          RUBRICATOR
          <span>
            {" (" + (editParam.item && editParam.item.rubricator.length) + ") "}
          </span>
          <FaAngleDoubleRight className={showRubricator ? "arr-down " : ""} />
        </span>
      </div>
      <div
        className={detectHeightRub(
          showRubricator,
          showRubricator && showSummary,
          true
        )}>
        {ready && (
          <div
            className={showRubricator ? "dimBox rubh" : "dimBox rubh hideBox"}>
            <EditRubBody
              editParam={{
                ...editParam,
                showBody,
                setShowBody,
              }}
            />
          </div>
        )}
      </div>
      <SummaryRub
        editParam={{
          ...editParam,
          showRubricator,
          showSummary,
          setShowSummary,
        }}
      />
    </div>
  );
};

export default Rubricator;
