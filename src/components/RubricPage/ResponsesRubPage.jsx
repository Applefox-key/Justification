import React from "react";

import EditFieldRub from "../Rubrics/EditFieldRub";

const ResponsesRubPage = ({ editParam }) => {
  const fieldFn = editParam.fieldFn;

  return (
    <>
      <div className="hv100 autoscroll-y">
        <>
          <div className={"rubTabBody pt-0"}>
            {Array.from({ length: editParam.item.countR }, (_, i) => i + 1).map(
              (el, i) => (
                <div
                  className={
                    editParam.countR === 2 ? "rub-sum-box rub2" : "rub-sum-box"
                  }
                  style={{ width: `${100 / editParam.item.countR}%` }}
                  key={el}>
                  <EditFieldRub
                    fieldName={"response" + el}
                    placeholder={"response" + el}
                    isActive={editParam.fieldId === "response" + el}
                    fieldVal={editParam.item["response" + el]}
                    fieldFn={fieldFn}
                  />
                </div>
              )
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default ResponsesRubPage;
