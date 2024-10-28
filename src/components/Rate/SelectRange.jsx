import React from "react";
import { BsExclamationCircle, BsExclamationCircleFill } from "react-icons/bs";

const SelectRange = ({ oneCrit, onClick, ChangeCrit }) => {
  const arrLev = ["OK", "Minor", "Major"];
  return (
    <>
      {arrLev.map((el, i) => (
        <button
          key={i}
          onClick={() =>
            onClick(oneCrit.name, "respA", oneCrit.respA - 1 === i ? 0 : i + 1)
          }
          className={oneCrit.respA - 1 === i ? "btnA-selected" : "btnA"}>
          {el}
        </button>
      ))}
      <span>{oneCrit.name}</span>
      <div
        className={"isCrit-" + !!oneCrit.isCrit}
        onClick={() => ChangeCrit(oneCrit.name)}>
        {oneCrit.isCrit ? <BsExclamationCircleFill /> : <BsExclamationCircle />}
      </div>
      {arrLev.map((el, i) => (
        <button
          key={i}
          onClick={() =>
            onClick(oneCrit.name, "respB", oneCrit.respB - 1 === i ? 0 : i + 1)
          }
          className={
            (oneCrit.name, oneCrit.respB - 1 === i ? "btnB-selected" : "btnB")
          }>
          {el}
        </button>
      ))}
    </>
  );
};

export default SelectRange;
