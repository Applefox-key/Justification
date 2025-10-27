import React from "react";

import EditFieldDmg from "../Dimentions/EditFieldDmg";

import RateBoxes from "../Rate/RateBoxes";
import { getActionButtons } from "../../utils/dimentions";

const PageJustif = ({ editParam }) => {
  const { setIsTxt, item, setItem, fieldFn, fieldId, isTxt, likert, action } = editParam;
  const actionButtons = getActionButtons({ item, setItem, likert, action });

  return (
    <div>
      <div className="menu-accent">
        <RateBoxes likert={likert} choosed={item.likert} nospan />

        <div>
          {actionButtons.map(({ label, onClick }) => (
            <button key={label} onClick={onClick}>
              {label}
            </button>
          ))}
          {/* <div className="rec">Hint: {likert.best.rec}</div> */}
        </div>
      </div>{" "}
      <div className="menu-accent ">Justification</div>
      <div className={"respDim-footer "}>
        <EditFieldDmg
          scale=""
          key={"Justif"}
          fieldName={"Justif"}
          placeholder={"Justif"}
          setIsTxt={setIsTxt}
          classN={
            (fieldId === "Justif" ? "dimField active-field" : "dimField") +
            (likert.best.fields.includes("Justif") ? " best-field" : "")
          }
          isTxt={isTxt && fieldId === "Justif"}
          isActive={fieldId === "Justif"}
          fieldVal={item["Justif"]}
          fieldFn={fieldFn}
        />
      </div>
    </div>
  );
};

export default PageJustif;
