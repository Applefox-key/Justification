import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import { FaCircleArrowDown } from "react-icons/fa6";
import RateBoxes from "../Rate/RateBoxes";
import { defaultDimSets } from "../../constants/textParts";
import { recomDim } from "../../utils/analysis";
import { BiSolidRightArrow } from "react-icons/bi";

const EditDmgMenuBar = ({ editParam }) => {
  const {
    toHist,
    setIsCheckerMode,
    item,
    action,
    fieldId,
    setBest,
    setItem,
    best,
    clear,
    show,
    setShow,
  } = editParam;

  const handleRate = (e, val) => {
    let v = best.num === val.num ? -1 : val.num;
    const rec = best.rec === "" ? recomDim(item.Evals).recom : best.rec;
    setBest(
      v === -1
        ? { num: -1, title: "", fields: [], rec: rec }
        : { ...val, title: val.title, fields: bestField(v), rec: rec }
    );
  };
  const bestField = useCallback((i) => {
    const result = [];
    if (i > -1 && i < 5) result.push("R1");
    if (i > 3) result.push("R2");
    return result;
  }, []);
  // const compose = (r) => {
  //   const arf = r === 1 ? "a" : "b";
  //   const newArr = defaultDimSets[editParam.item.setName]
  //     .filter((it) => item[it[arf]] && item[it[arf]] !== "OK")
  //     .map((el) => item[el[arf]]);

  //   setItem({ ...item, Justif: newArr.join(`\n`) });
  // };
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
  return (
    <div className="edit-parts-menu">
      <span className="rec">Recommendation: {best.rec}</span>
      <div className="d-flex">
        <Button
          className="btn-back square-btn"
          onClick={composeRate}
          title=" small or big field for the reason">
          <FaCircleArrowDown />
        </Button>
        <RateBoxes action={action} choosed={best.num} callback={handleRate} />
      </div>
      <div className="d-flex align-items-center">
        {" "}
        {/* <button id="btn-hide-rate-dim" onClick={() => setShow(!show)}>
          Justification
          <BiSolidRightArrow className={show ? "arr-up" : ""} />
        </button> */}
        {/* <div className="btn-hide-wrap"> */}
        {/* </div> */}
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
        {/* <ComposeRate
          compose={compose}
          clear={clear}
          best={best}
          show={show}
          setShow={setShow}
        /> */}
      </div>
    </div>
  );
};

export default EditDmgMenuBar;
