import React from "react";
import EditFieldDim from "./EditFieldDim";
import { BiSolidRightArrow } from "react-icons/bi";
import EditDimBodyAnalitic from "./EditDimBodyAnalitic";
import EditTaskAnalitic from "./EditTaskAnalitic";

const EditAreaTask = ({ editParam }) => {
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
        "respDim-footer " + (!showReview ? " closeBarTask" : " barTask")
      }>
      <>
        <div className="field-boxes">
          <EditFieldDim
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
          {/* <div className="ps-2 pe-2">TASK</div> */}
          <button
            id="show-body-dim-task"
            onClick={() => setShowReview(!showReview)}>
            TASK REVIEW
            <BiSolidRightArrow className={showReview ? "arr-down" : ""} />
          </button>
          <EditFieldDim
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
          {/* <button
            id="show-body-dim-task"
            onClick={() => setShowReview(!showReview)}>
            TASK REVIEW
            <BiSolidRightArrow className={showReview ? "arr-down" : ""} />
          </button> */}
        </div>
        <div className="task-rev-body">
          {showReview && (
            <>
              <EditTaskAnalitic
                editParam={{
                  item,
                  fieldFn,
                }}
              />
              <EditFieldDim
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

export default EditAreaTask;
