import React from "react";
import { getRubricName } from "../../utils/analysis";
import RubRespBtn from "../Rubrics/RubRespBtn";

const OnlyRubScores = ({ editParam }) => {
  const { fieldFn, item } = editParam;
  const renderScores = (criteria, index) => (
    <div className="rub-color-box">
      {Array.from({ length: item.countR }, (_, i) => i + 1).map((el) => (
        <div
          key={el}
          className={item.countR === 2 ? "rub-score-box rub2" : "rub-score-box"}
          style={{ width: `${100 / item.countR}%` }}>
          <RubRespBtn
            hide
            isMinor={item.version === 0}
            value={criteria["score" + el]}
            setValue={fieldFn.setNewVal}
            field={`score${el}-${index}`}
          />
        </div>
      ))}
    </div>
  );
  return (
    <>
      <div className="respRub">
        {editParam.item.rubricator.map((criteria, index) => (
          <div className="wrap-rub one-rub" key={index}>
            <div className="rub-text-closed">
              {index + 1} - {getRubricName(criteria, editParam.item.version)}
            </div>
            <div>
              <div className=" rub-score-box-small">
                {renderScores(criteria, index)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OnlyRubScores;
