import React, { useEffect, useState } from "react";
import { composeRateBothByDim, rateIcons } from "../../utils/rates";
import { Form } from "react-bootstrap";

const DmgRateByDim = ({ item, likert, className = "" }) => {
  const [justParts, setJustParts] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    composeRateBothByDim({
      item,
      setItem: null,
      fieldId: null,
      best: likert.best,
      setresult: setJustParts,
    });
  });

  return (
    <div className={"JustifTxt " + className}>
      {justParts.map((el, i) => (
        <div key={i} className="oneDimReview">
          <div className="header-one-dim">
            {el.dim.name}
            <div>
              {rateIcons[item.Evals[el.dim.a]]}
              {rateIcons[item.Evals[el.dim.b]]}
            </div>
          </div>

          <Form.Control
            key={i}
            as="textarea"
            id={`justParts${i}`}
            className="fieldDim"
            value={el.just}
          />
        </div>
      ))}
    </div>
  );
};

export default DmgRateByDim;
