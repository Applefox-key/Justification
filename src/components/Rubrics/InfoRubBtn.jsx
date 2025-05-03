import React from "react";

const InfoRubBtn = ({ editParam, fieldFn, el }) => {
  const scaleSm = { "-1": "NA", 0: "No", 1: "Mn", 2: "Mj" };
  const fixRub = () => {
    const regex = /Crit# (\d+) \([^)]+\):\s*([\s\S]*?)(?=Crit# \d+ \(|$)/g;
    const text = editParam.item["justif" + el];
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
  return (
    <div className="info-rub-box">
      {" "}
      <button onClick={fixRub}>fix</button>
      {editParam.item.rubricator.map((criteria, index) => (
        <>
          <div
            className="rub-color-box"
            onClick={(e) => e.stopPropagation()}
            datarub={index + 1 + ") " + criteria.rubric}>
            {/* {(editParam.countR === 2 ? [1, 2] : [1, 2, 3, 4]).map((el, i) => ( */}
            <button
              disable
              className={
                "rubBtnScore rubB" +
                criteria["score" + el] +
                (criteria["score" + el] < 1 ? " hideBtn" : "")
              }>
              {scaleSm[criteria["score" + el]]}
            </button>
            <span className="numi">{index + 1}</span>
            {/* ))} */}
          </div>
        </>
      ))}
    </div>
  );
};

export default InfoRubBtn;
