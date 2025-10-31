import React from "react";
import { FaMinus } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { VscTriangleRight } from "react-icons/vsc";

const DimAddDetail = ({ val, setVal, title, id, isBtn, dvd, hint = "" }) => {
  return (
    <div className={`add-details ps-1 ${dvd ? "detail-dvd" : ""}`}>
      {isBtn ? (
        <button
          id={"show-body-" + id}
          title={hint}
          onClick={() => setVal(!val)}
          className={!val ? "show-body-dim w-100" : "show-body-dim btn-on w-100"}>
          {title} <VscTriangleRight className={!val ? " " : "arr-down"} />
        </button>
      ) : (
        <>
          <button
            id={"show-body-" + id}
            onClick={() => setVal(!val)}
            title={hint}
            className={!val ? "show-body-dim w-100" : "show-body-dim btn-on w-100"}>
            {title} {!val ? <MdOutlineRadioButtonUnchecked /> : <IoIosCheckmarkCircleOutline />}
          </button>
          {/* 
          <input id={id} type="checkbox" checked={val} onChange={() => setVal(!val)} />
          <label htmlFor={id}>{title}</label> */}
        </>
      )}
    </div>
  );
};
export default DimAddDetail;
