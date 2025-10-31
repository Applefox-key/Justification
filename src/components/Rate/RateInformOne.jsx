import React from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import { rateIcons } from "../../utils/rates";

const RateInformOne = ({ item, resp }) => {
  return (
    <div className="rate-inform-dmg">
      {defaultDimSets[item.setName].map((field, i) => (
        <div key={i} className="rateInform">
          {resp ? (
            <>
              <div className="ico" dataScore={item.Evals[field[resp]] || ""}>
                {rateIcons[item.Evals[field[resp]]]}
              </div>
              <div>{field.short}</div>
            </>
          ) : (
            <>
              <div className="ico" dataScore={item.Evals[field.a] || ""}>
                {rateIcons[item.Evals[field.a]]}
              </div>
              <div className="ico" dataScore={item.Evals[field.b] || ""}>
                {rateIcons[item.Evals[field.b]]}
              </div>
              <div className="d-short">{field.short}</div>{" "}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RateInformOne;
