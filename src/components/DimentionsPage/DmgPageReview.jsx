import React from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

const DmgPageReview = ({ editParam }) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt } = editParam;
  return (
    <div className={"respDim-footer dmgrew barTask"}>
      <>
        <div className="task-rev-body">
          <>
            <EditFieldDmg
              scale=""
              key={"review"}
              fieldName={"review"}
              placeholder={"review"}
              setIsTxt={setIsTxt}
              className="dimField"
              // classN={
              //   (fieldId === "review" ? "dimField active-field" : "dimField") +
              //   (best.fields.includes("review") ? " best-field" : "")
              // }
              isTxt={isTxt && fieldId === "review"}
              isActive={fieldId === "review"}
              fieldVal={item["review"]}
              fieldFn={fieldFn}
            />
          </>
        </div>
      </>
    </div>
  );
};

export default DmgPageReview;
