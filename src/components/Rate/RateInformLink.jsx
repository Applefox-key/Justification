import React from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import { rateIcons } from "../../utils/rates";

const RateInformLink = ({ item, resp, callback, current }) => {
  const goToFn = (e, field) => {
    e.stopPropagation();

    callback(field[resp]);
  };
  return (
    <div className="rateinform-link-box">
      {defaultDimSets[item.setName].map((field, i) => (
        <div
          key={i}
          className={`rateInform-link ${current === field[resp] ? "cur" : ""}`}
          onClick={(e) => {
            goToFn(e, field);
          }}>
          <>
            <div>{field.short}</div>
            <div className="ico" dataScore={item.Evals[field[resp]] || ""}>
              {rateIcons[item.Evals[field[resp]]]}
            </div>
          </>
        </div>
      ))}
    </div>
  );
};

export default RateInformLink;
