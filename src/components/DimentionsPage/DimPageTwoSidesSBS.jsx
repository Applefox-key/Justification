import React, { useState } from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import DmgTwoResponses from "./DmgTwoResponses";
import PageRate from "./PageRate";
import PageRespTxt from "./PageRespTxt";

const DimPageTwoSidesSBS = ({ editParam }) => {
  const [content, setContent] = useState("DMG");

  const contentArr = {
    Responses: <PageRespTxt editParam={editParam} />,
    Rates: <PageRate editParam={{ ...editParam }} />,

    // Prompt: <div className="div-prompt">{editParam.item.Prompt}</div>,
    DMG: (
      <>
        <DmgTwoResponses
          editParam={{
            ...editParam,
            activeTab: "SBS",
          }}
          dmg
          dimArr={defaultDimSets[editParam.item.setName]}
        />
      </>
    ),
  };
  return (
    <div className="two-sides-wrap">
      <div className={`one-side w-100`}>
        <div className="one-side-panel">
          {Object.keys(contentArr).map((field, i) => (
            <button
              className={content === field ? "active-pan" : ""}
              key={i}
              checked={content === field}
              onClick={() => setContent(field)}>
              {field}
              {content === "DMG" && content === field && <div id="portal-dmg-arrow"> </div>}
            </button>
          ))}
        </div>
        <div className={`one-side-content ${content !== "DMG" ? "only-one-field" : ""}`}>{contentArr[content]}</div>
      </div>
    </div>
  );
};

export default DimPageTwoSidesSBS;
