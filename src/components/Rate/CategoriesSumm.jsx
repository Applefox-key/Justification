import React from "react";
import { PiFireDuotone, PiFlowerLight } from "react-icons/pi";

const CategoriesSumm = ({ overallRate, respL, setCat }) => {
  const clName = respL === "respB" ? "btnB" : "btnA";
  return (
    <div className="ms-1">
      <div className="d-flex">
        <button
          title="crit Major"
          className={clName + (overallRate[respL].critMajor ? "-selected" : "")}
          onClick={() => setCat(respL, "critMajor")}>
          <PiFireDuotone className="crit" /> {overallRate[respL].critMajor}
        </button>
        <button
          title="crit Minor"
          className={clName + (overallRate[respL].critMinor ? "-selected" : "")}
          onClick={() => setCat(respL, "critMinor")}>
          <PiFlowerLight className="crit" /> {overallRate[respL].critMinor}
        </button>
      </div>
      <div className="d-flex">
        {/* <BsExclamationCircle /> */}
        <button
          title="noncrit Major"
          className={
            clName + (overallRate[respL].nonCritMajor ? "-selected" : "")
          }
          onClick={() => setCat(respL, "nonCritMajor")}>
          <PiFireDuotone /> {overallRate[respL].nonCritMajor}
        </button>
        <button
          title="noncrit Minor"
          className={
            clName + (overallRate[respL].nonCritMinor ? "-selected" : "")
          }
          onClick={() => setCat(respL, "nonCritMinor")}>
          <PiFlowerLight /> {overallRate[respL].nonCritMinor}
        </button>
      </div>
    </div>
  );
};

export default CategoriesSumm;
