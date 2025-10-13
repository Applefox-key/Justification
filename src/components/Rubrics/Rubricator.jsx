import React, { useEffect, useState } from "react";
import EditRubBody from "./EditRubBody";
import { BiSolidRightArrow } from "react-icons/bi";
import SummaryRub from "./SummaryRub";
import { FaAngleDoubleRight } from "react-icons/fa";
import { detectHeightRub } from "../../utils/analysis";
import { copyToClipboard, replaceQuotesUniversal } from "../../utils/utilStr";
import { TiPlusOutline } from "react-icons/ti";

import { MdBorderClear, MdVoiceOverOff } from "react-icons/md";
import {
  TbChairDirector,
  TbClipboardCopy,
  TbDeviceTabletX,
} from "react-icons/tb";
import { BsGenderAmbiguous } from "react-icons/bs";
import { VscClearAll } from "react-icons/vsc";

import { rubExExample } from "../../constants/textParts";
import { defaultRubrics } from "../../utils/rubricsTemplates";

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
    const type1 = type.includes("createRub") ? "createRub" : type;
    switch (type1) {
      case "hide":
        setShowRubricator(!showRubricator);

        break;
      case "showHideBody":
        setShowBody(!showBody);
        break;
      case "delRubr":
        fieldFn.deleteRub();
        break;
      case "copyRubr":
        const rubr = editParam.item.rubricator
          .map((el, i) => el.rubric + "==" + el.example)
          .join("\n");
        copyToClipboard(rubr);
        break;
      case "clearJust":
        fieldFn.clearJ();
        break;
      case "clearScore":
        fieldFn.clearS();
        break;
      case "createRub":
        fieldFn.createRub(type);
        break;
      case "examplesQ":
        let rb = editParam.item.rubricator.map((el) => {
          return {
            ...el,
            example: el.rubric.includes(
              "Ответ использует правильную пунктуацию"
            )
              ? el.example
              : replaceQuotesUniversal(el.example, "guillemet"),
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
  const handleContextMenu = (e, val) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.button === 2 && val) {
      const rb = defaultRubrics[val];
      copyToClipboard(
        rb.rubric + rubExExample[1][editParam.item.version] + rb.example
      );
    }
  };
  const splitLineData = async (e) => {
    e.stopPropagation();
    const input = await navigator.clipboard.readText();
    fieldFn.createRubPromptScores(input);
  };
  const splitLineDataT = async (e) => {
    e.stopPropagation();
    const input = await navigator.clipboard.readText();

    fieldFn.createRubPromptScoresTask(input);
  };
  return (
    <div className="h-90">
      <div
        className="body-dim-line rub-title"
        onClick={titleClick}
        id="RubricaT">
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
                onContextMenu={(e) => handleContextMenu(e, "createRub")}
                title="add new criteria">
                <TiPlusOutline />
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubP")}
                onContextMenu={(e) => handleContextMenu(e, "createRubP")}
                title="add new criteria punctuation err">
                <TiPlusOutline /> «»
              </button>{" "}
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubU")}
                onContextMenu={(e) => handleContextMenu(e, "createRubU")}
                title="add new criteria punctuation err">
                <TiPlusOutline /> :A
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubN")}
                onContextMenu={(e) => handleContextMenu(e, "createRubN")}
                title="add new criteria fluency err">
                <TiPlusOutline /> <MdVoiceOverOff />
              </button>
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubF")}
                onContextMenu={(e) => handleContextMenu(e, "createRubF")}
                title="add new criteria foreign language">
                <TiPlusOutline />
                <TbChairDirector />
              </button>{" "}
              <button
                className="rubBtn"
                onClick={(e) => clickBtns(e, "createRubG")}
                onContextMenu={(e) => handleContextMenu(e, "createRubG")}
                title="add new criteria gender">
                <TiPlusOutline />
                <BsGenderAmbiguous />
              </button>
              <button
                title="add rubrics with scores from task xlss"
                className="rubBtn sumcolor"
                onClick={(e) => splitLineData(e)}>
                RR
              </button>{" "}
              <button
                title="add rubrics with scores from task"
                className="rubBtn sumcolor"
                onClick={(e) => splitLineDataT(e)}>
                RT
              </button>
              <button
                className="rubBtn sumcolor"
                onClick={(e) => clickBtns(e, "examplesQ")}
                title="change quotation mark in examples">
                «»
              </button>{" "}
              <button
                className="rubBtn sumcolor"
                onClick={(e) => clickBtns(e, "copyRubr")}
                title="copy Rubric to the clipboard">
                <TbClipboardCopy />
              </button>
              <button
                className="rubBtn sumcolor"
                onClick={(e) => clickBtns(e, "clearScore")}
                title="clear all scores">
                <MdBorderClear />
              </button>
              <button
                className="rubBtn sumcolor"
                onClick={(e) => clickBtns(e, "clearJust")}
                title="clear all scores and justifications">
                <TbDeviceTabletX />
              </button>
              <button
                className="rubBtn sumcolor"
                onClick={(e) => clickBtns(e, "delRubr")}
                title="delete all rubrics">
                <VscClearAll />
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
