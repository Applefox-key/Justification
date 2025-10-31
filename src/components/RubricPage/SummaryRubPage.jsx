import React, { useState } from "react";

import { rubEx } from "../../utils/readXls";

import { getRubricName, labelsFullVerdictRub } from "../../utils/analysis";
import { SlRefresh } from "react-icons/sl";

import { copyToClipboard } from "../../utils/utilStr";
import InfoRubBtn from "../Rubrics/InfoRubBtn";
import RubLinks from "../Rubrics/RubLinks";
import EditFieldRub from "../Rubrics/EditFieldRub";
import EditDragable from "../Rubrics/EditDragable";
import { scrollToId } from "../../utils/DOMfn";

const SummaryRubPage = ({ editParam, nameShowOnly = null }) => {
  const [editEl, setEditEl] = useState(0);
  const fieldFn = editParam.fieldFn;
  const [isLinks, setisLinks] = useState(nameShowOnly === "Links");
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
      const vl = labelsFullVerdictRub[i - 1] + " " + editParam.item["justifSBS"];
      copyToClipboard(vl);
    }
    if (e.button === 3) {
    }
  };

  return (
    <>
      {!!editEl && (
        <EditDragable
          title={"Crit " + (editEl.crit + 1) + ": Response-" + editEl.fieldName}
          closeModal={closeModal}
          crit={getRubricName(editParam.item.rubricator[editEl.crit], editParam.item.version)}
          comment={editParam.item.rubricator[editEl.crit].comment}
          critEr={editParam.item.rubricator[editEl.crit][editEl.fieldName]}
          fieldId={editEl.fieldName + "-" + editEl.crit}
          fieldFn={fieldFn}
          children={
            <EditFieldRub
              fieldName={editEl.fieldName + "-" + editEl.crit}
              placeholder={editEl.fieldName}
              isActive={editEl.fieldId === editEl.fieldName}
              fieldVal={editParam.item.rubricator[editEl.crit][editEl.fieldName]}
              fieldFn={fieldFn}
            />
          }
        />
      )}
      <div className="body-dim-line rub-title sumTitle">
        {(!nameShowOnly || nameShowOnly === "Justification") && (
          <button onClick={handleClickRefrSum}>REFRESH SUMMARY</button>
        )}
        {(!nameShowOnly || nameShowOnly === "Overall") && <button onClick={handleClickRefrOvr}>REFRESH OVERALL</button>}
        {!nameShowOnly && (
          <>
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
            ))}
            {["jbS1", "ovrS1", "link1", "justifSBS"].map((el, i) => (
              <button key={i} className="hintBtn" onClick={(e) => scrollToId(e, el)}>
                {el.charAt(0).toUpperCase()}
              </button>
            ))}
          </>
        )}
        {(!nameShowOnly || nameShowOnly === "Links") && <button onClick={handleClickLinks}>LINKS</button>}
      </div>
      <div className="hv100 autoscroll-y">
        <>
          <div className={"rubTabBody pt-0"}>
            {/* {(editParam.countR === 2 ? [1, 2] : [1, 2, 3, 4]).map((el, i) => ( */}
            {Array.from({ length: editParam.item.countR }, (_, i) => i + 1).map((el, i) => (
              <div
                className={editParam.countR === 2 ? "rub-sum-box rub2" : "rub-sum-box"}
                style={{ width: `${100 / editParam.item.countR}%` }}
                key={el}>
                <InfoRubBtn editParam={editParam} fieldFn={fieldFn} el={el} edit={openModalForEdit} editEl={editEl} />

                {(!nameShowOnly || nameShowOnly === "Justification") && (
                  <div className="rub-span rub-spanShow">
                    <button id={"jbS" + el} className="refBtn" onClick={() => editParam.fieldFn.summ(el)}>
                      №{el}
                      {editParam.item["eval" + el] && (
                        <span>
                          <span className="rub-eval">
                            {editParam.item["eval" + el]}

                            <span className="rub-stat">
                              {ev[editParam.item["eval" + el]].name}
                              <br />
                              {ev[editParam.item["eval" + el]].mn}
                              <br />
                              {ev[editParam.item["eval" + el]].mj}
                              <br />
                              <br />( {editParam.item["stat" + el]})
                            </span>
                          </span>
                          <span className="rub-stat">{editParam.item["stat" + el]}</span>
                        </span>
                      )}
                      <SlRefresh />
                    </button>
                  </div>
                )}
                <>
                  {(!nameShowOnly || nameShowOnly === "Justification") && (
                    <EditFieldRub
                      fieldName={"justif" + el}
                      placeholder={"justif" + el}
                      isActive={editParam.fieldId === "justif" + el}
                      fieldVal={editParam.item["justif" + el]}
                      fieldFn={fieldFn}
                    />
                  )}
                  {(!nameShowOnly || nameShowOnly === "Overall") && (
                    <>
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
                    </>
                  )}
                  {(!nameShowOnly || nameShowOnly === "Links") && (
                    <>
                      <EditFieldRub
                        fieldName={"link" + el}
                        placeholder={"link" + el}
                        isActive={editParam.fieldId === "link" + el}
                        fieldVal={editParam.item["link" + el]}
                        fieldFn={fieldFn}
                      />
                    </>
                  )}
                </>
              </div>
            ))}{" "}
            {isLinks && (!nameShowOnly || nameShowOnly === "Links") && (
              <RubLinks links={editParam.item.links} fieldFn={fieldFn} editParam={editParam} />
            )}
          </div>
          <br />
          {!nameShowOnly && (
            <EditFieldRub
              // show={show}
              fieldName={"justifSBS"}
              placeholder={"justifSBS"}
              isActive={editParam.fieldId === "justifSBS"}
              fieldVal={editParam.item["justifSBS"]}
              fieldFn={fieldFn}
            />
          )}
        </>
      </div>
    </>
  );
};

export default SummaryRubPage;
