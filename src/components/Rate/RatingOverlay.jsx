import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import RateHead from "./RateHead";
import {
  compareResponses,
  defaultOverAll,
  defaultVerdict,
  evaluateHalf,
} from "../../utils/analysis";
import CategoriesSumm from "./CategoriesSumm";
import { PiFireDuotone, PiFlowerLight } from "react-icons/pi";

const RatingOverlay = ({ toJustif, edit = false }) => {
  const [overallRate, setOverallRate] = useState(defaultOverAll);
  const [verdict, setVerdict] = useState(defaultVerdict);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const clear = () => {
    setOverallRate(defaultOverAll);
    setVerdict(defaultVerdict);
  };
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const setCat = (resp, field) => {
    let val = overallRate[resp][field];
    val = val + 1 === 5 ? 0 : val + 1;

    setOverallRate({
      ...overallRate,
      [resp]: { ...overallRate[resp], [field]: val },
    });
  };
  const evalOne = (field) => {
    const res = evaluateHalf(overallRate[field]);
    const newVal = { ...overallRate, [field]: res };
    setOverallRate(newVal);
    console.log(res);
  };
  const compareResp = () => {
    const res = compareResponses(overallRate);
    setVerdict(res);
  };
  const overall = () => {
    const resA = evaluateHalf(overallRate.respA);
    const resB = evaluateHalf(overallRate.respB);
    const newVal = { respA: resA, respB: resB };

    const res = compareResponses(newVal);
    setOverallRate(newVal);
    setVerdict(res);
  };

  return (
    <>
      <div ref={ref}>
        <Button onClick={handleClick} className=" mt-1 mb-1 me-0 ms-0">
          Rating
        </Button>
        <Overlay
          show={show}
          target={target}
          placement={edit ? "left" : "top"}
          container={ref}
          containerPadding={20}>
          <Popover id={"popover-edit"}>
            <div className="drag-footer ms-4">
              <button className="btnA" onClick={() => evalOne("respA")}>
                evaluate A
              </button>
              <div></div>
              <button id="cbtn" onClick={compareResp}>
                compaire
              </button>{" "}
              <button id="cbtnR" onClick={overall}>
                RATE
              </button>
              <button id="cbtnC" onClick={clear}>
                CLEAR
              </button>
              <button
                id="cbtnT"
                onClick={() =>
                  verdict.result ? toJustif(verdict.result + ".") : ""
                }>
                to text
              </button>
              <button className="btnB" onClick={() => evalOne("respB")}>
                evaluate B
              </button>
            </div>
            <div className="d-flex mt-3 justify-content-between">
              <CategoriesSumm
                overallRate={overallRate}
                setCat={setCat}
                respL={"respA"}
              />
              <RateHead
                overallRate={overallRate}
                verdict={verdict}
                setOverallRate={setOverallRate}
                setVerdict={setVerdict}
              />{" "}
              <CategoriesSumm
                overallRate={overallRate}
                setCat={setCat}
                respL={"respB"}
              />
            </div>
            <div className="overlayRate-note">
              <PiFireDuotone /> - MAJOR
              <br />
              <PiFlowerLight /> - MINOR <PiFireDuotone className="crit" />{" "}
              -CRITICAL MAJOR
              <PiFlowerLight className="crit" /> - CRITICAL MINOR
            </div>
          </Popover>
        </Overlay>
      </div>
    </>
  );
};

export default RatingOverlay;
