import React from "react";

import { sumJustificationRub } from "../../utils/analysis";

import EditFieldRub from "../Rubrics/EditFieldRub";
import { autoJustifRub, autoJustifRub1 } from "../../utils/rubUtils";

const RubJustifSBS = ({ item, fieldFn, fieldId }) => {
  const handleClickRefrSum = (e) => {
    e.stopPropagation();
    const newV = sumJustificationRub(item);
    fieldFn.setNewVal(newV, "justifSBS");
  };
  const handleClickAuto = (e) => {
    e.stopPropagation();
    const newV = autoJustifRub(item.rubricator);
    fieldFn.setNewVal(newV, "justifSBS");
  };
  const handleClickAuto1 = (e) => {
    e.stopPropagation();
    const newV = autoJustifRub1(item.rubricator);
    fieldFn.setNewVal(newV, "justifSBS");
  };
  return (
    <>
      <div className="body-dim-line rub-title sumTitle">
        <button onClick={handleClickAuto}>Auto Justification</button>
        <button onClick={handleClickAuto1}>smart Auto Justification</button>
        <button onClick={handleClickRefrSum}>REFRESH Justification</button>
      </div>
      <div className="hv100 autoscroll-y field-box85">
        <>
          <EditFieldRub
            // show={show}

            fieldName={"justifSBS"}
            placeholder={"justifSBS"}
            isActive={fieldId === "justifSBS"}
            fieldVal={item["justifSBS"]}
            fieldFn={fieldFn}
          />
        </>
      </div>
    </>
  );
};

export default RubJustifSBS;
