import React, { useCallback } from "react";
import { defaultDimSets } from "../../constants/textParts";
import EditFieldDmg from "../Dimentions/EditFieldDmg";

import { compose, composeRateBoth, rateIcons } from "../../utils/rates";
import RateBoxes from "../Rate/RateBoxes";

const PageJustif = ({ editParam }) => {
  const { setIsTxt, item, setItem, fieldFn, fieldId, isTxt, likert } =
    editParam;

  return (
    <div>
      <div className="hot hot-sum  w-100">
        <div className="rec">Recommendation: {likert.best.rec}</div>
      </div>
      <div className="d-flex mb-2 justify-content-between">
        <RateBoxes likert={likert} choosed={item.likert} />
        <div>
          <button
            onClick={() =>
              composeRateBoth(item, setItem, "Justif", likert.best, true)
            }>
            Justification full
          </button>
          <button
            onClick={() =>
              composeRateBoth(item, setItem, "Justif", likert.best)
            }>
            Justification
          </button>
        </div>
      </div>
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
