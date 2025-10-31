import React, { useEffect } from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
import PageRespTxt from "./PageRespTxt";
import { defaultDimSets } from "../../constants/dimDefault";
import DmgTwoResponses from "./DmgTwoResponses";
import TaskPart from "./TaskPart";
import { scrollToId } from "../../utils/DOMfn";

const DimTaskAll = ({ editParam }) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt } = editParam;

  const arrParts = [
    {
      title: "Prompt",
      children: (
        <div className="task-review-block">
          <EditFieldDmg
            scale=""
            key={"Prompt"}
            fieldName={"Prompt"}
            placeholder={"Prompt"}
            setIsTxt={setIsTxt}
            classN={fieldId === "Prompt" ? "active-field" : ""}
            classF="flex-column"
            isTxt={isTxt && fieldId === "Prompt"}
            isActive={fieldId === "Prompt"}
            fieldVal={item["Prompt"]}
            fieldFn={fieldFn}
          />
        </div>
      ),
    },
    {
      title: "Responses text",
      children: (
        <div className="task-review-block">
          <PageRespTxt editParam={editParam} noTitle />
        </div>
      ),
    },
    {
      title: "Review",
      children: (
        <div className="task-review-block">
          <EditFieldDmg
            scale=""
            key={"review"}
            autoFocus
            fieldName={"review"}
            placeholder={"review"}
            setIsTxt={setIsTxt}
            classN={fieldId === "review" ? "active-field" : ""}
            classF="flex-column"
            isTxt={isTxt && fieldId === "review"}
            isActive={fieldId === "review"}
            fieldVal={item["review"]}
            fieldFn={fieldFn}
          />
        </div>
      ),
    },
    {
      title: "Responses SCORES",
      children: <DmgTwoResponses hideResp editParam={editParam} />,
    },
    {
      title: "RATES",
      children: (
        <div className="two-resp-wrap">
          <div className="task-review-block rrr">
            {["RateA", "", "RateB"].map((response, i) =>
              response ? (
                <EditFieldDmg
                  scale=""
                  key={response}
                  fieldName={response}
                  placeholder={response}
                  setIsTxt={setIsTxt}
                  classN={`dimField ${fieldId === response ? " active-field" : ""}`}
                  classF="flex-column"
                  isTxt={isTxt && fieldId === response}
                  isActive={fieldId === response}
                  fieldVal={item[response]}
                  fieldFn={fieldFn}
                />
              ) : (
                "🔰"
              )
            )}
          </div>
        </div>
      ),
    },
    {
      title: "JUSTIFICATIONS",
      children: (
        <div className="task-review-block">
          <EditFieldDmg
            scale=""
            key={"Justif"}
            fieldName={"Justif"}
            placeholder={"Justification"}
            setIsTxt={setIsTxt}
            classN={fieldId === "Justif" ? "active-field" : ""}
            classF="flex-column"
            isTxt={isTxt && fieldId === "Justif"}
            isActive={fieldId === "Justif"}
            fieldVal={item["Justif"]}
            fieldFn={fieldFn}
          />
        </div>
      ),
    },
  ];
  // useEffect(() => {
  //   scrollToId(null, "review");
  // }, []);
  return (
    <>
      <div className="task-rewiew-wrap">
        {arrParts.map((part, i) => (
          <TaskPart title={part.title}>{part.children}</TaskPart>
        ))}
      </div>
    </>
  );
};

export default DimTaskAll;
