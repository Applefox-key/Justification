import React from "react";

import { BiSolidRightArrow } from "react-icons/bi";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
import EditTaskAnaliticDmg from "../Dimentions/EditTaskAnaliticDmg";

const DmgPageReview = ({ editParam }) => {
  const {
    setIsTxt,
    best,
    item,
    fieldFn,
    fieldId,
    isTxt,
    showReview,
    setShowReview,
  } = editParam;
  return (
    <div
      className={
        "respDim-footer dmgrew" + (!showReview ? " closeBarTask" : " barTask")
      }>
      <>
        <div className="field-boxes">
          <button
            id="show-body-dim-task"
            onClick={() => setShowReview(!showReview)}>
            TASK REVIEW
            <BiSolidRightArrow className={showReview ? "arr-down" : ""} />
          </button>
          <EditFieldDmg
            fieldName={"id"}
            small
            placeholder={"id"}
            setIsTxt={setIsTxt}
            classN={fieldId === "id" ? "active-field" : ""}
            isTxt={isTxt && fieldId === "id"}
            isActive={fieldId === "id"}
            fieldVal={item.id}
            fieldFn={fieldFn}
          />
          <EditFieldDmg
            fieldName={"name"}
            small
            placeholder={"name"}
            setIsTxt={setIsTxt}
            classN={fieldId === "name" ? "active-field" : ""}
            isTxt={isTxt && fieldId === "name"}
            isActive={fieldId === "name"}
            fieldVal={item.name}
            fieldFn={fieldFn}
          />{" "}
        </div>
        <div className="task-rev-body">
          {showReview && (
            <>
              <EditTaskAnaliticDmg
                editParam={{
                  item,
                  fieldFn,
                }}
              />
              <EditFieldDmg
                scale=""
                key={"review"}
                fieldName={"review"}
                placeholder={"review"}
                setIsTxt={setIsTxt}
                classN={
                  (fieldId === "review"
                    ? "dimField active-field"
                    : "dimField") +
                  (best.fields.includes("review") ? " best-field" : "")
                }
                isTxt={isTxt && fieldId === "review"}
                isActive={fieldId === "review"}
                fieldVal={item["review"]}
                fieldFn={fieldFn}
              />
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default DmgPageReview;
