import React, { useState } from "react";

import Draggable from "react-draggable";
import SelectRange from "./SelectRange";
import {
  compareResponses,
  createJustifSheema,
  defaultEval,
  evaluate,
  evaluateResponses,
  labelsVerdict,
} from "../utils/analysis";
import Raiting from "./Raiting";
import FinalRate from "./FinalRate";
import { IoMdArrowDropdown } from "react-icons/io";
// {result: result.comparisonResult,
// resultNum: result.comparisonResultNum,
// recom: result.comparisonRecom,}
const Responses = ({ compliteCrit, toJustif }) => {
  const [respEval, setRespEval] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [overallRate, setOverallRate] = useState({
    respA: defaultEval,
    respB: defaultEval,
  });
  const [verdict, setVerdict] = useState({
    rsult: 0,
    rsultNum: 0,
    recom: 0,
  });
  const setOverallRateOne = (field, newVal) => {
    const newF = { ...overallRate[field], score: newVal };
    setOverallRate({
      ...overallRate,
      [field]: newF,
    });
  };
  //result 1-8;
  const refresh = () => {
    const arrCritNew = compliteCrit();
    const arrCritResp = arrCritNew.map((el, i) => {
      return { name: el, isCrit: false, respA: 0, respB: 0 };
    });

    setRespEval(arrCritResp);
  };
  const handleChangeVerdict = (val) => {
    // setVerdict
    const newvalTxt = labelsVerdict[val - 1];
    setVerdict({
      ...verdict,
      result: newvalTxt,
      resultNum: val,
    });
  };

  const setNewVal = (crit, field, val) => {
    const newArr = respEval.map((el, i) =>
      el.name === crit ? { ...el, [field]: val } : el
    );
    setRespEval(newArr);
  };
  const ChangeCrit = (crit) => {
    const newArr = respEval.map((el, i) =>
      el.name === crit ? { ...el, isCrit: !el.isCrit } : el
    );
    setRespEval(newArr);
  };
  const removeCrit = (name) => {
    const newArr = respEval.filter((el) => el.name !== name);
    setRespEval(newArr);
  };

  const evalOne = (field) => {
    // {
    //   score: 2,
    //   critMinor,
    //   critMajor,
    //   nonCritMinor,
    //   nonCritMajor,
    //   recomScore: [1, 2],
    //   maxRecom: "much better",
    // }

    const res = evaluate(field, [...respEval]);
    setOverallRate({ ...overallRate, [field]: res });
    console.log(res);
  };
  const compareResp = () => {
    // {result: result.comparisonResult,
    // resultNum: result.comparisonResultNum,
    // recom: result.comparisonRecom,}
    const res = compareResponses(overallRate);
    setVerdict(res);
    console.log(res);
  };

  const evalAndCompare = () => {
    const resEv = evaluateResponses([...respEval]);
    const resFin = compareResponses(resEv);

    setOverallRate(resEv);
    setVerdict(resFin);
    console.log(resEv);
    console.log(resFin);
  };

  return (
    <Draggable
      cancel="#cbtn"
      defaultPosition={{
        x: window.visualViewport.width * 0.09,
        y: window.visualViewport.height * 0.415,
      }}>
      <div
        className={
          showBox ? "un-wrap draggable-box" : "un-wrap draggable-box p-0"
        }>
        <div className={showBox ? "drag-head" : "drag-head back"}>
          <IoMdArrowDropdown
            onClick={() => setShowBox(!showBox)}
            className={showBox ? "menuArrow" : "menuArrow menuArrowRight"}
          />
          Rates
        </div>
        {showBox && (
          <>
            <div className="drag-footer">
              <button className="btnA" onClick={() => evalOne("respA")}>
                evaluate A
              </button>
              <button id="cbtn" onClick={compareResp}>
                compaire responses
              </button>
              <button className="btnB" onClick={() => evalOne("respB")}>
                evaluate B
              </button>
            </div>
            <div className="drag-part noHover align-items-start pb-1 pt-0 justify-content-between">
              <div className="header-resp">
                <Raiting
                  title="A"
                  recom={
                    !!overallRate.respA.maxRecom
                      ? overallRate.respA.maxRecom
                      : ""
                  }
                  recomScore={
                    !!overallRate.respA.recomScore
                      ? overallRate.respA.recomScore
                      : ""
                  }
                  // value={evalResp}
                  value={
                    !!overallRate.respA.score ? overallRate.respA.score : 0
                  }
                  setValue={(newVal) => setOverallRateOne("respA", newVal)}
                />
              </div>
              <FinalRate value={verdict} setValue={handleChangeVerdict} />
              <div className="header-resp">
                <Raiting
                  title="B"
                  value={
                    !!overallRate.respB.score ? overallRate.respB.score : 0
                  }
                  setValue={(newVal) => setOverallRateOne("respB", newVal)}
                  recom={
                    !!overallRate.respB.maxRecom
                      ? overallRate.respB.maxRecom
                      : ""
                  }
                  recomScore={
                    !!overallRate.respB.recomScore
                      ? overallRate.respB.recomScore
                      : ""
                  }
                />
              </div>
            </div>
            <div className="drag-body">
              <div className="resp">
                {respEval.map((el, i) => (
                  <div className="drag-part">
                    <SelectRange
                      oneCrit={el}
                      onClick={setNewVal}
                      ChangeCrit={ChangeCrit}
                    />
                    <button
                      className="remove-btn"
                      onClick={() => removeCrit(el.name)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="drag-footer">
              <button id="cbtn" onClick={refresh}>
                refresh criteries
              </button>{" "}
              <button id="cbtn" onClick={evalAndCompare}>
                evaluate responces
              </button>
              <button
                id="cbtn"
                onClick={() =>
                  createJustifSheema(respEval, overallRate, verdict, toJustif)
                }>
                TO JUSTIFICATION
              </button>{" "}
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
};

export default Responses;
