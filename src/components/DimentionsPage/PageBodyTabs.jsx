import React, { useState } from "react";
import { defaultDimSets } from "../../constants/textParts";
import RateDmgScale from "../Dimentions/RateDmgScale";

import DmgOneTab from "./DmgOneTab";
import { rateIcons } from "../../utils/rates";
import PageJustif from "./PageJustif";
import PageRate from "./PageRate";
import RateInform from "../Rate/RateInform";
import RateLikert from "../Rate/RateLikert";
import { useRateLikert } from "../../hooks/useRateLikert";

const PageBodyTabs = ({ editParam }) => {
  const [activeTab, setActiveTab] = useState(null);
  const likert = useRateLikert({
    action: editParam.action,
    item: editParam.item,
    setItem: editParam.setItem,
  });
  const setAct = (newTab) => {
    editParam.fieldFn.onFocus("NULL");
    setActiveTab(newTab);
  };
  const isNoJisfif = (field) => {
    const val = editParam.item.Evals[field];
    const txt = editParam.item[field];

    return val > 0 && val < 5 && !txt;
  };
  return (
    <>
      <div className="tabs">
        {defaultDimSets[editParam.item.setName].map((field, i) => (
          <div
            title={field.name}
            className={
              activeTab && field.short === activeTab.short
                ? "oneTab activeTab"
                : "oneTab "
            }
            onClick={(e) => setAct(field)}>
            {" "}
            {isNoJisfif(field.a) && <div className="no-just-top">⛔</div>}
            <RateDmgScale
              horiz={true}
              val={editParam.item.Evals[field.a]}
              setVal={(v) => editParam.fieldFn.setNewEstim(v, field.a)}
              addElem={rateIcons[editParam.item.Evals[field.a]]}
            />
            {isNoJisfif(field.b) && <div className="no-just-bottom">⛔</div>}
            <RateDmgScale
              horiz={true}
              val={editParam.item.Evals[field.b]}
              setVal={(v) => editParam.fieldFn.setNewEstim(v, field.b)}
              addElem={rateIcons[editParam.item.Evals[field.b]]}
            />
            <span>{field.name}</span>
          </div>
        ))}
        <div
          className={
            activeTab && activeTab.short === "Rate"
              ? "oneTab activeTab"
              : "oneTab "
          }
          onClick={(e) => setAct({ short: "Rate" })}>
          <RateInform item={editParam.item} />

          <span>RATE</span>
        </div>
        <div
          className={
            activeTab && activeTab.short === "Justif"
              ? "oneTab activeTab"
              : "oneTab "
          }
          onClick={(e) => setAct({ short: "Justif" })}>
          <RateLikert
            num={editParam.item.likert}
            callback={likert.setNewRate}
          />
          <span>JUSTIFICATIONS</span>
        </div>
      </div>

      {activeTab && activeTab.short === "Rate" ? (
        <PageRate
          editParam={{
            ...editParam,
          }}
        />
      ) : activeTab && activeTab.short === "Justif" ? (
        <PageJustif
          editParam={{
            ...editParam,
            likert,
          }}
        />
      ) : (
        activeTab && (
          <div>
            <DmgOneTab editParam={{ ...editParam, field: activeTab }} />
          </div>
        )
      )}
    </>
  );
};

export default PageBodyTabs;
