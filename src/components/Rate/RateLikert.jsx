import React from "react";

const RateLikert = ({ num, callback }) => {
  const arr = ["MB", "B", "SB", "NB", "SM", "NB", "SB", "B", "MB"];
  const handleClick = (e, i) => {
    e.stopPropagation();
    callback(e, i);
  };
  return (
    <div className="d-flex">
      <div className="justinfo">
        <div>
          🅰️
          {[4, 3, 2, 1].map((el, i) => (
            <button
              onClick={(e) => handleClick(e, i)}
              key={i}
              className={i === num ? "ratebtn rateActive" : "ratebtn"}>
              {arr[el - 1]}
            </button>
          ))}
        </div>
        <button
          className={4 === num ? "ratebtnSM rateActive" : "ratebtnSM"}
          onClick={(e) => handleClick(e, 4)}>
          {arr[4]}
        </button>
        <div>
          🅱️
          {[6, 7, 8, 9].map((el, i) => (
            <button
              onClick={(e) => handleClick(e, el - 1)}
              key={i}
              className={i === num - 5 ? "ratebtn rateActive" : "ratebtn"}>
              {arr[el - 1]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RateLikert;
