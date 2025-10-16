import React from "react";
import { VscClearAll } from "react-icons/vsc";
import { TbClipboardCopy, TbDeviceTabletX } from "react-icons/tb";
import { MdBorderClear, MdOutlineFiberNew } from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import { copyToClipboard, replaceQuotesUniversal } from "../../utils/utilStr";

import DropDownBtnsList2 from "../UI/DropDownBtnsList2";
import { defaultRubrics } from "../../constants/rubricsTemplates";

const RubMenu = ({
  editParam,
  setShowBody,
  showBody,
  fieldFn,
  small = false,
}) => {
  /** ====== Actions ====== */
  const actions = {
    showHideBody: () => setShowBody(!showBody),
    delRubr: () => fieldFn.deleteRub(),
    copyRubr: () => {
      const rubr = editParam.item.rubricator
        .map((el) => `${el.rubric}==${el.example}`)
        .join("\n");
      copyToClipboard(rubr);
    },
    clearJust: () => fieldFn.clearJ(),
    clearScore: () => fieldFn.clearS(),
    createRub: (t) => fieldFn.createRub(t),
    examplesQ: () => {
      let rb = editParam.item.rubricator.map((el) => {
        const wording =
          editParam.item.version === 0
            ? "Ответ использует правильную пунктуацию"
            : "The response follows the rules of Russian pinctuation";
        return {
          ...el,
          example: el.rubric.includes(wording)
            ? el.example
            : replaceQuotesUniversal(el.example, "guillemet"),
        };
      });
      editParam.setItem({ ...editParam.item, rubricator: rb });
    },
  };

  const handleButtonClick = (e, type) => {
    e.stopPropagation();
    const key = type.includes("createRub") ? "createRub" : type;
    actions[key]?.(type);
  };

  const handleContextMenu = (e, val) => {
    e.preventDefault();
    e.stopPropagation();
    if (val) {
      // const rb = defaultRubrics[val];
      let rb = defaultRubrics[val][editParam.item.version];
      copyToClipboard(
        rb.rubric +
          (editParam.item.version === 0 ? ". Например: " : ". For example: ") +
          rb.example
      );
    }
  };

  const handleSplitLineFromClipboard = async (e) => {
    e.stopPropagation();
    const input = await navigator.clipboard.readText();
    fieldFn.createRubPromptScores(input);
  };

  const handleSplitTaskLineFromClipboard = async (e) => {
    e.stopPropagation();
    const input = await navigator.clipboard.readText();
    fieldFn.createRubPromptScoresTask(input);
  };

  /** ====== buttons====== */
  const addButtons = [
    ...Object.entries(defaultRubrics).map(([key, value]) => ({
      type: key,
      label: value.config.title,
      icon: value.config.icon,
      title: `
        ${value[editParam.item.version].rubric}...${
        value[editParam.item.version].example
      }
        wight: ${value.config.weight || "-"}
        example: ${value.config.example || "-"}
        `,
    })),
  ];

  const toolsButtons = [
    { type: "examplesQ", title: "change quotation marks", icon: "«»" },
    {
      type: "copyRubr",
      title: "copy rubric to clipboard",
      icon: <TbClipboardCopy />,
    },
    { type: "clearScore", title: "clear all scores", icon: <MdBorderClear /> },
    {
      type: "clearJust",
      title: "clear scores & justifications",
      icon: <TbDeviceTabletX />,
    },
    { type: "delRubr", title: "delete all rubrics", icon: <VscClearAll /> },
  ];

  return (
    <div className="rub-bode-menu">
      <div className="d-flex">
        <button
          title="show or hide criteria"
          id="show-body-dim"
          onClick={(e) => handleButtonClick(e, "showHideBody")}>
          <BiSolidRightArrow className={showBody ? "arr-down" : ""} />
        </button>
        {/*Block: adding criteria*/}
        <button
          key={"createRub"}
          className="rubBtn btn-rub-add"
          onClick={(e) => handleButtonClick(e, "createRub")}
          onContextMenu={(e) => handleContextMenu(e, "createRub")}
          title="add new criteria">
          <MdOutlineFiberNew />
          {!small && "add new criteria"}
        </button>
        <DropDownBtnsList2 title="" className="rubBtn btn-rub-add">
          <>
            {addButtons.map(({ type, title, icon, label }) => (
              <button
                key={type}
                // className=" btn-rub-add"
                onClick={(e) => handleButtonClick(e, type)}
                onContextMenu={(e) => handleContextMenu(e, type)}
                title={title}>
                {icon} -{label}
              </button>
            ))}
          </>
        </DropDownBtnsList2>
      </div>

      {/* Block: import */}
      {!small && (
        <div>
          <button
            title="add rubrics with scores from task xls"
            className="rubBtn sumcolor"
            onClick={handleSplitLineFromClipboard}>
            RR
          </button>
          <button
            title="add rubrics with scores from task"
            className="rubBtn sumcolor"
            onClick={handleSplitTaskLineFromClipboard}>
            RT
          </button>

          {/* Block: tools */}

          {toolsButtons.map(({ type, title, icon }) => (
            <button
              key={type}
              className="rubBtn sumcolor"
              onClick={(e) => handleButtonClick(e, type)}
              title={title}>
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RubMenu;
