import React, { Fragment, useRef } from "react";
import { sAlert } from "../../utils/alert";

const InfoRubBtn = ({ editParam, fieldFn, el, edit, editEl }) => {
  const scaleSm = { "-1": "NA", 0: "No", 1: "Mn", 2: "Mj" };

  const fixRub = async () => {
    const conf = await sAlert({
      title: `Update rubrics?`,
      text: "all changes from the justification with crit will be added to justifications by rubrics",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });
    if (!conf.isConfirmed) return;

    const text = editParam.item["justif" + el];
    const regex = /Crit[#.]?/.test(text)
      ? /Crit[#.] (\d+) \([^)]+\):\s*([\s\S]*?)(?=Crit[#.] \d+ \(|$)/g
      : /(?:Crit[#.]?|C)(\d{1,2})[.:]?\s*(?:\([^)]+\))?\s*:\s*([\s\S]*?)(?=(?:\n(?:Crit[#.]?|C)\d{1,2}[.:]?\s*(?:\([^)]+\))?\s*:)|$)/g;

    const result = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const index = parseInt(match[1], 10) - 1; // Crit# 5 → индекс 4
      result[index] = match[2].trim(); // вставить по индексу
    }
    const updatedData = editParam.item.rubricator.map((item, index) => {
      return {
        ...item,
        ["error" + el]: result[index] || "",
      };
    });
    fieldFn.updateRub(updatedData);
  };

  const switchScore = (e, value, index) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    const newV =
      value + 1 > 2
        ? -1
        : editParam.item.version === 1 && value === 0
        ? 2
        : value + 1;
    fieldFn.setNewVal(newV, "score" + el + "-" + index);
  };
  const openEdit = (e, value, index) => {
    e.stopPropagation();
    // if (e.button === 2) return;
    if (value > 0) {
      fieldFn.setDefRef();
      const fname = "error" + el + "-" + index + "-C" + (index + 1);
      const tel = document.getElementById(fname);
      if (tel) {
        tel.focus();
        return;
      }
      edit(index, el);
      return;
    }
  };
  const clickTimeout = useRef(null);

  const handleClick = (e, cr, index) => {
    e.stopPropagation();
    if (clickTimeout.current) {
      //double
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      openEdit(e, cr, index);
    } else {
      // first click
      clickTimeout.current = setTimeout(() => {
        switchScore(e, cr, index);
        clickTimeout.current = null;
      }, 250); //  mc for double-click
    }
  };
  return (
    <div className="info-rub-box">
      <button
        title="add all changes from the justification with crit to the "
        onClick={fixRub}>
        fix
      </button>
      {editParam.item.rubricator.map((criteria, index) => (
        <Fragment key={index}>
          <div
            className={el === 1 ? "rub-color-box right-after" : "rub-color-box"}
            onClick={(e) => e.stopPropagation()}
            datacont={criteria["error" + el]}
            datarub={index + 1 + ") " + criteria.rubric}
            datacomm={criteria.comment}>
            <button
              onContextMenu={(e) => {
                e.preventDefault();
                openEdit(e, criteria["score" + el], index);
              }}
              onClick={(e) => handleClick(e, criteria["score" + el], index)}
              className={
                "rubBtnScore rubB" +
                criteria["score" + el] +
                (criteria["score" + el] < 1
                  ? " hideBtn"
                  : criteria["score" + el] > 0 && !criteria["error" + el]
                  ? " nojust"
                  : "") +
                (editEl &&
                editEl.fieldName === "error" + el &&
                editEl.crit === index
                  ? " isAc"
                  : "")
              }>
              {scaleSm[criteria["score" + el]]}
            </button>
            <span className="numi">{index + 1}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default InfoRubBtn;
