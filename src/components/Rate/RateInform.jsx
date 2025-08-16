import React from "react";
import { defaultDimSets } from "../../constants/textParts";
import { rateIcons } from "../../utils/rates";

const RateInform = ({ item }) => {
  return (
    <div className="d-flex">
      {defaultDimSets[item.setName].map((field, i) => (
        <div key={i} className="rateInform">
          <div>{rateIcons[item.Evals[field.a]]}</div>
          <div>{field.short}</div>
          <div>{rateIcons[item.Evals[field.b]]}</div>
        </div>
      ))}
    </div>
  );
};

export default RateInform;
