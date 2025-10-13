import React from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

const DmgPrompt = ({ editParam }) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt } = editParam;

  return (
    <>
      <div className={"respDim-footer "}>
        <EditFieldDmg
          scale=""
          key={"Prompt"}
          fieldName={"Prompt"}
          placeholder={"Prompt"}
          setIsTxt={setIsTxt}
          classN={fieldId === "Prompt" ? "active-field" : ""}
          isTxt={isTxt && fieldId === "Prompt"}
          isActive={fieldId === "Prompt"}
          fieldVal={item["Prompt"]}
          fieldFn={fieldFn}
        />
      </div>

      {/* <div>
        <EditFieldDmg
          fieldName={"Prompt"}
          placeholder={"...Prompt"}
          setIsTxt={setIsTxt}
          classN={fieldId === "Prompt" ? "active-field" : ""}
          isTxt={isTxt && fieldId === "Prompt"}
          isActive={fieldId === "Prompt"}
          fieldVal={item.Prompt}
          fieldFn={fieldFn}
        />
      </div> */}
    </>
  );
};

export default DmgPrompt;
