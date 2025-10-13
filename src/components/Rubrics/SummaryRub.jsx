import React, { useState } from "react";
import EditFieldRub from "./EditFieldRub";
import { rubEx } from "../../utils/readXls";
import { FaAngleDoubleRight } from "react-icons/fa";
import {
  detectHeightRub,
  getRubricName,
  labelsFullVerdictRub,
} from "../../utils/analysis";
import { SlRefresh } from "react-icons/sl";
import RubLinks from "./RubLinks";

import InfoRubBtn from "./InfoRubBtn";
import EditDragable from "./EditDragable";
import { copyToClipboard } from "../../utils/utilStr";

const SummaryRub = ({ editParam }) => {
  const [editEl, setEditEl] = useState(0);

  const fieldFn = editParam.fieldFn;
  const [isLinks, setisLinks] = useState(false);
  const ev = {
    5: { name: "[5] (Perfect)", mn: "No issues", mj: "No issues" },
    4: { name: "[4] (Good) ", mn: "Minor: 1-24% ", mj: " Major: No issues" },
    3: { name: "[3] (OK) ", mn: "Minor: 25-49%", mj: "Major: 1-24%" },
    2: { name: "[2] (Bad)", mn: " Minor: 50-74%", mj: "Major: 25-50%" },
    1: { name: "[1] (Horrible)", mn: "Minor: 75-100%", mj: "Major: 51-100%" },
  };
  const openModalForEdit = (crit, resp) => {
    setEditEl({ fieldName: "error" + resp, crit: crit });

    // editParam.item.rubricator[crit]["error" + resp]); // Устанавливаем имя поля, которое редактируем
  };

  const closeModal = () => {
    setEditEl(null); // Сбрасываем выбранное поле
  };

  const scrollToId = (e, id) => {
    e.stopPropagation();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.focus();
    }
  };
  const handleClickLinks = (e) => {
    e.stopPropagation();
    setisLinks(!isLinks);
  };
  const handleClickRefrSum = (e) => {
    e.stopPropagation();
    editParam.fieldFn.summ();
  };
  const handleClickRefrOvr = (e) => {
    e.stopPropagation();
    editParam.fieldFn.summ(null, true);
  };
  const handleClickXls = (e) => {
    e.stopPropagation();
    rubEx(editParam.item);
  };
  const handleClickSBS = (e, i) => {
    e.stopPropagation();
    const vl = labelsFullVerdictRub[i - 1] + " " + editParam.item["justifSBS"];
    editParam.fieldFn.setNewVal(vl, "justifSBS");
  };
  const handleContextMenu = (e, i) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.button === 2) {
      const vl =
        labelsFullVerdictRub[i - 1] + " " + editParam.item["justifSBS"];
      copyToClipboard(vl);
    }
    if (e.button === 3) {
    }
  };
  // console.log(editParam);

  return (
    <>
      {!!editEl && (
        <EditDragable
          title={"Crit " + (editEl.crit + 1) + ": Response-" + editEl.fieldName}
          closeModal={closeModal}
          crit={getRubricName(
            editParam.item.rubricator[editEl.crit],
            editParam.item.version
          )}
          critEr={editParam.item.rubricator[editEl.crit][editEl.fieldName]}
          fieldId={editEl.fieldName + "-" + editEl.crit}
          fieldFn={fieldFn}
          children={
            <EditFieldRub
              fieldName={editEl.fieldName + "-" + editEl.crit}
              placeholder={editEl.fieldName}
              isActive={editEl.fieldId === editEl.fieldName}
              fieldVal={
                editParam.item.rubricator[editEl.crit][editEl.fieldName]
              }
              fieldFn={fieldFn}
            />
          }
        />
      )}
      <div
        onClick={() => editParam.setShowSummary(!editParam.showSummary)}
        className={
          editParam.showSummary
            ? "body-dim-line rub-title sumTitle"
            : "body-dim-line rub-title justify-content-end"
        }>
        {editParam.showSummary && (
          <div className="">
            <button onClick={handleClickLinks}>LINKS</button>
            <button onClick={handleClickRefrSum}>REFRESH SUMMARY</button>
            <button onClick={handleClickRefrOvr}>REFRESH OVERALL</button>
            <button className="hintBtn" onClick={handleClickXls}>
              xls
            </button>
            {[1, 2, 3, 4, 5, 6, 7].map((el, i) => (
              <button
                key={i}
                onContextMenu={(e) => handleContextMenu(e, el)}
                className="hintBtn sumcolor"
                onClick={(e) => handleClickSBS(e, el)}>
                {el}
              </button>
            ))}{" "}
            {["jbS1", "ovrS1", "link1", "justifSBS"].map((el, i) => (
              <button
                key={i}
                className="hintBtn"
                onClick={(e) => scrollToId(e, el)}>
                {el.charAt(0).toUpperCase()}
              </button>
            ))}{" "}
          </div>
        )}{" "}
        <div>
          SUMMARY
          <FaAngleDoubleRight
            className={editParam.showSummary ? "arr-down " : ""}
          />
        </div>
      </div>
      <div
        className={detectHeightRub(
          editParam.showSummary,
          editParam.showRubricator && editParam.showSummary
        )}>
        {editParam.showSummary && (
          <>
            {" "}
            <div className={"dimBox pt-0"}>
              {isLinks && editParam.showSummary && (
                <RubLinks
                  links={editParam.item.links}
                  fieldFn={fieldFn}
                  editParam={editParam}
                />
              )}

              {Array.from({ length: editParam.countR }, (_, i) => i + 1).map(
                (el) => (
                  <div
                    className={
                      editParam.countR === 2
                        ? "rub-sum-box rub2"
                        : "rub-sum-box"
                    }
                    key={el}>
                    {editParam.showSummary && (
                      <InfoRubBtn
                        editParam={editParam}
                        fieldFn={fieldFn}
                        el={el}
                        edit={openModalForEdit}
                        editEl={editEl}
                      />
                    )}
                    <div
                      className={
                        editParam.showSummary
                          ? "rub-span rub-spanShow"
                          : "rub-span"
                      }>
                      <button
                        id={"jbS" + el}
                        className="refBtn"
                        onClick={() => editParam.fieldFn.summ(el)}>
                        №{el}
                        {editParam.item["eval" + el] && (
                          <span>
                            <span className="rub-eval">
                              {editParam.item["eval" + el]}
                              {editParam.showSummary && (
                                <span className="rub-stat">
                                  {ev[editParam.item["eval" + el]].name}
                                  <br />
                                  {ev[editParam.item["eval" + el]].mn}
                                  <br />
                                  {ev[editParam.item["eval" + el]].mj}
                                  <br />
                                  <br />( {editParam.item["stat" + el]})
                                </span>
                              )}
                            </span>
                            <span className="rub-stat">
                              {editParam.item["stat" + el]}
                            </span>
                          </span>
                        )}
                        <SlRefresh />
                      </button>
                    </div>
                    {editParam.showSummary && (
                      <>
                        <EditFieldRub
                          fieldName={"justif" + el}
                          placeholder={"justif" + el}
                          isActive={editParam.fieldId === "justif" + el}
                          fieldVal={editParam.item["justif" + el]}
                          fieldFn={fieldFn}
                        />{" "}
                        <button
                          id={"ovrS" + el}
                          className="refBtn sumcolor"
                          onClick={() => editParam.fieldFn.summ(el, true)}>
                          №{el} OVERALL <SlRefresh />
                        </button>
                        <EditFieldRub
                          fieldName={"overall" + el}
                          placeholder={"overall" + el}
                          isActive={editParam.fieldId === "overall" + el}
                          fieldVal={editParam.item["overall" + el]}
                          fieldFn={fieldFn}
                        />
                        <EditFieldRub
                          fieldName={"link" + el}
                          placeholder={"link" + el}
                          isActive={editParam.fieldId === "link" + el}
                          fieldVal={editParam.item["link" + el]}
                          fieldFn={fieldFn}
                        />
                      </>
                    )}
                  </div>
                )
              )}
            </div>
            <br />
            <EditFieldRub
              fieldName={"justifSBS"}
              placeholder={"justifSBS"}
              isActive={editParam.fieldId === "justifSBS"}
              fieldVal={editParam.item["justifSBS"]}
              fieldFn={fieldFn}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SummaryRub;
