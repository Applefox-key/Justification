import React, { Fragment } from "react";

const InfoRubBtn = ({ editParam, fieldFn, el, edit, editEl }) => {
  const scaleSm = { "-1": "NA", 0: "No", 1: "Mn", 2: "Mj" };

  const fixRub = () => {
    // const regex =
    // /Crit[#.] (\d+) \([^)]+\):\s*([\s\S]*?)(?=Crit[#.] \d+ \(|$)/g;
    // const regex =
    //   /(?:Crit[#.]?|C)(\d{1,2})[.:]?\s*(?:\([^)]+\))?\s*:\s*([\s\S]*?)(?=(?:\n(?:Crit[#.]?|C)\d{1,2}[.:]?\s*(?:\([^)]+\))?\s*:)|$)/g;
    const text = editParam.item["justif" + el];
    const regex = /Crit[#.]?/.test(text)
      ? /Crit[#.] (\d+) \([^)]+\):\s*([\s\S]*?)(?=Crit[#.] \d+ \(|$)/g
      : /(?:Crit[#.]?|C)(\d{1,2})[.:]?\s*(?:\([^)]+\))?\s*:\s*([\s\S]*?)(?=(?:\n(?:Crit[#.]?|C)\d{1,2}[.:]?\s*(?:\([^)]+\))?\s*:)|$)/g;
    // const regex =(/Crit[#.]?/.test(text))?/Crit[#.] (\d+) \([^)]+\):\s*([\s\S]*?)(?=Crit[#.] \d+ \(|$)/g;: /C(\d{1,2})[.:]\s*([\s\S]*?)(?=(?:\n+)?C\d{1,2}[.:]|\s*$)/g;
    //   /(?:Crit#\s*(\d{1,2})|C(\d{1,2})[.:])\s*[^:\n]*:\s*([\s\S]*?)(?=(?:Crit#\s*\d{1,2}|C\d{1,2}[.:])\s*[^:\n]*:|$)/g;

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
  // const fixRub = () => {
  //   const text = editParam.item["justif" + el];

  //   const hasCrit = /Crit#/.test(text);

  //   const regex = hasCrit
  //     ? // Пример: Crit# 5 (что-то): текст до следующего Crit# или конца
  //       /Crit#\s*(\d+)\s*\([^)]+\):\s*([\s\S]*?)(?=\nCrit#\s*\d+\s*\(|$)/g
  //     : // Пример: любая строка, начинающаяся с числа + знак препинания + текст
  //       /^\s*(?:.*?)(\d{1,2})\s*[:\-–]\s*([\s\S]*?)(?=\n\s*.*?\d{1,2}\s*[:\-–]|$)/gm;

  //   const result = [];
  //   let match;

  //   while ((match = regex.exec(text)) !== null) {
  //     const index = parseInt(match[1], 10) - 1;
  //     result[index] = match[2].trim();
  //   }

  //   const updatedData = editParam.item.rubricator.map((item, index) => {
  //     return {
  //       ...item,
  //       ["error" + el]: result[index] || "",
  //     };
  //   });

  //   fieldFn.updateRub(updatedData);
  // };
  const onClick = (e, value, index) => {
    e.stopPropagation();

    if (e.button === 2) return;
    const newV = value + 1 > 2 ? -1 : value + 1;
    fieldFn.setNewVal(newV, "score" + el + "-" + index);
  };
  const handleContextMenu = (e, i, val) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.button === 2 && val > 0) {
      fieldFn.setDefRef();
      const fname = "error" + el + "-" + i + "-C" + (i + 1);
      const tel = document.getElementById(fname);
      if (tel) {
        tel.focus();
        return;
      }
      edit(i, el);
      return;
    }
  };
  console.log(editParam.item.rubricator);

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
            datarub={index + 1 + ") " + criteria.rubric}>
            <button
              onContextMenu={(e) =>
                handleContextMenu(e, index, criteria["score" + el])
              }
              onClick={(e) => {
                onClick(e, criteria["score" + el], index);
              }}
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
