import React from "react";
import RateDmgScale from "../Dimentions/RateDmgScale";
import { rateIcons } from "../../utils/rates";
import { defaultDimSets } from "../../constants/dimDefault";

const DimTab = ({ item, fieldFn, activeTab, setAct }) => {
  const isNoJisfif = (field) => {
    const val = item.Evals[field];
    const txt = item[field];

    return val > 0 && val < 5 && !txt;
  };
  return (
    <div className="tab-dim-nav ">
      {defaultDimSets[item.setName].map((field, i) => (
        <div className="tab-dim-nav-one">
          <button
            className={
              activeTab && activeTab.short === field.short ? "activeTab" : ""
            }
            onClick={() => {
              setAct(field);
            }}>
            {field.short}
          </button>

          <div>
            <RateDmgScale
              horiz={true}
              val={item.Evals[field.a]}
              setVal={(v) => fieldFn.setNewEstim(v, field.a)}
              addElem={
                isNoJisfif(field.a) ? "⛔" : rateIcons[item.Evals[field.a]]
              }
            />
            <RateDmgScale
              horiz={true}
              val={item.Evals[field.b]}
              setVal={(v) => fieldFn.setNewEstim(v, field.b)}
              addElem={
                isNoJisfif(field.b) ? "⛔" : rateIcons[item.Evals[field.b]]
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DimTab;
