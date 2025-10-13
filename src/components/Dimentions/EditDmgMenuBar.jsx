import React from "react";
import { Button } from "react-bootstrap";
import { FaCircleArrowDown } from "react-icons/fa6";
import RateBoxes from "../Rate/RateBoxes";
import { defaultDimSets } from "../../constants/textParts";
import { BiSolidRightArrow } from "react-icons/bi";
import { useRateLikert } from "../../hooks/useRateLikert";

const EditDmgMenuBar = ({ editParam }) => {
  const {
    toHist,
    setIsCheckerMode,
    item,
    action,
    fieldId,

    setItem,
    best,
    clear,
    show,
    setShow,
  } = editParam;

  const composeRate = (r3targ = true) => {
    const rateStr = best.title;

    let dimTxtA = "because ";
    let dimTxtB = "because ";
    defaultDimSets[editParam.item.setName].forEach((elAb) => {
      const ea = item.Evals[elAb.a];
      const eb = item.Evals[elAb.b];
      if (ea > eb) dimTxtA += "Response A " + elAb.better + "\n";
      if (eb > ea) dimTxtB += "Response B " + elAb.better + "\n";
    });

    const rateStrDim =
      best.num === 4
        ? dimTxtA + " " + dimTxtB
        : best.num < 4
        ? dimTxtA
        : dimTxtB;
    if (r3targ)
      setItem({
        ...item,
        "Rate": `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
      });
    else
      setItem({
        ...item,
        [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
      });
  };
  const composeRateBoth = (r3targ = true) => {
    const rateStr = best.title + "\n";

    let dimTxtA = "";
    let dimTxtB = "";
    let dimTxtSame = "Responses are the same at ";
    defaultDimSets[editParam.item.setName].forEach((elAb) => {
      const ea = item.Evals[elAb.a];
      const eb = item.Evals[elAb.b];
      if (ea > eb) dimTxtA += "Response A " + elAb.better + ".\n";
      if (eb > ea) dimTxtB += "Response B " + elAb.better + ".\n";
      if (eb === ea)
        dimTxtSame +=
          (dimTxtSame !== "Responses are the same at " ? ", " : "") + elAb.name;
    });
    dimTxtSame =
      dimTxtSame !== "Responses are the same at " ? dimTxtSame + "." : "";
    const rateStrDim = dimTxtA + "\n" + dimTxtB + "\n" + dimTxtSame;
    if (r3targ)
      setItem({
        ...item,
        "Rate": `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
      });
    else
      setItem({
        ...item,
        [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
      });
  };

  const likert = useRateLikert({
    action,
    item,
    setItem,
  });
  return (
    <div className="edit-parts-menu">
      <div className="d-flex">
        <Button
          className="btn-back square-btn"
          onClick={composeRate}
          title=" small or big field for the reason">
          <FaCircleArrowDown />
        </Button>
        <RateBoxes likert={likert} choosed={item.likert} />
      </div>
      <div className="d-flex align-items-center">
        <button onClick={() => composeRateBoth(false)}>rate 2</button>
        <button onClick={() => composeRate(false)}>
          rate to {fieldId ? fieldId : "active text field"}
        </button>
        <button onClick={(e) => clear(e, true)}> clear justif</button>{" "}
        <button onClick={clear}>clear all parts</button>{" "}
        <Button
          className=" m-0 me-2"
          onClick={() => {
            toHist();
            setIsCheckerMode(true);
          }}>
          Check text
        </Button>{" "}
        <button id="btn-hide-rate-dim" onClick={() => setShow(!show)}>
          Justification
          <BiSolidRightArrow className={show ? "arr-down" : ""} />
        </button>
      </div>
    </div>
  );
};

export default EditDmgMenuBar;
