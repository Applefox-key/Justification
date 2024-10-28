import React, { useState } from "react";

import Draggable from "react-draggable";
import SelectRange from "./SelectRange";
import {
  compareResponses,
  createJustifSheema,
  defaultOverAll,
  defaultVerdict,
  evaluate,
  evaluateResponses,
} from "../../utils/analysis";

import { IoMdArrowDropdown } from "react-icons/io";
import RateHead from "./RateHead";

const Responses = ({ compliteCrit, toJustif }) => {
  const [respEval, setRespEval] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [overallRate, setOverallRate] = useState(defaultOverAll);
  const [verdict, setVerdict] = useState(defaultVerdict);

  const refresh = () => {
    const arrCritNew = compliteCrit();
    const arrCritResp = arrCritNew.map((el, i) => {
      return {
        name: el,
        isCrit: [
          "Accuracy",
          "Truthfulness",
          "Completeness",
          "Instruction Following",
          "Harmlessness",
        ].includes(el.trim()),
        respA: 0,
        respB: 0,
      };
    });

    setRespEval(arrCritResp);
  };

  const clear = () => {
    const arrCritNew = [...respEval];
    const arrCritResp = arrCritNew.map((el, i) => {
      return {
        ...el,
        respA: 0,
        respB: 0,
      };
    });

    setRespEval(arrCritResp);
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
    const res = evaluate(field, [...respEval]);
    setOverallRate({ ...overallRate, [field]: res });
    console.log(res);
  };
  const compareResp = () => {
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
        x: window.visualViewport.width * 0.05,
        y: window.visualViewport.height * 0.02,
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
              <div>
                <button id="cbtn" onClick={compareResp}>
                  compaire
                </button>
                <button id="cbtn" onClick={clear}>
                  x
                </button>
              </div>
              <button className="btnB" onClick={() => evalOne("respB")}>
                evaluate B
              </button>
            </div>

            <RateHead
              overallRate={overallRate}
              verdict={verdict}
              setOverallRate={setOverallRate}
              setVerdict={setVerdict}
            />
            <div className="drag-body">
              <div className="resp">
                {respEval.map((el, i) => (
                  <div className="drag-part" key={i}>
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
                onClick={() => createJustifSheema(respEval, verdict, toJustif)}>
                TO COMMENT
              </button>{" "}
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
};

export default Responses;
