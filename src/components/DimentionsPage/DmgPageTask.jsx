import React from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

const DmgPageTask = ({ editParam }) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt } = editParam;
  return (
    // <div       className="respDim-footer dmgrew closeBarTask">
    <div className="field-boxes">
      <EditFieldDmg
        fieldName={"id"}
        small
        placeholder={"...id"}
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
        placeholder={"...name"}
        setIsTxt={setIsTxt}
        classN={fieldId === "name" ? "active-field" : ""}
        isTxt={isTxt && fieldId === "name"}
        isActive={fieldId === "name"}
        fieldVal={item.name}
        fieldFn={fieldFn}
      />
    </div>

    // </div>
  );
};

export default DmgPageTask;
