import React from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

const PageRespTxt = ({ editParam }, noTitle) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt } = editParam;

  return (
    <div>
      {" "}
      {/* <MyPortal containerId="portal-on-tabs">
        <DimAddDetail id="showPrompt" title="Show Prompt" val={showPrompt} setVal={setShowPrompt} isBtn />{" "}
      </MyPortal> */}
      {!noTitle && <div className="menu-accent ">Responses text</div>}
      <div className={"respDim-footer "}>
        {["ResponseA", "", "ResponseB"].map((response, i) =>
          response ? (
            <EditFieldDmg
              scale=""
              key={response}
              fieldName={response}
              placeholder={response}
              setIsTxt={setIsTxt}
              classN={fieldId === response ? "dimField active-field" : "dimField"}
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
  );
};

export default PageRespTxt;
