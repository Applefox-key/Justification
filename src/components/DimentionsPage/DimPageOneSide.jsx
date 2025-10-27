import React from "react";

const DimPageOneSide = ({ contentArr, content, setContent, otherC }) => {
  return (
    <div className={`one-side ${otherC === "DMG" ? "w-lx" : content === "DMG" ? "w-sx" : "w-50"}`}>
      <div className="one-side-panel">
        {Object.keys(contentArr).map((field, i) => (
          <button
            className={content === field ? "active-pan" : otherC === field ? "block-pan" : ""}
            key={i}
            checked={content === field}
            onClick={() => setContent(field)}>
            {field} {content === "DMG" && content === field && <div id="portal-dmg-arrow"> </div>}
            {content === "Prompt" && content === field && <div id="portal-dmg-prompt"> </div>}
          </button>
        ))}
      </div>
      <div className={`one-side-content ${content !== "DMG" ? "only-one-field" : ""}`}>{contentArr[content]}</div>
    </div>
  );
};

export default DimPageOneSide;
