import React, { useCallback } from "react";
import { Button } from "react-bootstrap";
import ComposeRate from "./ComposeRate";
import { FaCircleArrowUp } from "react-icons/fa6";
import RateBoxes from "../Rate/RateBoxes";
import { arrAB } from "../../constants/textParts";
import { FaRegQuestionCircle } from "react-icons/fa";
import { recomDim } from "../../utils/analysis";

const EditAreaMenuBar = ({ editParam }) => {
  const {
    toHist,
    setIsCheckerMode,
    item,
    action,
    setBest,
    setItem,
    best,
    clear,
  } = editParam;
  const handleRate = (val) => {
    let v = best.num === val.num ? -1 : val.num;
    const rec = recomDim(item.Evals);
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
  const compose = (r) => {
    const arf = r === 1 ? "a" : "b";
    const newArr = arrAB
      .filter((it) => item[it[arf]] && item[it[arf]] !== "OK")
      .map((el) => item[el[arf]]);

    setItem({ ...item, Justif: newArr.join(`\n`) });
  };
  const composeRate = () => {
    const rateStr = best.title;
    let dimTxtA = "Because ";
    let dimTxtB = "Because ";
    arrAB.map((elAb, i) => {
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
    setItem({
      ...item,
      "Rate": `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
    });
  };
  const helpRecom = () => {
    const rec = recomDim(item.Evals);
    setBest({ ...best, rec: rec });
  };
  return (
    <div className="edit-parts-menu">
      <div className="d-flex">
        {" "}
        <Button
          className="btn-back square-btn "
          onClick={composeRate}
          title=" small or big field for the reason">
          <FaCircleArrowUp />
        </Button>{" "}
        <Button
          className="btn-back square-btn "
          onClick={helpRecom}
          title="recomendation">
          <FaRegQuestionCircle />
        </Button>
        <RateBoxes action={action} choosed={best.num} callback={handleRate} />
        <p>{best.rec}</p>
      </div>
      <div className="d-flex align-items-center">
        <button onClick={clear}>clear all parts</button>{" "}
        <Button
          className=" m-0 me-2"
          onClick={() => {
            toHist();
            setIsCheckerMode(true);
          }}>
          Check text
        </Button>{" "}
        <ComposeRate compose={compose} clear={clear} best={best} />{" "}
      </div>
    </div>
  );
};

export default EditAreaMenuBar;
