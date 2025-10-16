import React from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
import PageRespTxt from "./PageRespTxt";
import DmgShortSBS from "./DmgShortSBS";
import { defaultDimSets } from "../../constants/dimDefault";
import DmgTwoResponses from "./DmgTwoResponses";

const DimTaskAll = ({ editParam }) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt } = editParam;
  const dimArr = defaultDimSets[editParam.item.setName];
  return (
    <>
      <div className="task-rewiew-wrap">
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
        <div className="task-review-block">
          <PageRespTxt editParam={editParam} />
        </div>{" "}
        <div class="menu-accent ">Responses SCORES</div>
        <DmgTwoResponses
          hideResp
          editParam={
            editParam
            //   field: activeTab,
            //   setAct,
            //   activeTab: "SBS",
          }
          dimArr={dimArr}
        />
        <div class="menu-accent ">RATES</div>
        <div className="two-resp-wrap">
          {/* <DmgShortSBS editParam={editParam} dimArr={dimArr} showBody={true} /> */}
          <div className="task-review-block rrr">
            {["RateA", "RateB"].map((response, i) => (
              <EditFieldDmg
                scale=""
                key={response}
                fieldName={response}
                placeholder={response}
                setIsTxt={setIsTxt}
                classN={`dimField ${
                  fieldId === response ? " active-field" : ""
                }`}
                classF="flex-column"
                isTxt={isTxt && fieldId === response}
                isActive={fieldId === response}
                fieldVal={item[response]}
                fieldFn={fieldFn}
              />
            ))}
          </div>
        </div>
        <div class="menu-accent ">JUSTIFICATIONS</div>
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
      </div>
    </>
  );
};

export default DimTaskAll;
