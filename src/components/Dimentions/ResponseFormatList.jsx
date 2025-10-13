import React from "react";

import { setRespNames } from "../../utils/localStorage";
import { baseRespName } from "../../utils/utilStr";

const ResponseFormatList = ({ action, setAction }) => {
  return (
    <div className="setlist-btns">
      {/* <Button className="btnToHis">{curSet}</Button> */}
      <button
        className="btn-back m-0 "
        onClick={() => {
          setRespNames(action, setAction);
        }}>
        {action}
      </button>

      {/* <Button className="btn-back m-0 ">{curSet}</Button> */}
      <div className="sub-sets">
        {Object.entries(baseRespName).map(([key, el], i) => (
          <button
            key={i}
            className="btnToHis intense"
            title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
            onClick={() => setRespNames(key, setAction, i)}>
            <span>{key}</span>
            <div>{el.R1}</div>
            <div>{el.R2}</div>
            {/* {el.map((it, i) => (
              <div>{it.name}</div>
            ))} */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResponseFormatList;
