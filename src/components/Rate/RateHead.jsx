import React from "react";
import Rating from "./Rating";
import FinalRate from "./FinalRate";
import { labelsVerdict } from "../../utils/analysis";

const RateHead = ({ overallRate, verdict, setOverallRate, setVerdict }) => {
  const setOverallRateOne = (field, newVal) => {
    const newF = { ...overallRate[field], score: newVal };
    setOverallRate({
      ...overallRate,
      [field]: newF,
    });
  };
  const handleChangeVerdict = (val) => {
    // setVerdict
    const newvalTxt = labelsVerdict[val - 1];
    setVerdict({
      ...verdict,
      result: val === 4 ? "Responses are the same" : "Response " + newvalTxt,
      resultNum: val,
    });
  };

  //   useEffect(() => {}, [overallRate.]);
  return (
    <div className="drag-part noHover align-items-start pb-1 pt-0 justify-content-between">
      <div className="header-resp">
        <Rating
          title="A"
          recom={!!overallRate.respA.maxRecom ? overallRate.respA.maxRecom : ""}
          recomScore={
            !!overallRate.respA.recomScore ? overallRate.respA.recomScore : ""
          }
          // value={evalResp}
          value={!!overallRate.respA.score ? overallRate.respA.score : 0}
          setValue={(newVal) => setOverallRateOne("respA", newVal)}
        />
      </div>
      <FinalRate value={verdict} setValue={handleChangeVerdict} />
      <div className="header-resp">
        <Rating
          title="B"
          value={!!overallRate.respB.score ? overallRate.respB.score : 0}
          setValue={(newVal) => setOverallRateOne("respB", newVal)}
          recom={!!overallRate.respB.maxRecom ? overallRate.respB.maxRecom : ""}
          recomScore={
            !!overallRate.respB.recomScore ? overallRate.respB.recomScore : ""
          }
        />
      </div>
    </div>
  );
};

export default RateHead;
