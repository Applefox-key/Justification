import React from "react";
import EditFieldDim from "./EditFieldDim";
import { arrAB } from "../../constants/textParts";

const EditDimJustif = ({ editParam }) => {
  const { setIsTxt, best, item, fieldFn, fieldId, isTxt, show, setShow } =
    editParam;
  return (
    <div className={"respDim-footer " + (!show ? " closeBar" : "")}>
      {!show ? (
        <>
          <div className="d-flex flex-wrap">
            {arrAB.map((field, i) => (
              <span
                className={"evals-span-inline-" + (item.Evals[field.a] === 0)}
                key={i}>
                {field.short + "_" + item.Evals[field.a]}
              </span>
            ))}
          </div>
          <button onClick={() => setShow(true)}>
            show rate and final justification
          </button>{" "}
          <div className="d-flex flex-wrap">
            {arrAB.map((field, i) => (
              <span
                className={"evals-span-inline-" + (item.Evals[field.b] === 0)}
                key={i}>
                {field.short + "_" + item.Evals[field.b]}
              </span>
            ))}
          </div>
        </>
      ) : (
        <>
          <EditFieldDim
            scale=""
            key={"Rate"}
            fieldName={"Rate"}
            placeholder={"Rate"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "Rate" ? "dimField active-field" : "dimField") +
              (best.fields.includes("Rate") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "Rate"}
            isActive={fieldId === "Rate"}
            fieldVal={item["Rate"]}
            fieldFn={fieldFn}
          />
          <div>
            <button id="btn-hide-rate-dim" onClick={() => setShow(false)}>
              hide
            </button>
            <div className="evals-dim">
              <div>
                {arrAB.map((field, i) => (
                  <span
                    title={
                      item.Evals[field.a] > item.Evals[field.b]
                        ? item.Evals[field.a] - item.Evals[field.b]
                        : ""
                    }
                    className={
                      item.Evals[field.a] > item.Evals[field.b]
                        ? "evals-spanl evals-span-b"
                        : "evals-spanl evals-span-isempty-" +
                          (item.Evals[field.a] === 0)
                    }
                    key={i}>
                    {item.Evals[field.a]}
                  </span>
                ))}
              </div>
              <div>
                {arrAB.map((field, i) => (
                  <span className="evals-span" key={i}>
                    {field.name[0]}
                  </span>
                ))}
              </div>
              <div>
                {arrAB.map((field, i) => (
                  <span
                    title={
                      item.Evals[field.b] > item.Evals[field.a]
                        ? item.Evals[field.b] - item.Evals[field.a]
                        : ""
                    }
                    className={
                      item.Evals[field.b] > item.Evals[field.a]
                        ? "evals-spanr evals-span-b"
                        : "evals-spanr evals-span-isempty-" +
                          (item.Evals[field.b] === 0)
                    }
                    key={i}>
                    {item.Evals[field.b]}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <EditFieldDim
            scale=""
            key={"Justif"}
            fieldName={"Justif"}
            placeholder={"Justif"}
            setIsTxt={setIsTxt}
            classN={
              (fieldId === "Justif" ? "dimField active-field" : "dimField") +
              (best.fields.includes("Justif") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "Justif"}
            isActive={fieldId === "Justif"}
            fieldVal={item["Justif"]}
            fieldFn={fieldFn}
          />
        </>
      )}
    </div>
  );
};

export default EditDimJustif;
