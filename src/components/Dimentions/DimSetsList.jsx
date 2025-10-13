import React from "react";
import { defaultDimSets } from "../../constants/textParts";
import { Button } from "react-bootstrap";
import { setSet } from "../../utils/localStorage";

const DimSetsList = ({ curSet, setCurSet }) => {
  const saveNewSet = (key) => {
    if (curSet !== key) setSet(key);
    setCurSet(key);
  };
  return (
    <div className="setlist-btns">
      {/* <Button className="btnToHis">{curSet}</Button> */}
      <Button className="btn-back m-0 ">{curSet}</Button>
      <div className="sub-sets">
        {Object.entries(defaultDimSets).map(([key, el], i) => (
          <button
            className="btnToHis intense"
            title="RESPONSES: remove extra spaces, capitalize all sentences, correct names of responses"
            onClick={() => saveNewSet(key)}>
            <span>{key}</span>
            {el.map((it, i) => (
              <div>{it.name}</div>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DimSetsList;
