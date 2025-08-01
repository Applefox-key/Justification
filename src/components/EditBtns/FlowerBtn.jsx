import React from "react";
import { LuFlower } from "react-icons/lu";
import { toOrder } from "../../utils/utilStr";
import { PiFlowerTulipBold } from "react-icons/pi";

const FlowerBtn = ({ fieldId, fieldFn, className, type = "" }) => {
  const toOrd = (e) => {
    e.stopPropagation();
    let val = toOrder(fieldId, fieldFn.getFieldValue(), type);
    fieldFn.setNewValRub(val);
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

export default FlowerBtn;
