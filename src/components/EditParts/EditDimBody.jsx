import React from "react";
import EditFieldDim from "./EditFieldDim";
import { arrAB } from "../../constants/textParts";

const EditDimBody = ({ editParam }) => {
  const { setIsTxt, fieldId, isTxt, item, fieldFn } = editParam;

  return (
    <>
      <div className="respDim">
        {arrAB.map((field, i) => (
          <EditFieldDim
            key={i}
            fieldName={field.a}
            placeholder={field.a}
            setIsTxt={setIsTxt}
            scale="right"
            classN={fieldId === field.a ? "dimFieldS active-field" : "dimField"}
            isTxt={isTxt && fieldId === field.a}
            isActive={fieldId === field.a}
            fieldVal={item[field.a]}
            estim={item.Evals[field.a]}
            fieldFn={fieldFn}
          />
        ))}
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
      </div>

      <div className="respDim">
        {arrAB.map((field, i) => (
          <EditFieldDim
            scale="left"
            key={i}
            fieldName={field.b}
            placeholder={field.b}
            setIsTxt={setIsTxt}
            classN={fieldId === field.b ? "dimField active-field" : "dimField"}
            isTxt={isTxt && fieldId === field.b}
            isActive={fieldId === field.b}
            fieldVal={item[field.b]}
            estim={item.Evals[field.b]}
            fieldFn={fieldFn}
          />
        ))}
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
        />
      </div>
    </>
  );
};

export default EditDimBody;