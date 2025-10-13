import React from "react";
import { defaultDimSets } from "../../constants/textParts";
import { rateIcons } from "../../utils/rates";

const RateInformOne = ({ item, resp }) => {
  return (
    <div className="d-flex">
      {defaultDimSets[item.setName].map((field, i) => (
        <div key={i} className="rateInform">
          <div className="ico" dataScore={item.Evals[field[resp]] || ""}>
            {rateIcons[item.Evals[field[resp]]]}
          </div>
          <div>{field.short}</div>
          {/* <div>{item.Evals[field[resp]]}</div> */}
          {/* <div>{rateIcons[item.Evals[field.b]]}</div> */}
        </div>
      ))}
    </div>
  );
};

export default RateInformOne;
