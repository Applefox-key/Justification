import React from "react";
import { LuFlower } from "react-icons/lu";
import { toOrder } from "../../utils/utilStr";
import { PiFlowerTulipBold } from "react-icons/pi";

const FlowerBtnUniv = ({
  fieldId,
  fieldVal,
  className,
  setNewVal,
  type = "",
}) => {
  const toOrd = (e) => {
    e.stopPropagation();
    let val = toOrder(fieldId, fieldVal, type);
    setNewVal(val);
  };
  return (
    <button className={"flowBtn " + className} onClick={toOrd}>
      {type === "" ? (
        <LuFlower />
      ) : (
        <>
          <PiFlowerTulipBold />
          <span>{type}</span>
        </>
      )}
    </button>
  );
};

export default FlowerBtnUniv;
